import "./App.css";
import "./ProductList.css";
import ErrorBoundary from "./ErrorBoundary";
import { ProductList } from "./ProductList";
import { Nav } from "./Nav";
import { useState } from "react";

function App() {
	//const [loading, setLoading] = useAsync(false);
	const [order, setOrder] = useState("createdAt");

	return (
		<div className="layout">
			<Nav />
			<div class="item box02">
				<div class="contents">
					<div class="top">
						<h3 className="best">베스트 상품</h3>
						<ProductList
							className="product-list"
							order="favorite"
							limit={4}
						/>
						<h3>최신 상품</h3>
						<div>
							<button onClick={() => setOrder("createdAt")}>
								최신순
							</button>
							<button onClick={() => setOrder("rating")}>
								인기순
							</button>
						</div>
						<ProductList
							className="product-list"
							order="recent"
							limit={10}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function AppWithErrorBoundary() {
	return (
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	);
}

export default AppWithErrorBoundary;
