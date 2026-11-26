import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/api";

export const getWishData = async (path, signal) => {
  const { data } = await portfolioApi.get("/api/projects/wish/mocks", { params: { path }, signal });
  if (!data?.success) throw new Error("목업 데이터를 찾을 수 없습니다.");
  return data.data;
};

export const useGetWishQuery = (path, options = {}) =>
  useQuery({ queryKey: ["wish", path], queryFn: ({ signal }) => getWishData(path, signal), ...options });
