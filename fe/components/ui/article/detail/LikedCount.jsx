"use client";

import Image from "next/image";
import React from "react";
import like_off from "@/app/images/Icon_like_off.png";

function LikedCount({ children }) {
	return (
		<div className="flex justify-between items-center h-9 border border-[#E5E7EB] rounded-full gap-1 px-3">
			<Image src={like_off} alt="좋아요 수" width={20} />
			{children}
		</div>
	);
}

export default LikedCount;
