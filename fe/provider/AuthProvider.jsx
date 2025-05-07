"use client";

import { loginAction } from "../lib/actions/auth";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../lib/service/authService.js";

const AuthContext = createContext({
	login: () => {},
	logout: () => {},
	user: null,
	updateUser: () => {},
	register: () => {},
});

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export default function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const getUser = async () => {
		try {
			const userData = await userService.getMe();
			setUser(userData);
		} catch (error) {
			console.error("사용자 정보를 가져오는데 실패했습니다:", error);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (
		nickname,
		email,
		password,
		passwordConfirmation
	) => {
		// 회원가입 성공 시 유저데이터를 API에서 응답해주는 경우, 즉시 로그인 처리 가능
		const userData = await authService.register(
			nickname,
			email,
			password,
			passwordConfirmation
		);

		// 토큰 저장 로직 추가
		if (userData.accessToken && userData.refreshToken) {
			setTokensToCookie(userData.accessToken, userData.refreshToken);
		}
		setUser(userData.user);
	};

	const login = async (email, password) => {
		const userData = await loginAction(email, password);

		console.log("userData in login", userData);
		if (userData.accessToken && userData.refreshToken) {
			setTokensToCookie(userData.accessToken, userData.refreshToken);
		}
		setUser(userData.user);
	};

	const logout = async () => {
		try {
			await authService.logout();
			document.cookie =
				"accessToken=; path=/; max-age=0; SameSite=Strict";
			document.cookie =
				"refreshToken=; path=/; max-age=0; SameSite=Strict";
			setUser(null);
		} catch (error) {
			console.error("로그아웃 실패:", error);
		}
	};

	useEffect(() => {
		async function fetchUser() {
			const token = localStorage.getItem("accessToken");
			if (!token) return;

			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
					{
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (!res.ok) {
					throw new Error("사용자 정보 요청 실패");
				}
				const data = await res.json();
				setUser(data);
			} catch (error) {
				console.error("사용자 정보 불러오기 실패", error);
				setUser(null);
			}
		}
		fetchUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{ user, login, logout, register, isLoading, setUser }}
		>
			{children}
		</AuthContext.Provider>
	);
}
