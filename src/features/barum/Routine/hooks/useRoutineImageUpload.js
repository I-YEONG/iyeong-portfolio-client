import { useMutation } from "@tanstack/react-query";

export const useRoutineImageUpload = () => {
  return useMutation({
    mutationFn: async ({ file, purpose = "SELFIE" }) => {
      if (!file) {
        throw { code: "VALIDATION_ERROR", message: "업로드할 이미지가 없습니다." };
      }

      return {
        bucket: purpose === "OCR" ? "labels" : "selfies",
        storagePath: "mock-user/2026-08-14.jpg",
        expiresIn: 300,
      };
    },
  });
};
