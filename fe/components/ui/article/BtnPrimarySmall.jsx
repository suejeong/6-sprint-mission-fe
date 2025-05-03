'use client'
import React from 'react'


function BtnPrimarySmall({ children, onClick} ) {
  return (
    <button onClick={onClick} className="bg-sky-500 px-4 py-2 rounded-[4px] text-white font-[600] cursor-pointer">{children}</button>
  )
}

export default BtnPrimarySmall