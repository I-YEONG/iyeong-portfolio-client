import { portfolioApi } from "@/api";

export const getStack = async () => {
  const { data } = await portfolioApi.get("/api/portfolio/stack");
  return data?.data;
};
