import { getProjectListApi } from "../api/projectListApi";

// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["project_list"];

// 오버뷰 조회 훅
export const useGetProjectListQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getProjectListApi,
  });
};
