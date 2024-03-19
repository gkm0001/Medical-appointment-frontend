import React, { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from './Context/AuthContext.jsx'
// import { useAuth0 } from '@auth0/auth0-react';
 

function Home() {

  // const {user ,  loginWithRedirect , isAuthenticated} = useAuth0();

  
    let { userAuth : { access_token}} = useContext(UserContext);
  
  
 
  return (
    <>    
     {
       !access_token ? (
        <div className='h-screen bg-white w-full pt-1'>
 
          <div className='textstructure mt-10 px-10 '>
            <div className='masker'>
                 
                <h1 className="font-semibold uppercase text-[7vw] font-['Founders_Grotesk'] text-black leading-[6.5vw]">Welcome</h1>
            </div>
            <div className='masker '>  
                <h1 className=" font-semibold uppercase text-[7vw] font-['Founders_Grotesk'] text-black leading-[6.5vw]">TO</h1>
            </div>
            <div className='masker '>  
                <h1 className=" font-semibold uppercase text-[7vw] font-['Founders_Grotesk'] text-black leading-[6.5vw]">treat</h1>
            </div>

           {/* {
             (
              <Link to="/dashboard">
                    <botton className="w-50 h-30 bg-black text-white text-3xl rounded-full   absolute top-1/2 right-[30%]  px-10 py-3 -translate-y-5"  >
                  Get started
                  </botton>
                  
              </Link>  

             ) : ( */}

                <Link to="/signup">
                           <botton className="w-50 h-30 bg-black text-white text-3xl rounded-full   absolute top-1/2 right-[30%]  px-10 py-3 -translate-y-5"   >
                          Get started
                          </botton>
                </Link>
               
             {/* )
           }
            */}
  

          </div>

          <div className='w-full py-10 bg-black mt-10 rounded-3xl overflow-hidden'>

        <div className='text border-t-2 border-b-2 border-zine-300 flex gap-10  whitespace-nowrap text-white'>
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}}  transition={{ease:"linear" , repeat:Infinity , duration:8}} className='text-[10vw] leading-none font-["Founders_Grotesk_X-Condensed uppercase    font-semibold'> Find the Right Clinical trial for you !</motion.h1>
            <motion.h1 initial={{x:0}} animate={{x:"-100%"}}  transition={{ease:"linear" , repeat:Infinity , duration:8}} className='text-[10vw] leading-none font-["Founders_Grotesk_X-Condensed uppercase font-semibold'>Find the right Clinical trail for you ! </motion.h1>
        </div>

        </div>

          <div>
             
        </div>
 
  
        </div>
      ) : (
        <Navigate to ="/dashboard"/> 
      )
       
      
     
     }
        
    </>
    
  )
}

export default Home
