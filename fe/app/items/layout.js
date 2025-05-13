import React from 'react'
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer"

export default function MarketLayout({ children }) {
    return (
        <div className="sm:mt-17.5 flex flex-col h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
