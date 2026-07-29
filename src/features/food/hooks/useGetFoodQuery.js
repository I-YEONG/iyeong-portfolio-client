import { getDataApi } from "@/api/getDataApi";

// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["foodmap"];

// 오버뷰 조회 훅
/**
 *   const {
    data: departmentList,
    isLoading: isDepartmentListLoading,
    isError: isDepartmentListError,
  } = useGetFoodQuery(`/`, {
    enabled: !!selectedUniv,
  });
  
 * @param {*} path
 * @returns { data: cert, isLoading: isCertLoading, isError: isCertError }
 */
export const useGetFoodQuery = (path, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEY, path],
    queryFn: () => getDataApi("foodmap", path),
    ...options,
  });
};
