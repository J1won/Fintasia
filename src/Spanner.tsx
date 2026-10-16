import { type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";
import "./Spanner.css";

interface SpannerProps {
  onAccountClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Spanner({ onAccountClick }: SpannerProps) {
  const navigate = useNavigate();

  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <button
        type="button"
        className="logo-button"
        aria-label="Go to Start page"
        onClick={() => navigate("/start")}
      >
        <img src={logo} alt="Home reroute logo" />
      </button>
      <button type="button" className="profile-button" onClick={onAccountClick}>
        Account
      </button>
    </nav>
  );
}