

function InvestPage() {
     return(
          <>
               <div className="nav-bar">
                    <button className='sparkle-btn'>
                         Fintasia
                    </button>
                    <button className='sparkle-btn' onClick={() => window.location.href='/'}>
                         Log Out
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