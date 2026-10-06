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
     const [isButtonOneOpen, setIsButtonOneOpen] = useState(false);
     // const [isButtonTwoOpen, setIsButtonTwoOpen] = useState(false);
     const [modalOrigin, setModalOrigin] = useState({ x: '50%', y: '50%' });

     const openFromButton = (event: React.MouseEvent<HTMLButtonElement>, openModal: () => void) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
          const y = ((rect.top + rect.height / 2) / window.innerHeight) * 100;
          setModalOrigin({ x: `${x}%`, y: `${y}%` });
          openModal();
     };

     return(
          <>
               <div className="landing-page" style={{ 
                    backgroundImage: `url(${landingPageImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '100vh'
               }}>
                    <div className='nav-bar'>
                         <button className="logo-button" onClick={() => navigate('/landing')}>
                              <img src={logo} alt="Home reroute logo" />
                         </button>

                         <button className="profile-button" onClick={(event) => openFromButton(event, () => setIsButtonOneOpen(true))}>
                              Account
                         </button>
                         {isButtonOneOpen && (
                              <div
                                   className="scroll-modal-backdrop"
                                   role="presentation"
                                   onClick={() => setIsButtonOneOpen(false)}
                              >
                                   <section
                                        className="scroll-modal"
                                        style={{
                                             ['--modal-origin-x' as any]: modalOrigin.x,
                                             ['--modal-origin-y' as any]: modalOrigin.y,
                                        }}
                                        role="dialog"
                                        aria-modal="true"
                                        aria-labelledby="button-one-modal-title"
                                        onClick={(event) => event.stopPropagation()}
                                   >
                                        <button
                                             className="scroll-modal-close"
                                             type="button"
                                             aria-label="Close button one window"
                                             onClick={() => setIsButtonOneOpen(false)}
                                        >
                                             <span aria-hidden="true">&#215;</span>
                                        </button>
                                        
                                        <h2 id="button-one-modal-title">Button One</h2>
                                        <p>Explore your next financial move with confidence.</p>
                                        <button  onClick={() => window.location.href='/'}> 
                                             Log Out
                                        </button>
                                   </section>
                              </div>
                         )}
                    </div>
                    
                    <h1>
                         
                    </h1>

                    <div id='scroll-gp-group'>
                         {/* scroll grandpa */}

                         <button
                              type="button"
                              onClick={(event) => openFromButton(event, () => setIsScrollOpen(true))}
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
                                   style={{
                                        ['--modal-origin-x' as any]: modalOrigin.x,
                                        ['--modal-origin-y' as any]: modalOrigin.y,
                                   }}
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
                                   <p>Me and all the whimsy creatures here are so glad you're here at Fintasia!</p>
                                   <p>In order to stay here, you must follow the three most important rules of Fintasia.
                                        1. Love yourself. and  Respect yourself. 
                                   </p>
                                   <p>
                                        In everything we teach here, loving yourself lies at the center of it all.
                                   </p>
                              </section>
                         </div>
                    )}

                    <div className="button-stack">
                         <button className="big-btn" onClick={() => window.location.href='/save'}>
                              All About Saving!
                         </button>
                         <button className="big-btn" onClick={() => window.location.href='/invest'}>
                              All About Investing!
                         </button>
                         <button className="big-btn" onClick={() => window.location.href='/versionOne'}>
                              under construction
                         </button>
                    </div>

                    
{/* 
                    {isButtonTwoOpen && (
                         <div
                              className="scroll-modal-backdrop"
                              role="presentation"
                              onClick={() => setIsButtonTwoOpen(false)}
                         >
                              <section
                                   className="scroll-modal"
                                   style={{
                                        ['--modal-origin-x' as any]: modalOrigin.x,
                                        ['--modal-origin-y' as any]: modalOrigin.y,
                                   }}
                                   role="dialog"
                                   aria-modal="true"
                                   aria-labelledby="button-two-modal-title"
                                   onClick={(event) => event.stopPropagation()}
                              >
                                   <button
                                        className="scroll-modal-close"
                                        type="button"
                                        aria-label="Close button two window"
                                        onClick={() => setIsButtonTwoOpen(false)}
                                   >
                                        <span aria-hidden="true">&#215;</span>
                                   </button>
                                   <h2 id="button-two-modal-title">Button Two</h2>
                                   <p>See your goals, habits, and plans in one place.</p>
                              </section>
                         </div>
                    )} */}
                    
               </div>
          </>
     )
}
export default LandingPage