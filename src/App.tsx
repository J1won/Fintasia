import { useState } from 'react'
import type { SubmitEvent } from 'react'
import './App.css'

 
interface LoginCredentials {
  username: string;
  password: string;
}
 
interface HeaderProps {
  onLogin: (creds: LoginCredentials) => void;
}
 
const Header: React.FC<HeaderProps> = ({ onLogin }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    onLogin({ username, password });
    setIsLoginOpen(false);
  };

  return (
    <header id='authArea'>
      {!isLoginOpen ? (
        <button className='sparkle-btn' onClick={() => setIsLoginOpen(true)}>
          Login
        </button>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
          type="submit"
          className='sparkle-btn'
          onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {window.location.href = '/login';}}>
            Sign In
          </button>
          <button
          type="button"
          className='sparkle-btn'
          onClick={() => setIsLoginOpen(false)}>
            Cancel
          </button>
        </form>
      )}

    </header>
  )
}

function App() {
//  const [count, setCount] = useState(0)
  const handleLogin = (creds: LoginCredentials) => {
    console.log("Attempting login:", creds);
    // Call your auth API here, e.g.:
    // await fetch('/api/login', { method: 'POST', body: JSON.stringify(creds) })
    
  };


  return (
    <>

    <section id="welcomeImg">
      <Header onLogin={handleLogin} />

    </section>
    </>
  )
}

export default App
