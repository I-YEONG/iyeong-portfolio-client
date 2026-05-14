import { portfolioApi } from "@/api";

export const getProjectListApi = async () => {
  const { data } = await portfolioApi.get("/api/portfolio/projects");
  return data;
};
