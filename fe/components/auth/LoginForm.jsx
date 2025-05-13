"use client";

import React, { useState, useEffect } from "react";
import SocialLogin from "./SocialLogin";
import AuthInput from "@/components/ui/auth/AuthInput";
import BtnPrimary from "@/components/common/BtnPrimaryBig";
import AreYouAlreadyAMember from "@/components/common/AreYouAlreadyAMember";
import { useRouter } from "next/navigation";
import Modal from "@/components/modal/Modal";
import { loginAction } from "@/lib/actions/auth";
import { useAuth } from "@/provider/AuthProvider";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSummiting, setIsSummiting] = useState(false);
	const btnPrimaryValid = email.includes("@") && password.length > 0;
	const [isEmailValid, setIsEmailValid] = useState("");
	const [isPasswordValid, setIsPasswordValid] = useState("");
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [btnLabel, setBtnLabel] = useState("");
	const [comment, setComment] = useState("");
	const { setUser } = useAuth();
	//const [error, setError] = useState(null);

	const openModal = (type, errorMessage) => {
		setIsOpen(true);
		setBtnLabel("확인");
		if (type === "success") {
			setComment("로그인 성공");
		}
		if (errorMessage) {
			setComment(errorMessage);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		if (isSummiting) return;
		setIsSummiting(true);

		try {
			const data = await loginAction({ email, password });
			localStorage.setItem("accessToken", data.accessToken);
			localStorage.setItem("refreshToken", data.refreshToken);
			setUser(data.user);
			openModal("success");
		} catch (error) {
			const errorData = await res.json();
			console.error("🔥 서버 오류 상세:", error);
			openModal(
				"",
				errorData.message || errorData.error || "회원가입 실패"
			);
		} finally {
			setIsSummiting(false);
		}
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		if (comment === "로그인 성공") {
			router.push("/items");
		}
	};

	return (
		<div className="w-full mt-8 md:mt-14 px-4 ">
			<form className="flex flex-col gap-6" onSubmit={handleLogin}>
				<AuthInput
					type="text"
					title="이메일"
					placeholder="이메일을 입력해 주세요"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					errorType={isEmailValid}
				/>
				<AuthInput
					type="password"
					title="비밀번호"
					placeholder="비밀번호를 입력해 주세요"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					errorType={isPasswordValid}
				/>
				<BtnPrimary
					type="submit"
					text="text-xl"
					disabled={!btnPrimaryValid}
				>
					{isSummiting ? "로그인 중..." : " 로그인"}
				</BtnPrimary>
			</form>
			<SocialLogin />
			<AreYouAlreadyAMember pageType="login" />

			{isOpen && (
				<Modal
					text={comment}
					btnLabel={btnLabel}
					onClick={handleCloseModal}
				/>
			)}
		</div>
	);
}
