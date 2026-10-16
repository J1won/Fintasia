import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./Spanner.css";

const GOAL_KEY = "mm-goal";

const loadGoal = () => {
  try {
    return localStorage.getItem(GOAL_KEY) ?? "";
  } catch {
    return "";
  }
};

interface SpannerProps {
  onAccountModalChange?: (isOpen: boolean) => void;
}

export default function Spanner({ onAccountModalChange }: SpannerProps) {
  const navigate = useNavigate();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountGoal, setAccountGoal] = useState(() => loadGoal());
  const [goalDraft, setGoalDraft] = useState("");
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [modalOrigin, setModalOrigin] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    if (!isAccountOpen) return;
    const savedGoal = loadGoal();
    setAccountGoal(savedGoal);
    setGoalDraft(savedGoal);
    setIsEditingGoal(false);
  }, [isAccountOpen]);

  const openAccount = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
    const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
    setModalOrigin({ x: `${x}%`, y: `${y}%` });
    setIsAccountOpen(true);
    onAccountModalChange?.(true);
  };

  const closeAccount = () => {
    setIsAccountOpen(false);
    onAccountModalChange?.(false);
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
            <p>Here’s your saved financial goal.</p>
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