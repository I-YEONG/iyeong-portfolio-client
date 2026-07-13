import { getDataApi } from "@/api/getDataApi";

// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["domo"];

// 오버뷰 조회 훅
/**
 *   const {
    data: departmentList,
    isLoading: isDepartmentListLoading,
    isError: isDepartmentListError,
  } = useGetDomoQuery(`/department/${selectedUniv}`, {
    enabled: !!selectedUniv,
  });
  
 * @param {*} path
 * @returns { data: cert, isLoading: isCertLoading, isError: isCertError }
 */
export const useGetDomoQuery = (path, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEY, path],
    queryFn: () => getDataApi("domo", path),
    ...options,
  });
};
