import { useMutation } from "@tanstack/react-query";
import { recognizeMakeupOcr } from "@/features/barum/Makeup/api/recognizeMakeupOcr";

export const useMakeupOcrUpload = () => {
  return useMutation({
    mutationFn: async ({ file, alias = "직구 세럼" }) => {
      if (!file) {
        throw { code: "VALIDATION_ERROR", message: "업로드할 이미지가 없습니다." };
      }

      return recognizeMakeupOcr({ storagePath: "mock-user/2026-08-14.jpg", alias });
    },
  });
};
