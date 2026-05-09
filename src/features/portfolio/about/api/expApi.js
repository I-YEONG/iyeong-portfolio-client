import { portfolioApi } from "@/api";

export const getExp = async () => {
  const { data } = await portfolioApi.get("/api/portfolio/experience");
  return data?.data;
};
