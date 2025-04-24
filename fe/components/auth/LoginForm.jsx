'use client'

import React, { useState, useEffect } from 'react'
import SocialLogin from './SocialLogin'
import AuthInput from '../ui/auth/AuthInput'
import BtnPrimary from '../common/BtnPrimary'
import AreYouAlreadyAMember from '../common/AreYouAlreadyAMember'

export default  function LoginForm() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const btnPrimaryValid = email.includes("@") && password.length > 0;
   
    let isEmailValid = "";
    let isPasswordValid = "";
    if(email.length > 0 && !email.includes("@")) {
         isEmailValid = "wrongType";
    }

  return (
    <div className="w-full mt-8 md:mt-14 px-4 ">
        <form className="flex flex-col gap-6">
            <AuthInput 
                type="text" 
                title="이메일" 
                placeholder ="이메일을 입력해 주세요" 
                value={email} 
                onChange = {(e) => setEmail(e.target.value)}
                errorType={isEmailValid}
            />
            <AuthInput 
                type="password" 
                title="비밀번호" 
                placeholder ="비밀번호를 입력해 주세요" 
                value={password} 
                onChange = {(e) => setPassword(e.target.value)}
                errorType={isPasswordValid}
            />
            <BtnPrimary disabled={!btnPrimaryValid}>로그인</BtnPrimary>
        </form>
        <SocialLogin />
        <AreYouAlreadyAMember pageType="login" />
    </div>
  )
}
