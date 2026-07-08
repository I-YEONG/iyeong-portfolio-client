import { getComment } from "../api/commentApi";

// eslint-disable-next-line no-unused-vars
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = ["comment"];

// 오버뷰 조회 훅
export const useCommentQuery = (projectUrl) => {
  return useQuery({
    queryKey: [...QUERY_KEY, projectUrl],
    queryFn: () => getComment(projectUrl),
    enabled: Boolean(projectUrl),
  });
};
