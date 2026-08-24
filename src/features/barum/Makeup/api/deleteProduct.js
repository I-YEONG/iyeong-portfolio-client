export const deleteProduct = async (productId) => {
  if (!productId) {
    throw { code: "VALIDATION_ERROR", message: "삭제할 제품 정보가 없습니다." };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  return { ok: true };
};
