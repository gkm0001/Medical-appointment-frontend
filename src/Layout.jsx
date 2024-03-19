import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'

function Layout() {
  return (
    <div>
         <Navbar/>
         <Outlet/>
         
    </div>
  )
}

export default Layout
