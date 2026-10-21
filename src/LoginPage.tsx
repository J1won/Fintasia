
import { useState } from 'react'
import type { SubmitEvent } from 'react'
import './LoginPage.css'
import welcomeLogo from './assets/welcomeLogo.png'
import { useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'

const MIN_PASSWORD_LENGTH = 6

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

interface AuthResult {
  error: string | null;
}

interface HeaderProps {
  onLogin: (creds: LoginCreds) => Promise<AuthResult>;
  onSignup: (details: SignupDetails) => Promise<AuthResult>;
}

// Header handles UI and form submission
const Header = ({ onLogin, onSignup }: HeaderProps) => {
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
    if (isBusy) return;
    setErrorMsg(null);
    setIsBusy(true);

    try {
      const result = await onLogin({
        username: loginUsername,
        password: loginPassword,
      });

      handleResult(result);
    } catch {
      setErrorMsg("Unable to sign in. Please try again.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleSignupSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (isBusy) return;

    setErrorMsg(null);
    setIsBusy(true);

    try {
      const result = await onSignup({
        username: signupUsername,
        password: signupPassword,
        passwordTwo: signupPasswordTwo,
      });

      handleResult(result);
    } catch {
      setErrorMsg("Unable to create account. Please try again.");
    } finally {
      setIsBusy(false);
    }
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
          {errorMsg && (
            <p className="auth-error" role="alert">
              {errorMsg}
            </p>
          )}
          <input
            type="email"
            placeholder="Email"
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
          <button type="button" className='sparkle-btn' onClick={() => switchMode("none")} disabled={isBusy}>
            Cancel
          </button>
        </form>
      )}

      {/* Signup Form */}
      {authMode === "signup" && (
        <form className="loginForm" onSubmit={handleSignupSubmit}>
          {errorMsg && (
            <p className="auth-error" role="alert">
              {errorMsg}
            </p>
          )}
          <input
            type="email"
            placeholder="Email"
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
            minLength={MIN_PASSWORD_LENGTH}
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
          <button type="button" className='sparkle-btn' onClick={() => switchMode("none")} disabled={isBusy}>
            Cancel
          </button>
        </form>
      )}
    </header>
  );
};

function LoginPage() {

  const handleLogin = async (creds: LoginCreds): Promise<AuthResult> => {
    const { error } = await supabase.auth.signInWithPassword({
      email: creds.username.trim(),
      password: creds.password,
    });
    if (error) {
      return {
        error: "Incorrect email or password.",
      };
    }
    return { error: null };
  };

  const handleSignup = async (details: SignupDetails): Promise<AuthResult> => {
    const email = details.username.trim().toLowerCase();

    if (details.password.length < MIN_PASSWORD_LENGTH) {
      return {
        error: `Use at least ${MIN_PASSWORD_LENGTH} characters.`,
      };
    }
    if (details.password !== details.passwordTwo) {
      return {
        error: "The passwords don't match.",
      };
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password: details.password,
    });
    if (error) {
      const taken =
        error.code === "user_already_exists" ||
        /already registered/i.test(error.message);
      return {
        error: taken
          ? "This email is already registered."
          : error.message,
      };
    }
    if (!data.session) {
      return {
        error: "Account created, but no session was returned. Please sign in.",
      };
    }
    return { error: null };
  };

  return (
    <section id="center">
      <img src={welcomeLogo} height="300" alt="" />

      <Header
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    </section>
  );
}

export default LoginPage;