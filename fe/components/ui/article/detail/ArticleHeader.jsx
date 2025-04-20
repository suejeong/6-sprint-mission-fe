import React from 'react'
import ArticleWriter from './ArticleWriter'
import ActionDropDown from './ActionDropDown'
import LikedCount from './LikedCount'

function ArticleHeader({ title }) {
  return (
    <div className="border-b-1 border-[#E5E7EB]">
        <div className="flex justify-between gap-5 mb-4">
          <div className="flex-1 text-xl font-[700]">{title}</div>
          <ActionDropDown />
        </div>
        <div className="flex justify-start gap-6 mb-4">
          <ArticleWriter />
          <LikedCount />
        </div>
    </div>
  )
}

export default ArticleHeader