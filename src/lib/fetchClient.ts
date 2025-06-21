/**
 * 기본 fetch 클라이언트 - 인증이 필요 없는 일반 요청용
 */

export const defaultFetch = async (url : string, options: RequestInit = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    // Next.js 기본 캐싱 활성화
    cache: "force-cache",
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${url}`, mergedOptions);

  if (!response.ok) {
    const error: any = new Error(`API error: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
};

/**
 *  인증 fetch 클라이언트
 */
export const cookieFetch = async (url: string, token? : string, options: RequestInit = {}) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const defaultOptions: RequestInit = {
    headers,
    cache: "no-store",
  };

  const mergedOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  
  // 원래 요청 실행
  let response = await fetch(`${baseURL}${url}`, mergedOptions);

  // 401 에러 발생 시 토큰 갱신 시도
  if (response.status === 401 && url !== "/auth/refresh-token") {
      try {
        const refreshResponse = await fetch(`${baseURL}/auth/refresh-token`, {
          method: "POST",
          credentials: "include",
          cache: "no-store",
        });

        if (refreshResponse.ok) {
          // 예시: 새 토큰을 받아 localStorage에 저장
          const { token: newToken } = await refreshResponse.json();
          if (newToken) {
            localStorage.setItem("accessToken", newToken);
            headers["Authorization"] = `Bearer ${newToken}`;
            response = await fetch(`${baseURL}${url}`, {
              ...mergedOptions,
              headers,
            });
          }
        } else {
          const err: any = new Error("토큰 갱신 실패");
          err.status = 401;
          throw err;
        }
      } catch (error) {
        const err: any = new Error("토큰 갱신 실패");
        err.status = 401;
        throw err;
      }
    }

  if (!response.ok) {
    const error: any = new Error(`API error: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  // 응답 본문이 있는지 확인
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  // 본문이 없거나 JSON이 아닌 경우 응답 객체 자체 반환
  return { status: response.status, ok: response.ok };
};
