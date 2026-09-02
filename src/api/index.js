import axios from "axios";

export const createApi = (baseURL) => {
  const apiInstance = axios.create({
    baseURL,
    withCredentials: true, // 👈 요청하신 대로 남겨두었습니다.
    headers: { "Content-Type": "application/json" },
  });

  return apiInstance;
};

// 공용 Axios 인스턴스 생성
export const portfolioApi = createApi(import.meta.env.VITE_MODE === "dev" ? import.meta.env.VITE_LOCAL_PORTFOLIO_API_URL : import.meta.env.VITE_PROD_API_URL);
