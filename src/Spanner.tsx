import { useEffect, useState, type CSSProperties, type SyntheticEvent, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabase";
import logo from "./assets/logo.png";
import "./Spanner.css";

const MIN_PASSWORD_LENGTH = 8;
type Notice = { tone: "ok" | "err"; text: string } | null;
type ProfileChanges = { financial_goal?: string; is_beginner?: boolean };

const errorText = (error: unknown) =>
	error instanceof Error ? error.message : "Something went wrong. Try again.";

async function currentUserId() {
	const { data: { user }, error } = await supabase.auth.getUser();
	if (error || !user) throw new Error("Please log in again.");
	return user.id;
}

async function updateProfile(changes: ProfileChanges) {
	const id = await currentUserId();
	const { error } = await supabase.from("profiles")
		.update(changes).eq("id", id).select("id").single();
	if (error) throw new Error(error.message);
}

function PasswordField({ id, value, onChange }: {
	id: string;
	value: string;
	onChange: (value: string) => void;
}) {
	const [visible, setVisible] = useState(false);

	return (
		<div className="account-pwfield">
			<input
				id={id}
				type={visible ? "text" : "password"}
				autoComplete="new-password"
				value={value}
				onChange={event => onChange(event.target.value)}
			/>
			<button
				type="button"
				className="account-eye"
				aria-label={visible ? "Hide password" : "Show password"}
				aria-pressed={visible}
				onClick={() => setVisible(!visible)}
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
					stroke="currentColor" strokeWidth="2" strokeLinecap="round"
					strokeLinejoin="round" aria-hidden="true">
					<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
					<circle cx="12" cy="12" r="3" />
					{visible && <line x1="3" y1="3" x2="21" y2="21" />}
				</svg>
			</button>
		</div>
	);
}

function NoticeText({ notice }: { notice: Notice }) {
	return notice ? (
		<p className={`account-note ${notice.tone}`} role="status">{notice.text}</p>
	) : null;
}

interface SpannerProps {
	onAccountModalClick?: (isOpen: boolean) => void;
}

export default function Spanner({ onAccountModalClick }: SpannerProps) {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const [origin, setOrigin] = useState({ x: "50%", y: "50%" });
	const [goal, setGoal] = useState("");
	const [goalDraft, setGoalDraft] = useState("");
	const [editingGoal, setEditingGoal] = useState(false);
	const [savingGoal, setSavingGoal] = useState(false);
	const [goalNotice, setGoalNotice] = useState<Notice>(null);
	const [messagesRead, setMessagesRead] = useState(false);
	const [readNotice, setReadNotice] = useState<Notice>(null);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [savingPassword, setSavingPassword] = useState(false);
	const [passwordNotice, setPasswordNotice] = useState<Notice>(null);
	const [loggingOut, setLoggingOut] = useState(false);

	const changeOpen = (open: boolean) => {
		setIsOpen(open);
		onAccountModalClick?.(open);
	};

	useEffect(() => {
		if (!isOpen) return;
		let active = true;
		setEditingGoal(false);
		setGoalNotice(null);
		setReadNotice(null);
		setPasswordNotice(null);
		setNewPassword("");
		setConfirmPassword("");

		async function loadProfile() {
			try {
				const id = await currentUserId();
				const { data, error } = await supabase.from("profiles")
					.select("financial_goal, is_beginner").eq("id", id).single();
				if (error) throw error;
				if (!active) return;
				const savedGoal = data.financial_goal ?? "";
				setGoal(savedGoal);
				setGoalDraft(savedGoal);
				setMessagesRead(!data.is_beginner);
			} catch (error) {
				if (active) setGoalNotice({ tone: "err", text: errorText(error) });
			}
		}
		void loadProfile();
		return () => { active = false; };
	}, [isOpen]);

	const openAccount = (event: MouseEvent<HTMLButtonElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		setOrigin({
			x: `${((rect.left + rect.width / 2) / window.innerWidth) * 100}%`,
			y: `${((rect.top + rect.height / 2) / window.innerHeight) * 100}%`,
		});
		changeOpen(true);
	};

	const saveGoal = async () => {
		const nextGoal = goalDraft.trim();
		setSavingGoal(true);
		setGoalNotice(null);
		try {
			await updateProfile({ financial_goal: nextGoal });
			setGoal(nextGoal);
			setEditingGoal(false);
			setGoalNotice({ tone: "ok", text: "Goal saved." });
		} catch (error) {
			setGoalNotice({ tone: "err", text: errorText(error) });
		} finally {
			setSavingGoal(false);
		}
	};

	const toggleRead = async (checked: boolean) => {
		setMessagesRead(checked);
		setReadNotice(null);
		try {
			await updateProfile({ is_beginner: !checked });
		} catch (error) {
			setMessagesRead(!checked);
			setReadNotice({ tone: "err", text: errorText(error) });
		}
	};

	const submitPassword = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPasswordNotice(null);
		if (newPassword.length < MIN_PASSWORD_LENGTH) {
			setPasswordNotice({ tone: "err", text: `Use at least ${MIN_PASSWORD_LENGTH} characters.` });
			return;
		}
		if (newPassword !== confirmPassword) {
			setPasswordNotice({ tone: "err", text: "The passwords don't match." });
			return;
		}
		setSavingPassword(true);
		try {
			const { error } = await supabase.auth.updateUser({ password: newPassword });
			if (error) throw error;
			setNewPassword("");
			setConfirmPassword("");
			setPasswordNotice({ tone: "ok", text: "Password changed." });
		} catch (error) {
			setPasswordNotice({ tone: "err", text: errorText(error) });
		} finally {
			setSavingPassword(false);
		}
	};

	const logOut = async () => {
		setLoggingOut(true);
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
			changeOpen(false);
			navigate("/");
		} catch (error) {
			setGoalNotice({ tone: "err", text: errorText(error) });
		} finally {
			setLoggingOut(false);
		}
	};

	return (
		<>
			<nav className="nav-bar" aria-label="Main navigation">
				<button type="button" className="logo-button" aria-label="Go to Start page"
					onClick={() => navigate("/start")}>
					<img src={logo} alt="Home reroute logo" />
				</button>
				<button type="button" className="profile-button" onClick={openAccount}>Account</button>
			</nav>

			{isOpen && (
				<div className="scroll-modal-backdrop" role="presentation" onClick={() => changeOpen(false)}>
					<section
						className="scroll-modal"
						style={{ "--modal-origin-x": origin.x, "--modal-origin-y": origin.y } as CSSProperties}
						role="dialog" aria-modal="true" aria-labelledby="account-modal-title"
						onClick={event => event.stopPropagation()}
					>
						<button type="button" className="scroll-modal-close" aria-label="Close account window"
							onClick={() => changeOpen(false)}>
							<span aria-hidden="true">&#215;</span>
						</button>
						<h2 id="account-modal-title">Account</h2>

						<div className="account-section">
							<p>My Financial Goal:</p>
							{editingGoal ? (
								<textarea value={goalDraft} rows={4} maxLength={500}
									onChange={event => setGoalDraft(event.target.value)}
									style={{ width: "100%", resize: "vertical" }} />
							) : <p>{goal || "No financial goal saved yet."}</p>}
							<div className="account-modal-actions">
								<button type="button" disabled={savingGoal}
									onClick={editingGoal ? saveGoal : () => { setGoalDraft(goal); setEditingGoal(true); }}>
									{editingGoal ? (savingGoal ? "Saving…" : "Save") : "Edit"}
								</button>
							</div>
							<NoticeText notice={goalNotice} />
						</div>

						<div className="account-section">
							<label className="account-check">
								<input type="checkbox" checked={messagesRead}
									onChange={event => void toggleRead(event.target.checked)} />
								<span>I have read all text messages.</span>
							</label>
							<NoticeText notice={readNotice} />
						</div>

						<form className="account-section" onSubmit={submitPassword}>
							<label htmlFor="account-new-password">New password</label>
							<PasswordField id="account-new-password" value={newPassword} onChange={setNewPassword} />
							<label htmlFor="account-confirm-password">Confirm new password</label>
							<PasswordField id="account-confirm-password" value={confirmPassword} onChange={setConfirmPassword} />
							<div className="account-modal-actions">
								<button type="submit" disabled={savingPassword || !newPassword || !confirmPassword}>
									{savingPassword ? "Changing…" : "Change password"}
								</button>
							</div>
							<NoticeText notice={passwordNotice} />
						</form>

						<div className="account-modal-actions">
							<button type="button" disabled={loggingOut} onClick={() => void logOut()}>
								{loggingOut ? "Logging out…" : "Log Out"}
							</button>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
