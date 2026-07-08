import { portfolioApi } from "@/api";

export const getComment = async (projectUrl) => {
  const { data } = await portfolioApi.get(`/api/portfolio/main/projects/${projectUrl}`);
  return data.data;
};
