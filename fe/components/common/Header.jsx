'use client';

import React from 'react'
import Menu from "../ui/Menu"
import Login from "../ui/Login"
import H1Title from './H1Title';

function Header() {
  console.log("💥 Header 렌더링 됨");
  return (
    
    <div className='border-1 border-[#dfdfdf] flex fixed bg-[#ffffff] h-17.5 top-0 right-0 left-0 z-50'>
      <div className={`
        max-w-screen-xl 
        min-w-screen-m 
        mx-auto 
        flex 
        fixed
        items-center 
        sm:px-4 
        h-17.5
        top-0 right-0 left-0
      `}>
        <H1Title />
        <Menu />
        <Login />
      </div>
    </div>
  )
}

export default Header