import React from 'react'

function PageLayout({children}) {
  return (
    <div  className={`
        max-w-screen-xl 
        min-w-screen-sm 
        mx-auto
        sm:p-4
        md:p-6
        flex-1
    `}>{children}</div>
  )
}

export default PageLayout