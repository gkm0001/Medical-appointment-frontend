import React, { useEffect, useState } from "react"
import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Layout from "./Layout"
import Home from "./Components/Home.jsx"
import PersonalInfo from "./form/PersonalInfo.jsx"
import { PersonalInfoDetails } from './Components/Context/PersonalInfo/PersonalInfoDetails.jsx';
import { userPersonlaInfoDetails } from './Components/Context/PersonalInfo/PersonalInfoDetails.jsx';
import MedicalDetails from "./form/MedicalDetails.jsx"
import Dashboard from "./Components/Dashboard.jsx"
// import UserStatus from "./Components/UserStatus/UserStatus.jsx"
import { getFromSession } from "./Common/Session.jsx"
import { UserContext } from "./Components/Context/AuthContext.jsx"
import { userDataContext } from "./Components/Context/UserData.jsx"
import Auth from "./auth/Auth.jsx";
import UserStatus from "./Components/UserStatus/UserStatus.jsx"
// import Auth from "./Auth/Auth.jsx"
 

function App() {
 
   let [userdata , setuserdata] = useState(userPersonlaInfoDetails)

   let[userAuth , setUserAuth ] = useState({});

   let[alluserdata , setalluserdata] = useState({});


   useEffect(()=>{
        let userInSession = getFromSession("user")

        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token : null})
   },[])


  return (

     <>
       <UserContext.Provider value={{userAuth , setUserAuth}}>
                   <PersonalInfoDetails.Provider value={{userdata , setuserdata}}>

                    <userDataContext.Provider value={{alluserdata , setalluserdata}}>

                   

            <BrowserRouter>

                <Routes>

                    <Route path="/" element = {<Layout/>}>
                    <Route path="" element={<Home/>} />
                    <Route path= "signup" element = {<Auth type="sign-up"/>}/>
                    <Route path = "signin" element = {<Auth type="sign-in"/>}/>
                    <Route path="personalInfo" element={<PersonalInfo/>}/>
                    <Route path="medicalDetails" element={<MedicalDetails/>}/>
                    <Route path="dashboard" element = {<Dashboard/>} />
                    <Route path = "checkstatus" element = {<UserStatus/>} /> 
                    </Route>

                </Routes>

            </BrowserRouter>

                </userDataContext.Provider>

                    </PersonalInfoDetails.Provider>
       </UserContext.Provider>
        
     </>
  )
}

export default App
