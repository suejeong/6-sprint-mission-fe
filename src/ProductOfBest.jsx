import React, { useState, useEffect } from "react";
import { getProducts } from "./api";

export const ProductOfBest = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState("best");

	const productLoad = async (options) => {
		setLoading(true);
		try {
			const result = await getProducts(options);
			setProducts(result.list || []);
		} catch (e) {
			console.error("Error loading products", e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		productLoad({ order: "best", offset: 0, limit });
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<div>
			<div>베스트 상품</div>
			{products && products.length > 0 ? ( // 제품이 있을 때 리스트 렌더링
				<ul>
					{products.map((product) => (
						<React.Fragment key={product.id}>
							<li key={product.id}>
								{/* 이미지를 안전하게 출력 */}
								<img
									src={
										product.images &&
										product.images.length > 0
											? product.images[0]
											: "default-image.jpg"
									}
									alt={product.name}
								/>
								<div>{product.name}</div>
								<div>{product.price}</div>
								<div>{product.favoriteCount}</div>
							</li>
						</React.Fragment>
					))}
				</ul>
			) : (
				<p>No products available</p> // 제품이 없을 때 메시지 표시
			)}
			<div>End </div>
		</div>
	);
};
