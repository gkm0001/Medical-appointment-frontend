// import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
// import { UserContext } from './Context/AuthContext'
 

// function Navbar() {

 
//   let { userAuth : {access_token}} = useContext(UserContext)
//     // bg-transparent  fixed top-0 z-50
//   return (
//     <>

//     <div className='flex w-full justify-between md:h-20 h-30 p-5 z-10 relative'>
//         <div className='font-bold mt-3'>
//                 Treat
//         </div>

//         <div className='flex md:gap-10 gap-3'>

//             {
//                  access_token ? (
//                             <>
//                              <Link to="/dashboard" >
//                                 <div className='mt-3 cursor-pointer'>
//                                   Home
//                                 </div>
//                             </Link>
            

//                             <div className='mt-3 cursor-pointer'>
//                                 About us
//                             </div>
//                            </>
//                  ):('')
//             }
           
          

//                     {/* isAuthenticated && (
//                         <div>
//                             <img src={user.picture} alt={user.name} />
//                             <h2>{user.name}</h2>
//                             <p>{user.email}</p>
//                         </div>
//                         )  */}

//                         {
//                              access_token ? (
//                                 <button className='flex justify-center items-center  text-black hover:bg-gray-300 bg-gray-200 h-12 w-28 hover:bg-opacity-80 rounded-full' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
//                                    Logout
//                                   </button>
//                              ):(
//                                     <div className='flex gap-3'>
//                                         <Link to="/signin">
//                                         <button className='hidden md:block md:flex justify-center items-center  text-black hover:bg-gray-300 bg-gray-200 h-12 w-28 hover:bg-opacity-80 rounded-full'  >
//                                             Sign In 
//                                         </button>
//                                         </Link>
                                        
//                                         <Link to="/signup">
//                                             <button className='flex justify-center items-center bg-black text-white h-12 w-28 hover:bg-opacity-80 rounded-full' >
//                                                 Sign Up 
//                                             </button>
//                                         </Link>
                                        
//                                     </div>
                                   
//                              )
//                         }
            
//         </div>
//     </div>
//     <hr className='relative bg-gray-500 w-full   '/>
//     </>
  

//   )
// }

// export default Navbar

import React, { useContext, useEffect, useState } from 'react'
 
import Buttons from '../pages/Buttons.jsx'
import { useMediaQuery } from 'react-responsive'    
// import Auth from '../Auth/Auth.jsx'
import { Link, useLocation } from 'react-router-dom'
// import { UserContext } from '../App.jsx'
import { UserContext } from './Context/AuthContext.jsx'
import {  removeFromSession ,  getFromSession} from '../Common/Session.jsx';
 

// import { logout} from '../Common/Session.jsx'
 

function Navbar() {

   const [visible , setvisible]  = useState(false);
   const [visibles, setvisibles] = useState(true);
   const isMediumScreen = useMediaQuery({ minWidth: 768 });
   const [store , setstore] = useState("");
   const location = useLocation();
   const [naviVisi,setnaviVisi] = useState(false)
    
    
   let { userAuth , userAuth : {access_token ,username ,  profile_img} , setUserAuth} = useContext(UserContext);
 
  
 

   const hideNavigationBar = () => {

       
      setnaviVisi(!naviVisi);
        
   }

  

   const handleBlur = () => {
      
    setTimeout(()=> {
      
      setnaviVisi(false)
    },100)
     
   }

   useEffect(() => {
     
    const isAuthPage = location.pathname.includes('signup') || location.pathname.includes('signin');

    location.pathname.includes('signup') ? setstore("signup") : setstore("signin");
    
    
    setvisibles(!isAuthPage);

  }, [location]);

  // let handleSignOut = () => {
  //   console.log("Sign out button clicked!"); // Add this line to verify if the function is called
  //   removeFromSession("user");
  //   console.log("User session removed."); // Add this line to verify if session removal works
  //   loadSessionData();
  //   console.log("Session reloaded."); // Add this line to verify if session reloading works
  // };

 

  const handleSubmit = () => {
     removeFromSession("user");
     
     setUserAuth({...userAuth , access_token : null})
     window.location.reload();
  }

  //  const handleSubmit = () => {
        
  //      setvisible(!visible);
  //  }

  return (

    <>

<div className='flex w-full justify-between md:h-20 h-40 p-5 flex w-full justify-between md:h-20 h-30 p-5 z-10 relative'>
       
       <div className='flex gap-2'>

            <h1 className='font-bold'>Treat</h1>
 
        </div>


        <div className='flex gap-5 '>
                <Buttons className="hidden md:block bg-white -translate-x-8 text-black" text="About us"  >
               </Buttons>
       {
          access_token ? (
              <div onBlur={handleBlur} onClick={hideNavigationBar} > 
                    
                       <button className='' >
                            <img src={profile_img} className='w-10 h-10 rounded-full'  />
                       </button>
                       <button onClick={handleSubmit}  className=' h-12 w-28 hover:bg-opacity-80 rounded-full bg-black text-white' >
                           Logout
                       </button>
              
                   
            
                      
              </div> ) : (

                   <div className='flex'>

                   <Link to="/signin">
     
                   <Buttons className="hidden md:block bg-gray-200 text-black hover:bg-gray-300" text="Sign In">
                         
                     </Buttons>
                   </Link>
                     
                     {
                        !isMediumScreen ? ( <Link to= {store == "signin" ?  "/signup" : "/signin"}>
                        <Buttons className="bg-black text-white" text={store == 'signin' ? 'Sign Up' : 'Sign In'}>
                             
                        </Buttons>
                    </Link> ): (
                       
                       <Link to="/signup">
                        <Buttons className="bg-black text-white" text="Sign Up">
                             
                        </Buttons>
                    </Link> 
                        
                        )
                        
                       }   
                     
                     </div>
              )

             
          }
                    
                
         </div> 

    </div>
   
    
       

         </>
  )
}

export default Navbar
