
import { clearServerSideTokens } from "../actions/auth";

export const authServide = {
    // 로그아웃
    logout: () => {
        if (typeof window !== "undefined") {
            return clearServerSideTokens();
        }

        document.cookie = "accessToken=; path=/; max-age=0; SameSite=Strict";
        document.cookie = "refreshToken=; path=/; max-age=0; SameSite=Strict";

        return { success: true };
    },
}