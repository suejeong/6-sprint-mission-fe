import React, { useState } from "react";
import "./Nav.css";
import logo from "./img/logo.png";

export const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="item box01">
			<div className="contents header_style">
				<div className="left">
					<a href="index.html">
						<img src={logo} />
					</a>
					<a href="index.html">
						<h1>판다마켓</h1>
					</a>
					<ul>
						<li>자유게시판</li>
						<li>중고마켓</li>
					</ul>
				</div>
				<a href=" login/">
					<span className="right">로그인</span>
				</a>
			</div>
		</div>
	);
};
