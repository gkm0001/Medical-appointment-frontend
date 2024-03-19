import React, { useContext } from 'react'
import InputBox from './InputBox.jsx'
// import Buttons from '../pages/Buttons'
// import Buttons from '../pages/Buttons.jsx'
import google from '../Images/google.png'
import { Link, Navigate } from 'react-router-dom'
import {toast , Toaster} from 'react-hot-toast'
import axios from 'axios'
import { storeInSession } from '../Common/Session.jsx'
// import { UserContext } from '../App.jsx'
import {UserContext} from '../Components/Context/AuthContext.jsx'
import { authWithGoogle } from './Firebase.jsx'
import { PersonalInfoDetails } from '../Components/Context/PersonalInfo/PersonalInfoDetails.jsx'

const Auth = ({type}) => {


  let { userAuth : {access_token} , setUserAuth}  = useContext(UserContext)
  let { userdata , userdata : { global_email , passwords } , setuserdata} = useContext(PersonalInfoDetails)

  // console.log(access_token);

  const userAuthThroughServer = (serverRoute , formdata) => {
     
      axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute , formdata)
      .then(({data})=> {

        
         
        storeInSession("user",JSON.stringify(data))
        console.log(data.loginStatus);
      //  console.log(data[0].age);
        setUserAuth(data)
        //  console.log(sessionStorage);
        //  console.log(data);
      })

      .catch((error) => {

        console.log(error.response.data.error);
       let errorMessage = error.response.data.error;

        if(errorMessage){
           return toast.error(errorMessage)
        }
        else {
           return toast.error("Please try again")
        }
 
     })
  }

  // const userAuth = async(serverRoute) => {
  //      await axios.get(import.meta.env.VITE_SERVER_DOMAIN + serverRoute)
  //      .then(({data})=> {
  //        console.log({data});
  //        storeInSession("user",JSON.stringify(data))
  //      })
  // }

 
  const handleSubmit = (e) => {

    let serverRoute = type === 'sign-in' ? '/signin' : '/signup';


    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      
    e.preventDefault();

    let form = new FormData(formElement)
    console.log(form);

    let formdata = {};

    for(let[key , value] of form.entries()) {
        formdata[key] = value
    }


    console.log(formdata);

    let { fullName , email , password } = formdata;
    

    
    if (fullName) {
      if (fullName.length < 3) {
          return toast.error("fullName must be greater than 3");
      }
  }
  
     if(!email) {
        return toast.error("Please Enter email")
     }
     if(!emailRegex.test(email)){
       return toast.error("Invalid Email")
     }
     if(!passwordRegex.test(password)){
       return toast.error("Password must contain at least 1 upper case and numreric number and 1 special character")
     }


    //  if (email == "gkm12345@gmail.com" && password === "Gkm@12345"){
    //      serverRoute = '/get-All-data'
    //       userAuth(serverRoute);
    //  }

    //  else {
       
          setuserdata({...userdata , global_email : email})

          if (password === 'Mishra@12345') {
            setuserdata(prevState => ({
                ...prevState,
                emails: email,
                passwords: password
            }));
        }
          // if(email == "gkm12345@gmail.com" && password == "Mishra@12345") {
          //    userAuthForAdmin('/get-details-admin')
          // }
          // else {
            userAuthThroughServer(serverRoute, formdata)
          // }
          

          console.log(formdata);
     }

  
  // }

  const handleGoogleAuth = async(e) => {

    e.preventDefault();

    console.log(e);

    await authWithGoogle().then((user)=> {
       
      let serverRoute = "/google-auth";

      console.log(user.email);

      setuserdata({...userdata , global_email : user.email})

      console.log(user.accessToken);

      let formdata = {
          access_token:user.accessToken
      }
      

      userAuthThroughServer(serverRoute, formdata)
      
        console.log(user);
    })
    .catch(err => {
        toast.error('trouble login through google')
        return console.log(err);
    })
  }

  return (
    <>
         {
           access_token ? <Navigate to= "/dashboard"/> : 

           <div className='flex justify-center items-center '>
           <Toaster/>
          <form id='formElement'>

             <h1 className='font-gelasio text-3xl md:text-5xl text-center  mb-12 md:mb-20'>
                 { type == 'sign-in' ? 'Please Login' : 'Create an Account'}
             </h1>

             <div className=''>
                     {    
                          type == 'sign-up' ?
                           <InputBox type ="text" placeholder="fullName" icon = "fi-tr-circle-user" Name="fullName"> 

                           </InputBox> 
                            : ''
                     }
                    

                     <InputBox type="email" placeholder="Email" icon="fi-ts-circle-envelope" 
                     Name="email">
                     
                     </InputBox>

                     <InputBox type="password" placeholder="Password" icon="fi-rr-lock" Name="password">
                     
                     </InputBox>

             </div>
             
              <button type='submit' className='bg-black text-white absolute translate-x-20 mt-5 md:translate-x-32 h-12 w-28 hover:bg-opacity-80 rounded-full ' 
                 onClick={handleSubmit}>
                   {type == 'sign-in' ? 'Sign In' : 'Sign Up'}
              </button>

              <div className='flex mt-24  gap-2 opacity-40 '>
                     <hr className='w-1/2 border-black'/>
                     <p className='-translate-y-3.5'>or</p>
                     <hr className='w-1/2 border-black'/>
             </div>

               <button className='flex rounded-full bg-black text-white h-12 w-full items-center justify-center gap-2' onClick={handleGoogleAuth}>
                  <img src={google}  className='w-6 h-6'/>
                  <p>Continue with Google </p>
               </button>

              <div className='flex items-center justify-center gap-1 mt-1'>
             
                   <p>{type == 'sign-in' ? "Don't have an account?" : "Already have an account?" }</p>

                   <Link to={type == 'sign-in' ? '/signup' : '/signin'}>

                   <button className='font-bold cursor-pointer' >

                     {type == 'sign-up' ? 'Sign In' : 'Sign Up' } 

                   </button>

                   </Link>
                   
              </div>

          </form>

 </div>  
         }
           
    </>
  )
}

export default Auth
