import { useMutation } from "@tanstack/react-query";
import { postOcrProduct } from "@/features/barum/Makeup/api/postOcrProduct";

export const usePostOcrProduct = (options = {}) => {
  return useMutation({
    mutationFn: (ocrProduct) => postOcrProduct(ocrProduct),
    ...options,
  });
};
