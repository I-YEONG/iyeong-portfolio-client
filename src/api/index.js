import axios from "axios";

// 공용 Axios 인스턴스 생성

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 쿠키 자동 포함 전공
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    //실패한 api 정보 저장
    const originalRequest = error.config;

    //만료된 토큰 이면서 재시도를 안했으면 > 재시도 + 꼬리표 달기
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 재발급 요청
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/all/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        // 성공
        return api(originalRequest);
      } catch (reissueError) {
        // 리프레시 토큰도 만료된 경우 > 로그인 페이지로 이동
        window.location.href = "/login";
        return Promise.reject(reissueError);
      }
    }

    // 다른 에러는 그대로 반환
    return Promise.reject(error);
  },
);
