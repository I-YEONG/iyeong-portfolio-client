import { getProjectDetailApi } from "../api/projectApi";

// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["project_detail"];

// 오버뷰 조회 훅
export const useGetProjectDetailQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getProjectDetailApi,
  });
};
