'use client';

import React from 'react'

export default function FormLayout({ children }) {
    return (
        <main className="flex flex-col justify-start">{children}</main>
    );
}