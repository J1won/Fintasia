import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import landingPageImage from './assets/landingPageImage.png'
import logo from './assets/logo.png'
import shGrandpa from './assets/shakygp.png'
import chGrandpa from './assets/chillgp.png'
import scroll from './assets/scroll.png'

function LandingPage() {
     const navigate = useNavigate();
     const [isScrollHovered, setIsScrollHovered] = useState(false);
     return(
          <>
               {/* <div className="nav-bar">
                    <button className='sparkle-btn'>
                         Fintasia
                    </button>
                    <button className='sparkle-btn' onClick={() => window.location.href='/'}>
                         Log Out
                    </button>

               </div> */}
               <div className="landing-page" style={{ 
                    backgroundImage: `url(${landingPageImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh'
               }}>
                    <div className='nav-bar'>
                         <button className="logo-button" onClick={() => navigate('/login')}>
                              <img src={logo} alt="Home reroute logo" />
                         </button>
                         
                         <button onClick={() => window.location.href='/'}>
                              Log Out
                         </button>
                    </div>
                    
                    <h1>
                         
                    </h1>

                    <div id='scroll-gp-group'>
                         {/* scroll grandpa */}

                         <button
                              onClick={() => navigate('/login')}
                              onMouseEnter={() => setIsScrollHovered(true)}
                              onMouseLeave={() => setIsScrollHovered(false)}
                         >
                              <img src={scroll} alt="Financial Literacy Scroll" />
                         </button>
                         <img
                              className={isScrollHovered ? 'grandpa-shaking' : ''}
                              src={isScrollHovered ? shGrandpa : chGrandpa}
                              alt={isScrollHovered ? 'shaky reaction grandpa' : 'chill grandpa'}
                         />
                    </div>
                    
               </div>
          </>
     )
}
export default LandingPage