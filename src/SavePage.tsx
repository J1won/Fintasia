import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import './LandingPage.css'
import landingPageImage from './assets/landingPageImage.png'
import logo from './assets/logo.png'
import "./VersionOnePage.css";

function SavePage() {
     

     return(
          <>
               <div className="landing-page" style={{ "--landing-image": `url(${landingPageImage})` } as CSSProperties}>
                    <div className='nav-bar'>
                         <button className="logo-button" onClick={() => navigate('/landing')}>
                              <img src={logo} alt="Home reroute logo" />
                         </button>

                         <button className="profile-button" onClick={(event) => openFromButton(event, () => setIsButtonOneOpen(true))}>
                              Account
                         </button>
                    </div>
                    
                    <h1></h1>

                    <div className="button-stack">
                         <button className="big-btn" onClick={() => window.location.href='/save'}>
                              All About Saving!
                         </button>
                         <button className="big-btn" onClick={() => window.location.href='/start'}>
                              All About Starting!
                         </button>
                         <button className="big-btn" onClick={() => window.location.href='/versionOne'}>
                              under construction
                         </button>
                    </div>
               </div>
          </>
     )
}
export default SavePage