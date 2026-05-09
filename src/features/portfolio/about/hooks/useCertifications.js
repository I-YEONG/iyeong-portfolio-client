// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCertifications } from "../api/certifications.Api";

const QUERY_KEY = ["certifications"];

// 오버뷰 조회 훅
export const useCertificationsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCertifications,
  });
};
