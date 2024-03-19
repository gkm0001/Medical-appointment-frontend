import React, { useContext } from 'react'
import { PersonalInfoDetails } from '../Components/Context/PersonalInfo/PersonalInfoDetails'
import toast, { ToastIcon, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../Components/Context/AuthContext';
import Algo from '../Components/PriorityAlgo/Algo.jsx';
 





function MedicalDetails() {
 
    let { userdata , userdata : { Diseases ,Allergies , symptoms , global_email , Previous_Surgeries,Current_medical_Conditions,score , dateofberth} , setuserdata} = useContext(PersonalInfoDetails);



    function calculatePriorityScore(userdata) {
        let priority_score = 0;
    
        // Age score
        priority_score += userdata.ages >= 18 && userdata.ages <= 50 ? 10 : 8;
    
        // Disease score
        priority_score += userdata.Diseases === 'Heath_related' || userdata.Diseases === 'Cancer' ? 10 : 8;
    
        // Allergies score
        priority_score += userdata.Allergies === 'YES' ? 10 : 0;
    
        // Current medical conditions score
        switch (userdata.Current_medical_Conditions) {
            case 'Mild':
                priority_score += 5;
                break;
            case 'Moderate':
                priority_score += 8;
                break;
            default:
                priority_score += 20;
        }
    
        // Previous surgeries score
        priority_score += userdata.Previous_Surgeries !== 'No' ? 10 : 5;
    
        // Symptoms score
        priority_score += userdata.symptoms !== 'No' ? 3 : 10;
        console.log(priority_score);
        setuserdata({ ...userdata, score: priority_score });
        return priority_score
        
    }
    

    const navigate = useNavigate();

    // const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    let { userAuth : { access_token}} =  useContext(UserContext);

    const back = () => {
        navigate('/personalInfo'); // Use navigate function to navigate programmatically
    };

    const handleSubmit = async(e) => {
         e.preventDefault();

         let form = new FormData(formElement);

         let formdata = {};

         for(let[key,value] of form.entries()) {
             formdata[key] = value;
         }

          let {Disease,Allergy,surgury,medical_condition} = formdata;

          if(!Disease) {
              return toast.error("Select the disease");
          }
          if(!Allergy) {
             return toast.error('Select the allergy history')
          }
          if(!surgury) {
             return toast.error('Please select surgury option');
          }
          if(!medical_condition) {
             return toast.error('Please select medical condition');
          }

        
           let data = {
            Diseases ,Allergies ,  Previous_Surgeries,Current_medical_Conditions
           }
           const new_score= calculatePriorityScore(data);

           let newData = {
            Diseases ,Allergies , score: new_score ,  Previous_Surgeries,Current_medical_Conditions ,   userEmail : global_email 
           }

           axios.post(import.meta.env.VITE_SERVER_DOMAIN + '/details2',newData )
           .then( (data)=> {

               toast.success("Store successfull"); 
               console.log(data);

               
 
                setTimeout(()=> {
                    navigate("/dashboard") 
                },1000)

                
           })
           .catch( err => {
             return toast.error(err.message)
           })
      }

  return (

        <>
 
        {
             access_token ? 

            <div>
      
            <Toaster />


            <div className= 'bg-gray-200 px-4 py-2 flex h-16 max-w-md mx-auto   border-black mt-5 rounded-full items-center gap-10 hover:bg-gray-300'>
                    <div className='px-4 py-2 ml-5 font-extrabold text-xl'>Step: 2</div>
                    <div className='px-4 py-2 font-semibold text-xl'>Enter Medical Details</div>
            </div>
  
            
  
           <form  id='formElement' className='max-w-md mx-auto mt-10 p-4 border rounded'>
  
              
  
                  <div className='mb-4'>
                      <label className='block mb-2'>Select the disease</label>
                          <select  
                                    name='Disease' 
                                    className='border rounded w-full px-3 py-2' 
                                    select={Diseases || ''}
                                    onChange={(e)=> setuserdata({...userdata , Diseases : e.target.value})}
                                    required>

                                  <option value="">Select Disease</option>
                                  <option value="Heath_related">Heart disease</option>
                                  <option value="Diabetes">Diabetes</option>
                                  <option value="cancer">Cancer</option>
                                  <option value="Asthma">Asthma</option>
                                  <option value="Arthritis">Arthritis</option>
                                  <option value="Thyroid disorders">Thyroid disorders</option>
                                  <option value="other">Other</option>
                                 
                          </select>
                  </div>

                  <div className='mb-4'>
                      <label className='block mb-2'>Current Symptoms</label>
                          <select  
                                    name='Disease' 
                                    className='border rounded w-full px-3 py-2' 
                                    select={symptoms || ''}
                                    onChange={(e)=> setuserdata({...userdata , symptoms: e.target.value})}
                                    required>

                                  <option value="">Select Symptoms</option>
                                  <option value="No">No Symptoms</option>
                                  <option value="Heath related">Fever</option>
                                  <option value="Diabetes">Cough</option>
                                  <option value="cancer">Shortness of breathr</option>
                                  <option value="Headache">Headache</option> 
                                  <option value="other">Other</option>
                                   
                          </select>
                  </div>
  
                  <div className='mb-4'>
                      <label  className='block mb-2'>Allergies </label>
                          <select  
                                className='border rounded w-full px-3 py-2' 
                                name='Allergy' 
                                value={Allergies || ''}
                                onChange={(e)=> setuserdata({...userdata ,Allergies : e.target.value})}
                                required >

                              <option value="">Select </option>
                              <option value="YES">YES</option>
                              <option value="NO">NO</option>
                          </select>
                  </div>
  
                  <div className='mb-4'>

                      <label htmlFor="">Previous Surgeries</label>
                      <select  
                                className='border rounded w-full px-3 py-2' 
                                name='surgury' 
                                value={Previous_Surgeries || ''} 
                                onChange={(e)=> setuserdata({...userdata , Previous_Surgeries : e.target.value})}
                                required>
                          <option value="">Select</option>
                          <option value="No">No </option>
                          <option value="Appendectomy">Appendectomy</option>
                          <option value="Knee_surgery">Knee surgery</option>
                          <option value="Cataract_surgery">Cataract surgery</option>
                          <option value="Gallbladder_removal">Gallbladder removal</option>
                          <option value="Hysterectomy">Hysterectomy</option>
                          <option value="Other">Other</option>
                      </select>
                  </div>

                     
                        <div className='mb-4'>
                        <label >Previous medical history</label>
                        <div>
                            <input
                                type="radio"
                                id="previousMedicalHistoryYes"
                                name="previousMedicalHistory"
                                value="yes"
                                className="mr-2"
                            />
                            <label htmlFor="previousMedicalHistoryYes" className="mr-4">Yes</label>
                            
                            <input
                                type="radio"
                                id="previousMedicalHistoryNo"
                                name="previousMedicalHistory"
                                value="no"
                                className="mr-2"
                            />
                            <label htmlFor="previousMedicalHistoryNo">No</label>
                        </div>
                        
                    </div>
 
  
                  <div className='mb-4'>

                      <label htmlFor="">Severity of Symptoms</label>
                      <select 
                                className='border rounded w-full px-3 py-2' 
                                name='medical_condition' 
                                value={Current_medical_Conditions || '' } 
                                onChange={(e)=> setuserdata({...userdata , Current_medical_Conditions : e.target.value})}
                                required>
                          <option value="">Select</option>
                          <option value="Mild">Mild</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Severe">Severe</option>
                          </select>
  
                  </div>

                  <div className='flex justify-between'> 

                        <button type='submit' className='bg-black text-white rounded-full px-4 py-2 hover:opacity-80 mt-3' onClick={back}>
                            Back
                        </button>
        
                        <button type="submit" className="bg-black text-white rounded-full px-4 py-2 hover:opacity-80 mt-3" onClick={handleSubmit}>Submit</button>

                  </div>
       
           </form>
            </div> : <Navigate to="/"/>
        }
          
        </>

   
  )
}

export default MedicalDetails
