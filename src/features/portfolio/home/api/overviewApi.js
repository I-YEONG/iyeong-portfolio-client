import { portfolioApi } from "@/api";

export const getOverview = async () => {
  const { data } = await portfolioApi.get("/api/portfolio/main/overview");
  return data;
};
