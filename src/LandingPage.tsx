import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
import landingPageImage from './assets/landingPageImage.png'
import logo from './assets/logo.png'
import shGrandpa from './assets/shakygp.png'
import chGrandpa from './assets/chillgp.png'
import scroll from './assets/scroll.png'

function LandingPage() {
     const navigate = useNavigate();
     const [isScrollHovered, setIsScrollHovered] = useState(false);
     const [isScrollOpen, setIsScrollOpen] = useState(false);
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
                              type="button"
                              onClick={() => setIsScrollOpen(true)}
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

                    {isScrollOpen && (
                         <div
                              className="scroll-modal-backdrop"
                              role="presentation"
                              onClick={() => setIsScrollOpen(false)}
                         >
                              <section
                                   className="scroll-modal"
                                   role="dialog"
                                   aria-modal="true"
                                   aria-labelledby="scroll-modal-title"
                                   onClick={(event) => event.stopPropagation()}
                              >
                                   <button
                                        className="scroll-modal-close"
                                        type="button"
                                        aria-label="Close financial literacy window"
                                        onClick={() => setIsScrollOpen(false)}
                                   >
                                        <span aria-hidden="true">&#215;</span>
                                   </button>
                                   <h2 id="scroll-modal-title">Financial Literacy</h2>
                                   <p>Build the knowledge to make confident money decisions.</p>
                              </section>
                         </div>
                    )}
                    
               </div>
          </>
     )
}
export default LandingPage