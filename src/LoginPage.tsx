import { useState } from 'react'
import type { SubmitEvent } from 'react'
import './LoginPage.css'
import welcomeLogo from './assets/welcomeLogo.png'
import { useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'

const MIN_PASSWORD_LENGTH = 6
// Supabase Auth needs an email, so the username is turned into a private fake one
const USERNAME_DOMAIN = "fintasia.app"
const USERNAME_PATTERN = /^[a-z0-9_.-]{3,20}$/

const toEmail = (username: string) =>
  `${username.trim().toLowerCase()}@${USERNAME_DOMAIN}`;

type AuthMode = "none" | "login" | "signup";
 
interface LoginCreds {
  username: string;
  password: string;
}
interface SignupDetails {
  username: string;
  password: string;
  passwordTwo: string;
}

// error: message to show on failure (null = success)
interface AuthResult {
  error: string | null;
}

interface HeaderProps {
  onLogin: (creds: LoginCreds) => Promise<AuthResult>;
  onSignup: (details: SignupDetails) => Promise<AuthResult>;
}

const Header: React.FC<HeaderProps> = ({ onLogin, onSignup }) => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("none");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  // Login form state
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordTwo, setSignupPasswordTwo] = useState("");

  const switchMode = (mode: AuthMode) => {
    setErrorMsg(null);
    setAuthMode(mode);
  };

  const handleResult = (result: AuthResult) => {
    if (result.error) {
      setErrorMsg(result.error);
    } else {
      navigate('/start');
    }
  };

  const handleLoginSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsBusy(true);
    handleResult(await onLogin({ username: loginUsername, password: loginPassword }));
    setIsBusy(false);
  };

  const handleSignupSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsBusy(true);
    handleResult(
      await onSignup({
        username: signupUsername,
        password: signupPassword,
        passwordTwo: signupPasswordTwo,
      }),
    );
    setIsBusy(false);
  };

  return (
    <header id='authArea'>
      {/* /////////// Default Welcome Page /////////////// */}
      {authMode === "none" && (
        <>
          <button className='sparkle-btn' onClick={() => switchMode("login")}>
            Login
          </button>
          <button className='sparkle-btn' onClick={() => switchMode("signup")}>
            Sign Up
          </button>
        </>
      )}
      {/* /////////// Login Creds Welcome Page /////////////// */}
      {authMode === "login" && (
        <form className="loginForm" onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            className="input"
            autoFocus
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className='sparkle-btn' disabled={isBusy}>
            {isBusy ? "Signing in…" : "Sign In"}
          </button>
          <button type="button" className='sparkle-btn' onClick={() => switchMode("none")}>
            Cancel
          </button>
          {errorMsg && (
            <p className="auth-error" role="alert">
              {errorMsg}
            </p>
          )}
        </form>
      )}
      {/* /////////// Sign Up Welcome Page /////////////// */}
      {authMode === "signup" && (
        <form className="loginForm" onSubmit={handleSignupSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            className="input"
            autoFocus
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Retype Password"
            value={signupPasswordTwo}
            onChange={(e) => setSignupPasswordTwo(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className='sparkle-btn' disabled={isBusy}>
            {isBusy ? "Creating…" : "Create Account"}
          </button>
          <button type="button" className='sparkle-btn' onClick={() => switchMode("none")}>
            Cancel
          </button>
          {errorMsg && (
            <p className="auth-error" role="alert">
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </header>
  )
}

function LoginPage() {
  const handleLogin = async (creds: LoginCreds): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: toEmail(creds.username),
      password: creds.password,
    });
    if (error) return { error: "Wrong username or password." };
    return { error: null };
  };

  const handleSignup = async (details: SignupDetails): Promise<AuthResult> => {
    if (!USERNAME_PATTERN.test(details.username.trim().toLowerCase())) {
      return {
        error: "Username must be 3-20 characters: letters, numbers, . _ -",
      };
    }
    if (details.password.length < MIN_PASSWORD_LENGTH) {
      return { error: `Use at least ${MIN_PASSWORD_LENGTH} characters.` };
    }
    if (details.password !== details.passwordTwo) {
      return { error: "The passwords don't match." };
    }
    const { error } = await supabase.auth.signUp({
      email: toEmail(details.username),
      password: details.password,
    });
    if (error) {
      const taken =
        error.code === "user_already_exists" ||
        /already registered/i.test(error.message);
      return { error: taken ? "That username is already taken." : error.message };
    }
    return { error: null };
  };

  return (
    <>
      <section id="center">
        <img src={welcomeLogo} height="300" alt="" />
        <Header onLogin={handleLogin} onSignup={handleSignup} />
      </section>
    </>
  )
}

export default LoginPage