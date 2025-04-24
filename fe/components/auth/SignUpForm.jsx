'use client'

import React, { useState } from 'react'
import SocialLogin from './SocialLogin'
import AuthInput from '../ui/auth/AuthInput'
import BtnPrimary from '../common/BtnPrimary'
import AreYouAlreadyAMember from '../common/AreYouAlreadyAMember'
import { useRouter } from 'next/navigation'

function SignUpForm() {
    const [ email, setEmail ] = useState("");
    const [ nickname, setNickname ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const signupValid = email.includes("@") && nickname.length > 0 && ( password === confirmPassword && password.length > 0 );
    
    let isEmailValid = "";
    let isConfirmPasswordValid = "";
    if(email.length > 0 && !email.includes("@")) {
        isEmailValid = "wrongType";
    }
    
    if(!password || !confirmPassword) {
        isConfirmPasswordValid = null;
    }
    if (!(password === confirmPassword)) {
        isConfirmPasswordValid = "wrongType";
    } 
    
    const router = useRouter();
    const [ isSummiting, setIsSummiting ] = useState(false);
    const handleSignup = async () => {
        if(isSummiting) return;
        setIsSummiting(true);
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify({ email, password}),
            })

            if (!res.ok) {
                const { message } = await res.json();
                alert(message || "회원가입 실패");
            }else {
                alert("회원가입 성공!");
                router.push("/login");
            }
        } catch (error) {
            alert("서버 오류")
        }finally {
            setIsSummiting(false);
        }
    }


  return (
    <div  className="w-full mt-8 md:mt-14 px-4 ">
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
                type="text" 
                title="닉네임" 
                placeholder ="닉네임을 입력해 주세요" 
                value={nickname} 
                onChange = {(e) => setNickname(e.target.value)}
            />
            <AuthInput 
                type="password" 
                title="비밀번호" 
                placeholder ="비밀번호를 입력해 주세요" 
                value={password} 
                onChange = {(e) => setPassword(e.target.value)}
            />
            <AuthInput 
                type="password" 
                title="비밀번호 확인" 
                placeholder ="비밀번호를 다시 한 번 입력해 주세요" 
                value={confirmPassword} 
                onChange = {(e) => setConfirmPassword(e.target.value)}
                errorType={isConfirmPasswordValid}
            />
            <BtnPrimary disabled={!signupValid} onClick ={handleSignup}>회원가입</BtnPrimary>
        </form>
        <SocialLogin />
        <AreYouAlreadyAMember pageType="signup"/>
    </div>
  )
}

export default SignUpForm