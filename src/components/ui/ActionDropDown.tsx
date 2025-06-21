"use client";

import React from 'react'
import ic_kebab  from '../../app/images/ic_kebab.png'
import Image from 'next/image';
import { useParams } from 'next/navigation';

function ActionDropDown() {
  const { id } = useParams();
  
  // const deleteArticle = () => {


  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles/${id}`, {
  //       method: "DELETE",
  //       headers: { 
  //           "Authorization": `Bearer ${token}`,
  //       },
  //   });
  // }
  return (
    <div className="relative">
      <button className='' onClick={() =>alert('클릭!')}>
        <Image src={ic_kebab} className="border-1 w-6 h-6 cursor-pointer" alt="수정삭제메뉴"/>
      </button>
      <div className="absolute right-0 top-6">
        <button className="border-1 border-[#D1D5DB] bg-white rounded-tr-sm rounded-tl-sm sm:w-25 h-11 md:w-34 cursor-pointer flex justify-center items-center">수정하기</button>
        <button  className="border-1 border-[#D1D5DB]  bg-white border-t-0 rounded-br-sm rounded-bl-sm sm:w-25 md:w-34 sm:h-11 cursor-pointer flex justify-center items-center">삭제하기</button>
      </div>
    </div>
  )
}

export default ActionDropDown