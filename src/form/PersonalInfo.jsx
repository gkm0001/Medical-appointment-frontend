import React, { useContext } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { PersonalInfoDetails } from '../Components/Context/PersonalInfo/PersonalInfoDetails';
import axios from 'axios'
import '../App.jsx'
import { useAuth0 } from '@auth0/auth0-react';
import {  Navigate, useNavigate } from 'react-router-dom';
import MedicalDetails from './MedicalDetails.jsx';
import { UserContext } from '../Components/Context/AuthContext.jsx';
 
 

function PersonalInfo() {

     
    const navigate = useNavigate();
    let { userAuth : { access_token}} = useContext(UserContext)
    
    let { userdata , userdata : { names , addresss , global_email , emails , ages , genders , dateofberth}, setuserdata } = useContext(PersonalInfoDetails);
 
    
  
    const handleSubmit = (e) => {
        e.preventDefault();

        let form = new FormData(formElement)
   
        let formdata = {};

            for(let[key , value] of form.entries()) {
                formdata[key] = value
            }
            
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            console.log(formdata);

            let { name , email , address , dateOfBerth , gender  } = formdata;

            if(!name.length || name.length < 3 ) {
                 return toast.error("Please enter the name ");
            }
            if(!email.length) {
                 return toast.error("Please Enter a email");
            }
            if(!emailRegex.test(email)){
                 return toast.error("Invalid email");
            }
         
            if(!dateOfBerth){
                 return toast.error("Enter the date of berth")
            }
            console.log(dateOfBerth);
             
            

            if(!gender) {
                 return toast.error("Please select the gender")
            }
 
            if(!gender.length) {
                 return toast.error("Please enter gender");
            }
            const today = new Date();
            const birthDate = new Date(dateOfBerth);
            console.log(birthDate);
        
            let age = today.getFullYear() - birthDate.getFullYear();
            console.log(age);
            const monthDiff = today.getMonth() - birthDate.getMonth();
            console.log(monthDiff);
        
           
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        
             console.log(age);

            setuserdata({...userdata , ages : age});

              console.log(userdata);

              let data = {
                 names , ages , addresss , emails , genders , userEmail :  global_email
              }
 

              axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/details1', data)
              .then(({ data }) => {
                if (data) {

                    toast.success("Store successfully");
                     

                    setTimeout(() => {
                        navigate('/medicalDetails');
                      }, 1000); // Delay redirection by 1 second (1000 milliseconds)

                    //   console.log("data :", data);

                  
                 
                } else {
                  toast.error("Failed , try again ! ");
                }
              })
              .catch((err) => {
               console.log(err);
                toast.error(err.response.data.error);
              });

              
            }            

    return (

      
                           <>

{
      access_token ? 

     <div>

     <Toaster />

     <div className= 'bg-gray-200 px-4 py-2 flex h-16 max-w-md mx-auto   border-black mt-5 rounded-full items-center gap-10 hover:bg-gray-300'>
    <div className='px-4 py-2 ml-5 font-extrabold text-xl'>Step: 1</div>
    <div className='px-4 py-2 font-semibold text-xl'>Enter personal detail</div>
</div>

     <form  className="max-w-md mx-auto mt-10 p-4 border rounded" id='formElement'>

         <div>
         <div className="mb-4">
             <label className="block mb-2" htmlFor="name">Name</label>
             <input
                 type="text"
                 // id="name"
                 name="name"
                 placeholder='FullName'
                 value={names ||''}
                 onChange={(e) => setuserdata({...userdata, names: e.target.value})}
                 className="border rounded w-full px-3 py-2"
                 required
             />
         </div>
         <div className="mb-4">
             <label className="block mb-2" htmlFor="dataOfBerth">Date of Berth</label>
             <input
                 type="date"
                 // id="dataOfBerth"

                 name="dateOfBerth"
                 placeholder='Date Of Berth'
                 value= {dateofberth ||''}
                 onChange={(e) => setuserdata({...userdata, dateofberth: e.target.value})}
                 className="border rounded w-full px-3 py-2"
                 required
             />
         </div>
         <div className="mb-4">
             <label className="block mb-2">Gender</label>
             <select
                 name="gender"

                 value={genders  || ''}
                 onChange={(e) => setuserdata({...userdata, genders: e.target.value})}
                 className="border rounded w-full px-3 py-2"
                 required
             >
                 <option value="">Select Gender</option>
                 <option value="male">Male</option>
                 <option value="female">Female</option>
                 <option value="other">Other</option>
             </select>
         </div>
         <div className="mb-4">
             <label className="block mb-2" htmlFor="email">Email</label>
             <input
                 type="email"
                 // id="email"
                 name="email"
                 placeholder='E-Mail'
                 value={emails || ''}
                 onChange={(e) => setuserdata({...userdata, emails: e.target.value})}
                 className="border rounded w-full px-3 py-2 text-black"
                 required
             />
         </div>
         <div className="mb-4">
             <label className="block mb-2" htmlFor="address">Address</label>
             <textarea
                 // id="address"
                 name="address"
                 type="address"
                 placeholder='Enter your Address'
                 value={addresss  || ""}
                 onChange={(e) => setuserdata({...userdata, addresss: e.target.value})}
                 className="border rounded w-full px-3 py-2"
                 required
             ></textarea>
         </div>
     </div>
         
         <button type="submit" className="bg-black text-white rounded-full px-4 py-2 hover:opacity-80" onClick={handleSubmit}>Submit</button>
     </form>
  
   
 </div> : <Navigate to='/'/>
}
 
</>
       
       
    );
}

export default PersonalInfo;
