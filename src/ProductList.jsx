import React, { useState, useEffect } from "react";
import { getProducts } from "./api";
import "./ProductList.css";

export const ProductList = ({ order, limit }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadProducts = async () => {
			setLoading(true);
			try {
				console.log("API 요청 인자:", {
					orderBy: order,
					page: 1,
					pageSize: Number(limit),
				});
				const result = await getProducts({
					orderBy: order,
					page: 1,
					pageSize: Number(limit),
				});
				setProducts(result.list || []);
			} catch (e) {
				console.error("Error loading products", e);
			} finally {
				setLoading(false);
			}
		};
		loadProducts();
	}, [order, limit]);

	if (loading) {
		return <p>Loading...</p>;
	}
	return (
		<div
			className={`product-list ${
				order === "favorite" ? "favorite-style" : "recent-style"
			}`}
		>
			{products && products.length > 0 ? ( // 제품이 있을 때 리스트 렌더링
				<ul>
					{products.map((product) => (
						<React.Fragment key={product.id}>
							<li key={product.id}>
								{/* 이미지를 안전하게 출력 */}
								<img
									className="product-img"
									src={
										product.images &&
										product.images.length > 0
											? product.images[0]
											: "default-image.jpg"
									}
									alt={product.name}
								/>
								<div className="product-name">
									{product.name}
								</div>
								<div className="product-price">
									{product.price}
								</div>
								<div className="product-favorite-count">
									{product.favoriteCount}
								</div>
							</li>
						</React.Fragment>
					))}
				</ul>
			) : (
				<p>No products available</p> // 제품이 없을 때 메시지 표시
			)}
		</div>
	);
};
