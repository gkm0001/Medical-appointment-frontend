import React, { useState } from 'react'

function InputBox({id, Name ,icon ,  placeholder,type}) {

    const [visible , setvisible ] = useState(false);


  return (
    <div className='relative w-[100%] '>
            <input
            name = {Name}
            icon = {icon}
            placeholder = {placeholder}
            type = {type == 'password' ? !visible ? 'password' : 'text' : type}
            id={id}
            className='w-[100%] border border-gray-200 focus:bg-transparent placeholder:text-black mb-5 p-4 pl-12 pr-10 md:pl-12'
            >

            </input>

            <i className={"fi " + icon + " absolute left-4 top-1/2 -translate-y-5"}></i>

            {    type == "password" ? !visible ? 
                  <i className="fi fi-rr-eye-crossed absolute -translate-x-8 top-4" 
                  onClick={()=>setvisible(!visible)}></i>
                  : <i className="fi fi-rs-eye absolute -translate-x-8 top-4" onClick={()=>setvisible(!visible)}></i> : ""
            }

            
           
            


            
        
             
    </div>
  )
}

export default InputBox
