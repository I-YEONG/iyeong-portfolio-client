import { getDataApi } from "@/api/getDataApi";

// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["careerhi"];

// 오버뷰 조회 훅
/**
 * const { data: cert, isLoading: isCertLoading, isError: isCertError } = useCertificationsQuery();
 * @param {*} path
 * @returns { data: cert, isLoading: isCertLoading, isError: isCertError }
 */
export const useGetCareerHiQuery = (path) => {
  return useQuery({
    queryKey: [...QUERY_KEY, path],
    queryFn: () => getDataApi("careerhi", path),
  });
};
