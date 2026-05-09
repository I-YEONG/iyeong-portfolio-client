import axios from "axios";

const attachRefreshInterceptor = (apiInstance) => {
  apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // 실패한 api 정보 저장
      const originalRequest = error.config;

      // 만료된 토큰 이면서 재시도를 안했으면 > 재시도 + 꼬리표 달기
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // 재발급 요청
          await axios.post(
            `${import.meta.env.VITE_LOCAL_COMMON_API_URL}/api/common/login/refresh`,
            {},
            {
              withCredentials: true,
            },
          );

          // 성공
          return apiInstance(originalRequest);
        } catch (reissueError) {
          return Promise.reject(reissueError);
        }
      }

      // 다른 에러는 그대로 반환
      return Promise.reject(error);
    },
  );
};

export const createApi = (baseURL) => {
  const apiInstance = axios.create({
    baseURL,
    withCredentials: true, // 쿠키 자동 포함
    headers: { "Content-Type": "application/json" },
  });

  attachRefreshInterceptor(apiInstance);
  return apiInstance;
};

// 공용 Axios 인스턴스 생성
export const portfolioApi = createApi(import.meta.env.VITE_MODE === "dev" ? import.meta.env.VITE_LOCAL_PORTFOLIO_API_URL : import.meta.env.VITE_PROD_API_URL);
