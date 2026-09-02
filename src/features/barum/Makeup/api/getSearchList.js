export const getSearchList = async (name, page = 0, category = "") => {
  const { makeupSearchMockup } = await import("@/mockup/barum/makeupSearchMockup.js");
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let filteredItems = makeupSearchMockup.items;

  // 1. 카테고리 필터링 (카테고리가 선택된 경우 먼저 필터링)
  if (category) {
    filteredItems = filteredItems.filter((item) => item.category === category);
  }

  // 2. 검색어(name) 필터링 (제품명 또는 브랜드명)
  if (name) {
    filteredItems = filteredItems.filter((item) => item.name.includes(name) || item.brand.includes(name));
  }

  // 3. 페이지네이션 적용 (단위: 20)
  const SIZE = 20;
  const startIndex = page * SIZE;
  const endIndex = startIndex + SIZE;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  // 4. 페이지네이션 및 필터링된 결과로 응답 객체 재구성
  return {
    ...makeupSearchMockup,
    items: paginatedItems,
    page,
    size: SIZE,
    totalElements: filteredItems.length,
  };
};
