import { portfolioApi } from "@/api";

export const getCertifications = async () => {
  const { data } = await portfolioApi.get("/api/portfolio/certification");
  return data.data;
};
