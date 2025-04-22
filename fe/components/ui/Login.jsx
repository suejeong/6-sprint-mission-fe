import Link from 'next/link'
import React from 'react'


function Login() {
  return (
    <Link href="/login"><button className="bg-sky-500 hover:bg-sky-700 px-4 py-2 rounded-[4px] text-white font-[600]">로그인</button></Link>
  )
}

export default Login