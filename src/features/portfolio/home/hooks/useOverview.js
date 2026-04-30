import { getOverview } from "../api/overviewApi";

// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["projects"];

// 오버뷰 조회 훅
export const useOverviewQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getOverview,
  });
};
