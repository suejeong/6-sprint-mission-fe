import React from 'react'
import Menu from "../ui/Menu"
import Login from "../ui/Login"

function Header() {
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
        <h1 className={`
          sm:text-xl 
          md:text-2xl
          lg:text-2xl
          text-blue-500 
          font-bold
        `}>판다마켓</h1>
        <Menu />
        <Login />
      </div>
    </div>
  )
}

export default Header