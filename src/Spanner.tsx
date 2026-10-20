import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./Spanner.css";

const GOAL_KEY = "mm-goal";
const READ_KEY = "mm-read-messages";
const MIN_PASSWORD_LENGTH = 8;

const loadGoal = () => {
  try {
    return localStorage.getItem(GOAL_KEY) ?? "";
  } catch {
    return "";
  }
};

const loadRead = () => {
  try {
    return localStorage.getItem(READ_KEY) === "true";
  } catch {
    return false;
  }
};

const errorText = (e: unknown) =>
  e instanceof Error ? e.message : "Something went wrong. Try again.";

type Notice = { tone: "ok" | "err"; text: string } | null;

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {off && <line x1="3" y1="3" x2="21" y2="21" />}
    </svg>
  );
}

interface PasswordFieldProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

function PasswordField({ id, value, onChange }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="account-pwfield">
      <input
        id={id}
        type={visible ? "text" : "password"}
        autoComplete="new-password"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button
        type="button"
        className="account-eye"
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
      >
        <EyeIcon off={visible} />
      </button>
    </div>
  );
}

interface SpannerProps {
  onAccountModalClick?: (isOpen: boolean) => void;
  // Wire this to your backend (for example supabase.auth.updateUser).
  // Throw an Error if it fails and its message will show in the modal.
  onChangePassword?: (newPassword: string) => Promise<void> | void;
  // Optional: called when the "read all text messages" box changes.
  // Use it to save the value to your database. Throw to undo the change.
  onToggleRead?: (checked: boolean) => Promise<void> | void;
}

export default function Spanner({
  onAccountModalClick,
  onChangePassword,
  onToggleRead,
}: SpannerProps) {
  const navigate = useNavigate();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountGoal, setAccountGoal] = useState(() => loadGoal());
  const [goalDraft, setGoalDraft] = useState("");
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [modalOrigin, setModalOrigin] = useState({ x: "50%", y: "50%" });

  const [messagesRead, setMessagesRead] = useState(() => loadRead());
  const [readNotice, setReadNotice] = useState<Notice>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotice, setPasswordNotice] = useState<Notice>(null);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (!isAccountOpen) return;
    const savedGoal = loadGoal();
    setAccountGoal(savedGoal);
    setGoalDraft(savedGoal);
    setIsEditingGoal(false);
    setMessagesRead(loadRead());
    setReadNotice(null);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordNotice(null);
  }, [isAccountOpen]);

  const openAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    setModalOrigin({ x: `${x}%`, y: `${y}%` });
    setIsAccountOpen(true);
    onAccountModalClick?.(true);
  };

  const closeAccount = () => {
    setIsAccountOpen(false);
    onAccountModalClick?.(false);
  };

  const toggleRead = async (checked: boolean) => {
    setMessagesRead(checked); // update right away
    setReadNotice(null);
    try {
      await onToggleRead?.(checked);
      try {
        localStorage.setItem(READ_KEY, String(checked));
      } catch {
        // Keep the value in component state if storage is unavailable.
      }
    } catch (err) {
      setMessagesRead(!checked); // put it back if saving failed
      setReadNotice({ tone: "err", text: errorText(err) });
    }
  };

  const submitPassword = async (event: FormEvent) => {
    event.preventDefault();
    setPasswordNotice(null);
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setPasswordNotice({
        tone: "err",
        text: `Use at least ${MIN_PASSWORD_LENGTH} characters.`,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordNotice({ tone: "err", text: "The passwords don't match." });
      return;
    }
    if (!onChangePassword) {
      setPasswordNotice({
        tone: "err",
        text: "Password change isn't connected yet.",
      });
      return;
    }
    setIsSavingPassword(true);
    try {
      await onChangePassword(newPassword);
      setNewPassword("");
      setConfirmPassword("");
      setPasswordNotice({ tone: "ok", text: "Password changed." });
    } catch (err) {
      setPasswordNotice({ tone: "err", text: errorText(err) });
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <>
      <nav className="nav-bar" aria-label="Main navigation">
        <button
          type="button"
          className="logo-button"
          aria-label="Go to Start page"
          onClick={() => navigate("/start")}
        >
          <img src={logo} alt="Home reroute logo" />
        </button>
        <button type="button" className="profile-button" onClick={openAccount}>
          Account
        </button>
      </nav>
      {isAccountOpen && (
        <div
          className="scroll-modal-backdrop"
          role="presentation"
          onClick={closeAccount}
        >
          <section
            className="scroll-modal"
            style={{
              ["--modal-origin-x" as any]: modalOrigin.x,
              ["--modal-origin-y" as any]: modalOrigin.y,
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="account-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="scroll-modal-close"
              type="button"
              aria-label="Close account window"
              onClick={closeAccount}
            >
              <span aria-hidden="true">&#215;</span>
            </button>
            <h2 id="account-modal-title">Account</h2>

            <div className="account-section">
              <p>My Financial Goal:</p>
              {isEditingGoal ? (
                <textarea
                  value={goalDraft}
                  rows={4}
                  maxLength={500}
                  onChange={(event) => setGoalDraft(event.target.value)}
                  style={{ width: "100%", resize: "vertical" }}
                />
              ) : (
                <p>{accountGoal || "No financial goal saved yet."}</p>
              )}
              <div className="account-modal-actions">
                {isEditingGoal ? (
                  <button
                    type="button"
                    onClick={() => {
                      const savedGoal = goalDraft.trim();
                      try {
                        localStorage.setItem(GOAL_KEY, savedGoal);
                      } catch {
                        // Keep the updated goal in component state if storage is unavailable.
                      }
                      setAccountGoal(savedGoal);
                      setIsEditingGoal(false);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setGoalDraft(accountGoal);
                      setIsEditingGoal(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>

            <div className="account-section">
              <label className="account-check">
                <input
                  type="checkbox"
                  checked={messagesRead}
                  onChange={(event) => toggleRead(event.target.checked)}
                />
                <span>I have read all text messages.</span>
              </label>
              {readNotice && (
                <p className={`account-note ${readNotice.tone}`} role="status">
                  {readNotice.text}
                </p>
              )}
            </div>

            <form className="account-section" onSubmit={submitPassword}>
              <label htmlFor="account-new-password">New password</label>
              <PasswordField
                id="account-new-password"
                value={newPassword}
                onChange={setNewPassword}
              />
              <label htmlFor="account-confirm-password">
                Confirm new password
              </label>
              <PasswordField
                id="account-confirm-password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
              <div className="account-modal-actions">
                <button
                  type="submit"
                  disabled={
                    isSavingPassword || !newPassword || !confirmPassword
                  }
                >
                  {isSavingPassword ? "Changing…" : "Change password"}
                </button>
              </div>
              {passwordNotice && (
                <p
                  className={`account-note ${passwordNotice.tone}`}
                  role="status"
                >
                  {passwordNotice.text}
                </p>
              )}
            </form>

            <div className="account-modal-actions">
              <button
                type="button"
                onClick={() => {
                  closeAccount();
                  navigate("/");
                }}
              >
                Log Out
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}