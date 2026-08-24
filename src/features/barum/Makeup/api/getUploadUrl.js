export const getMakeupUploadUrl = async ({ purpose = "OCR" } = {}) => {
  return {
    bucket: purpose === "OCR" ? "labels" : "selfies",
    storagePath: "mock-user/2026-08-14.jpg",
    expiresIn: 300,
  };
};
