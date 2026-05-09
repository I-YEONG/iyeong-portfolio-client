import { getStack } from "../api/stackApi";

// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["stacks"];

// 오버뷰 조회 훅
export const useStackQuery = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getStack,
  });
};
