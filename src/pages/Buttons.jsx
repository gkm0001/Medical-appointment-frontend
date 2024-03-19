import React from 'react'

function Buttons({text,name,className,type }) {
  return (
    <div >
         <button className={`${ className} h-12 w-28 hover:bg-opacity-80 rounded-full`}  type={type} >
           {text}
         </button>
    </div>
  )
}

export default Buttons
