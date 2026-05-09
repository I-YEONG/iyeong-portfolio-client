import { getExp } from "../api/expApi";

// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["exp"];

// 오버뷰 조회 훅
export const useExpQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getExp,
  });
};
