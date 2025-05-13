"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/provider/AuthProvider";
import Modal from "@/components/modal/Modal";

import rpi01 from "@/app/images/product/rpi01.png";
import ic_like_off from "@/app/images/Icon_like_off.png";

const sectionType = {
	best: {
		"grid-cols": "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ",
		"grid-rows": "sm:grid-rows-1",
		// "h" : "sm:h-108 lg:h-94"
	},
	recent: {
		"grid-cols": "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
		"grid-rows": "",
	},
};

function ItemBoxList({ products, section, num = "10" }) {
	const router = useRouter();
	const { user, token } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const handleProduct = (id) => {
		router.push(`/items/${id}`);
	};

	return (
		<div>
			<div
				className={`grid gap-4 max-w-7xl mt-4 mb-6 ${sectionType[section]["grid-cols"]} ${sectionType[section]["grid-rows"]}`}
			>
				{products.slice(0, num).map((product) => (
					<div
						key={product.id}
						onClick={
							user
								? () => handleProduct(product.id)
								: () => setIsOpen(true)
						}
						className="flex flex-col cursor-pointer"
					>
						<div>
							<Image
								src={product?.image ? product.image : rpi01}
								alt={
									product?.tags ? product.tags : "상품 이미지"
								}
								className="rounded-[20px] lg:rounded-2xl aspect-square object-cover w-full"
							/>
						</div>

						<div className="mt-2 color-secondary-800 text-sm">
							{product.name}
						</div>
						<div className="text-[color:var(--color-secondary-800)] font-[700] text-base">
							{Number(product.price).toLocaleString()}
						</div>
						<div className="flex justify-between items-center gap-1">
							<Image
								src={ic_like_off}
								alt="좋아요"
								className="w-3 h-3"
							/>
							<div className="flex-1 text-[color:var(--color-secondary-600)] text-sm">
								{product.favoriteCount}
							</div>
						</div>
					</div>
				))}
				{isOpen && (
					<Modal
						text={"권한이 없습니다"}
						btnLabel={"확인"}
						onClick={() => setIsOpen(false)}
					/>
				)}
			</div>
		</div>
	);
}

export default ItemBoxList;
