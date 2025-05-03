'use client'

import React, { useEffect, useState } from 'react'

const errorComment = {
  email : {
    wrongType : "올바른 이메일 형식이 아닙니다", 
    notAMember : "존재하지 않는 이메일입니다",
    null : ""
  },
  password : {
    wrongType: "비밀번호가 일치하지 않습니다",
    length: "비밀번호는 8자 이상이어야 합니다",
    null : ""
  },
}



export default function AuthInput({ type, title, placeholder, value, onChange, errorType}) {

  const errorCommentKey = title === "이메일" ? "email"
                                      : title === "비밀번호 확인" ? "password"
                                      : title === "비밀번호" ? "password" 
                                      : title === "";

  const errorMessage = errorComment[errorCommentKey]?.[errorType];

  return (
    <div className="flex flex-col gap-4">
        <div className="text-lg font-[700]">{title}</div>
        <input
          type={type} 
          className="w-full bg-gray-100 py-4 px-6 rounded-md" 
          placeholder={placeholder}
          onChange ={onChange} 
          value={value} 
        ></input>
        {errorMessage && (
        <div className="text-sm font-bold text-red-600 px-4">{errorMessage}</div> )
        }
    </div>
  )
}
