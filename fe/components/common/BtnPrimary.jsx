import React from 'react'

function BtnPrimary({ children, disabled = false  }) {
  return (
    <button type="submit" disabled={disabled} className= {`py-4 rounded-full text-white font-[600] text-xl ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-500  cursor-pointer' }`}>{ children }</button>
  )
}

export default BtnPrimary