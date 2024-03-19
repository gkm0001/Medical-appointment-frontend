import React, { useState, useEffect, useContext } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { Link, Navigate } from 'react-router-dom';
import { PersonalInfoDetails } from './Context/PersonalInfo/PersonalInfoDetails';
import { UserContext } from './Context/AuthContext';
import axios from 'axios';
import { userDataContext } from './Context/UserData';

function Dashboard() {

  
  let {userdata , userdata: { score , global_email ,email, Diseases , ages, names , genders , passwords} , setuserdata} = useContext(PersonalInfoDetails);
  let { userAuth : {access_token , loginStatus} ,setUserAuth} = useContext(UserContext);
  let {alluserdata , setalluserdata} = useContext(userDataContext);
  const [fetchData, setFetchData]= useState({});  

  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },

    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {

    // console.log(email);
    console.log(global_email);


    console.log(passwords);

    if(global_email === 'gkm12345@gmail.com' && passwords === 'Mishra@12345') {
       axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/get-details-admin' ) 
       .then(({data})=> {
        data= data.users.filter((a)=>(a.medical_history[0]))
        data= data.sort((a, b)=>(a.medical_history[0].scores - b.medical_history[0].scores))
      console.log("sorted", data)
      setalluserdata(data);
      console.log(alluserdata);
     })
    //  .finally((data)=>{
    //   // setFetchData(data);
    //   // data= data.filter((a)=>(a.medical_history[0]))
    //   // data= data.sort((a, b)=>(a.medical_history[0].scores- b.medical_history[0].scores))
    //   // console.log("sorted", data)

    //  })
       .catch(err => {
         console.log({err});
       })
    }
    else {
      axios.get(import.meta.env.VITE_SERVER_DOMAIN + '/get-details' , {
        headers: {
          Authorization: `Bearer ${access_token}` // Send the access token as a bearer token
        }
      }) 

      .then(({data})=> {

         console.log({data});
        
         console.log(data.user.medical_history[0].Disease);

        const userData = data.user;

        console.log(userData);
        
        setuserdata({
          ...userdata,
          Diseases: userData.medical_history[0].Disease,
          names: userData.UsersDetails[0].name,
          ages: userData.UsersDetails[0].age,
          genders: userData.UsersDetails[0].gender,
          Current_medical_Conditions: userData.medical_history[0].Medical_Condition
        });

      })
      .catch(err => {
         console.log({err});
      })
    }

   
  }

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 2000);
    return () => clearInterval(intervalId);
  }, [currentIndex]); // This useEffect hook will run whenever currentIndex changes

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // if(fetchData){
  //        let data= fetchData?.filter((a)=>(a.medical_history[0]))
  //     data= fetchData?.sort((a, b)=>(a.medical_history[0].scores- b.medical_history[0].scores))
  //     console.log("sorted", data)

  // }




    // Redirect to homepage when access_token becomes null
    // useEffect(() => {
    //   if (!access_token) {
    //     // Redirect to homepage
    //     return <Navigate to="/" />;
    //   }
    // }, [sessionStorage.clear()]);

   

  return (
    <>
         {
           access_token ? (
            <div>
            <div className='max-w-[1400px] h-[50%] w-full m-auto group absolute top-0'>
              <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
              ></div>
              {/* Left Arrow */}
              <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactLeft onClick={prevSlide} size={30} />
              </div>
              {/* Right Arrow */}
              <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                <BsChevronCompactRight onClick={nextSlide} size={30} />
              </div>
              <div className='flex top-4 justify-center py-2'>
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className='text-2xl cursor-pointer'
                  >
                    <RxDotFilled />
                  </div>
                ))}
              </div>
            </div>
      
            <div className='absolute top-2/3  font-bold   leading-tight flex justify-around w-full'>
              <div className='text-5xl'>
                <div>Welcome to Treat</div>
                <div className='ml-[7%] text-gray-600'>Here you find</div>
                <div>Right clinical trial </div>
                <div className='ml-[7%] text-gray-600'>For Individual</div>
              </div>
      
              <div>
                  {
                    score ||((loginStatus == "true"))  ? (
                      <Link to="/checkstatus">
                      <button onClick={handleClick} className='text-black bg-gray-400 rounded-full px-8 py-4 translate-y-16 font-bold'>
                        Check Status
                      </button>
                    </Link>
                     ):(
                      <Link to="/personalInfo">
                      <button className='text-black bg-gray-400 rounded-full px-8 py-4 translate-y-16 font-bold'>
                        Get Started
                      </button>
                    </Link>
                     )
                  }
           
              </div>
            </div>
                 </div>
           ):( 
              <Navigate to="/"/>
           )
         }
   
    </>
 
  );
}

export default Dashboard;
