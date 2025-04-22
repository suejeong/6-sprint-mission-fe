'use client'

import React from 'react'

function Form() {
  return (
    <form className="w-full mt-10">
        <div>
            <div>아이디</div>
            <input type="text" className=" " placeholder="아이디를 입력해 주세요"></input>
        </div>
        <div>
            <div>닉네임</div>
            <input type="text" className=" " placeholder="아이디를 입력해 주세요"></input>
        </div>
        <div>
            <div>비밀번호</div>
            <input type="text" className=" " placeholder="아이디를 입력해 주세요"></input>
        </div>
        <div>
            <div>비밀번호</div>
            <input type="text" className=" " placeholder="아이디를 입력해 주세요"></input>
        </div>
        <button type="submit" className="btn-base w-full rounded-xl" >로그인</button>
    </form>
  )
}

export default Form