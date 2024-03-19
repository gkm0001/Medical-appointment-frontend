import React, { useContext, useEffect } from 'react'
import { PersonalInfoDetails } from '../Context/PersonalInfo/PersonalInfoDetails'
import { UserContext } from '../Context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom';
import img from '../../Images/left.png'
import { userDataContext } from '../Context/UserData';

function UserStatus() {

    let { userdata: { ages , Current_medical_Conditions , names ,Diseases , genders}  }  = useContext(PersonalInfoDetails)
    let {userAuth : {fullName , access_token} } = useContext(UserContext)

    
    let{alluserdata  } = useContext(userDataContext);

//     if(alluserdata)
//     console.log(alluserdata[0].UsersDetails[0].gender);
//     console.log(alluserdata[0].UsersDetails[0].name);
//     console.log(alluserdata[0].medical_history[0].Disease);
//     console.log(alluserdata[0].medical_history[0].scores);
    


const handleSubmit = (e) => {
  e.preventDefault(); // Prevent default form submission

  // ... form validation and server communication

  const navigate = useNavigate();
  navigate('/dashboard'); // Navigate to the dashboard after successful authentication
}

  return (

 <>  
    {
         access_token ? (
            
          alluserdata && alluserdata.length > 0 ? (<div>

                   { alluserdata.map((userdatas , index)=> (

                     <div key={index}  className='bg-gray-300 rounded-lg mb-2 mx-4 mt-5'>

                              <div className='  p-6 translate-x-10 '>

                              <div className='mb-2  text-xl font-medium'><span className='text-2xl font-bold '>Name : </span>  { userdatas.UsersDetails[0].name}</div>

                              <div className='mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Age : </span>  {userdatas.UsersDetails[0].age}</div>

                              <div className='mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Gender : </span>  {userdatas.UsersDetails[0].gender}</div>

                              <div className='mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Disease : </span>  {userdatas.medical_history[0].Disease}</div>

                              <div className='mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Medical Condition : </span>  {userdatas.medical_history[0].Medical_Condition}</div>

                               

                             </div>
           
                 </div>

          ))} 
           <button onClick={handleSubmit} className='w-9 h-10 bg-gray-300 hover:opacity-80 rounded-full absolute top-12 translate-y-2 translate-x-3 button'>
              <img src={img} className= "translate-x-1" />
          </button>

           </div>):(
               <div>
                 
                  <div className='bg-gray-300 rounded-lg mb-2 mx-4 mt-5'>
                    <div className='  p-6 translate-x-10 '>
                    <div className='mb-2  text-xl font-medium'><span className='text-2xl font-bold '>Name : </span>  {names || fullName}</div>
                    <div className='mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Age : </span>  {ages}</div>
                    <div className='mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Gender : </span>  {genders}</div>
                    <div className='mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Disease : </span>  {Diseases}</div>
                    <div className='mb-2 text-xl font-medium'><span className='text-2xl font-bold'>Medical Condition : </span>  {Current_medical_Conditions}</div>
                     

                  </div>
          
                </div>

          <button onClick={handleSubmit} className='w-9 h-10 bg-gray-300 hover:opacity-80 rounded-full absolute top-12 translate-y-2 translate-x-3 button'>
              <img src={img} className= "translate-x-1" />
          </button>
            </div>
           )
            
            
            
         ):( 
              <Navigate to = "/"/>
         )
    }
            
 </>
   


  )
}

export default UserStatus
