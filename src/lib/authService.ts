import { defaultFetch, cookieFetch } from "@/lib/fetchClient";

type TauthService = {
  login: (email: string, password: string) => Promise<any>;
  register: (name: string, email: string, password: string) => Promise<any>;
 
}

export const authService : TauthService = {
  login: (email, password) =>
    cookieFetch("/auth/signIn", undefined, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  // 회원가입
  register: (name, email, password) =>
    defaultFetch("/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }), 

};
