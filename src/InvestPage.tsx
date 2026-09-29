import { useState } from 'react'
import './LandingPage.css'

import logo from './assets/logo.png'

function InvestPage() {
     return(
          <>
               <div className='nav-bar'>
                         <button className="logo-button" onClick={() => window.location.href='/landing'}>
                              <img src={logo} alt="Home reroute logo" />
                         </button>

               </div>
               <div>
                    <h1>
                         Start your investing journey!
                    </h1>
                    
               </div>
          </>
     )
}
export default InvestPage