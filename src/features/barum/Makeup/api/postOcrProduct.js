export const postOcrProduct = async (ocrProduct) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    added: 1,
    sampleCleared: true,
    items: [{ productId: "mock-product-id-ocr-0", name: ocrProduct?.alias || "사진 등록 제품" }],
  };
};
