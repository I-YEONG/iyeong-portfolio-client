import { portfolioApi } from "@/api";

export const getProjectListApi = async () => {
  const { data } = await portfolioApi.get("/api/portfolio/main/overview");
  return data;
};
