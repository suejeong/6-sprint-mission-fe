'use client';
import React from 'react'
import H1Title from '../../../components/common/H1Title';
import Form from '../../../components/auth/Form'

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center w-86 sm:w-85 md:w-160 border-1">
            <H1Title logoType={"login"} />
            <Form />
        </div>
    )
}
