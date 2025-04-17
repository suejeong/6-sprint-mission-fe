import React from 'react'
import ActionDropDown from './ActionDropDown'

function ReplyList() {
  return (
    <div className="border-b border-[#E5E7EB] pb-1">
      <div className="flex justify-between sm:gap-1">
        <div>혹시 사용기간이 어떻게 되실까요?</div>
        <ActionDropDown />
      </div>
      <div className="flex justify-start gap-2 items-center mt-6">
        <p className="w-8 h-8 border-1"></p>
        <div>
          <div className="text-sm">닉네임</div>
          <div className="text-sm">1시간 전</div>
        </div>
      </div>
    </div>
  )
}

export default ReplyList