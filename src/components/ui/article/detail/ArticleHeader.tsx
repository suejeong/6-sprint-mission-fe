import React from 'react'
import Writer from './Writer'
import ActionDropDown from '@/components/ui/ActionDropDown'
import LikedCount from '@/components/ui/article/detail/LikedCount'
import { useAuth } from '@/provider/AuthProvider';

interface ArticleHeaderProps {
  title: string;
  nickname: string;
}
function ArticleHeader({ title, nickname } : ArticleHeaderProps) : React.JSX.Element {
  const { user } = useAuth();

  const isAuthor = user?.nickname === nickname;
  return (
    <div className="border-b-1 border-[#E5E7EB]">
        <div className="flex justify-between gap-5 mb-4">
          <div className="flex-1 text-xl font-[700]">{title}</div>
          {
            isAuthor ? <ActionDropDown /> : ""
          }
        </div>
        <div className="flex justify-start gap-6 mb-4">
          <Writer />
          <LikedCount />
        </div>
    </div>
  )
}

export default ArticleHeader