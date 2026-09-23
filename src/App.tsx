import { useState } from 'react'
import type { SubmitEvent } from 'react'
import './App.css'
import welcomeLogo from './assets/welcomeLogo.png'

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
 
interface HeaderProps {
  onLogin: (creds: LoginCreds) => void;
  onSignup: (details: SignupDetails) => void;
}
 
const Header: React.FC<HeaderProps> = ({ onLogin, onSignup }) => {
  const [authMode, setAuthMode] = useState<AuthMode>("none");

  // Login form state 
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPasswordTwo, setSignupPasswordTwo] = useState("");


  const handleLoginSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    onLogin({ username: loginUsername, password: loginPassword });
  };
 
  const handleSignupSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    onSignup({ username: signupUsername, password: signupPassword, passwordTwo: signupPasswordTwo });
  };


  return (
    <header id='authArea'>
      {/* /////////// Default Welcome Page /////////////// */}
      {authMode === "none" && (
        <>
          <button className='sparkle-btn' onClick={() => setAuthMode("login")}>
            Login
          </button>
          <button className='sparkle-btn' onClick={() => setAuthMode("signup")}>
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
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="input"
          />
          <button type="submit" className='sparkle-btn' onClick={() => window.location.href='/landing'}>
            Sign In
          </button>
          <button type="button" className='sparkle-btn' onClick={() => setAuthMode("none")}>
            Cancel
          </button>
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
          />
          <input
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Retype Password"
            value={signupPasswordTwo}
            onChange={(e) => setSignupPasswordTwo(e.target.value)}
            className="input"
          />
          <button type="submit" className='sparkle-btn' onClick={() => window.location.href='/login'}>
            Create Account
          </button>
          <button type="button" className='sparkle-btn' onClick={() => setAuthMode("none")}>
            Cancel
          </button>
        </form>
      )}
    </header>
  )
}

function App() {
//  const [count, setCount] = useState(0)
  const handleLogin = (creds: LoginCreds) => {
    console.log("Attempting login:", creds);
    // Call your auth API here, e.g.:
    // await fetch('/api/login', { method: 'POST', body: JSON.stringify(creds) })

  };
  const handleSignup = (details: SignupDetails) => {
    console.log("Attempting signup:", details);
    // Call your signup API here, e.g.:
    // await fetch('/api/signup', { method: 'POST', body: JSON.stringify(details) })
  };

  return (
    <>
    <section id="center">
      <img src={welcomeLogo}  height="300" alt="" />
      <Header onLogin={handleLogin} onSignup={handleSignup} />

    </section>
    </>
  )
}

export default App
