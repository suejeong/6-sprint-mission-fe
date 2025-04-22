'use client';

import React from 'react'
import Link from 'next/link'
import logo_big from '../../app/images/logo_h1.png'
import logo_small from '../../app/images/logo.png'
import Image from 'next/image'

const  bigLogo = { 
    src : logo_big,
    imageClass: " sm:w-13 sm:h-13 md:w-[106px] md:h-[106px]",
    textClass: "sm:text-[2rem] md:text-[4.125rem]"
}

const titleType = {
    header : {
        src : logo_small,
        imageClass: "hidden md:block md:w-10 md:h-10 ",
        textClass: "sm:text-lg md:text-xl lg:text-2xl"
    },
    login : bigLogo,
    signup: bigLogo,
}

function H1Title({logoType = "header"}) {
    return (
        <div>
        <Link href="/" className=" flex justify-between items-center gap-2">
            <Image src={titleType[logoType].src} className={titleType[logoType].imageClass}  alt="판다마켓 로고"/>
            <h1 className={`${titleType[logoType].textClass} 
            text-blue-500 
            font-bold
            flex-1
        `}>판다마켓</h1>
        </Link>
    </div>
    )
}

export default H1Title