"use client";

import { AuthContextType, User } from "@/app/types";
import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
	children: ReactNode;
}
export default function AuthProvider({ children } : AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // 새로고침 시 localStorage의 토큰을 활용해 token 초기값 세팅
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // getUser에서 토큰이 있으면 userService.getMe(token)처럼 토큰을 헤더에 포함해야 함
  useEffect(() => {
    const getUser = async () => {
      if (!token) {
        // 토큰 없으면 바로 user null, 로딩 끝내기
        setUser(null);
        setIsLoading(false);
        return;
      }
      try {
        
        const user = await userService.getMe(token);
        console.log(token);
        setUser(user);
        
      } catch (error: any) {
        if (error.status === 401) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("accessToken");
        } else {
          console.error("사용자 정보를 가져오는데 실패했습니다:", error);
        }
      }
      setIsLoading(false)
    };
    getUser();
  }, [token]);

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    await authService.register(name, email, password);
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await authService.login(email, password);
      if (data.accessToken) {
        setToken(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        setUser(data.user); // 만약 user 정보도 포함되어 있다면
      } else {
        throw new Error("로그인 실패: 토큰이 없습니다.");
      }
    } catch (error) {
      console.error(error);
      // 로그인 실패 처리
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null); 
    localStorage.removeItem('accessToken'); // 토큰 삭제
    localStorage.removeItem("refreshToken");
    router.replace("/");
  };

  const updateUser = async (user : User) => {
    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });
    const updatedUser = await userService.updateMe(formData);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setUser, login, logout, updateUser, register, token }}>
      {children}
    </AuthContext.Provider>
  );
}
