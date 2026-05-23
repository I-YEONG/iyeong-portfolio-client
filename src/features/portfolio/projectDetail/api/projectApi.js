import { portfolioApi } from "@/api";

export const getProjectDetailApi = async (id) => {
  const { data } = await portfolioApi.get(`/api/portfolio/projects/${id}`);
  return data.data;
};
