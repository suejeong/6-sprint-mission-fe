import React from 'react'
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer"

export default function ArticleLayout({ children }) {
    return (
        <div className="sm:mt-17.5 flex flex-col ">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
