export const postSearch = async (catalogIds) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    added: catalogIds.length,
    sampleCleared: true,
    items: catalogIds.map((id, idx) => ({
      productId: `mock-product-id-${idx}`,
      name: `카탈로그 제품 ${id}`,
    })),
  };
};
