export const recognizeMakeupOcr = async ({ storagePath, alias = "직구 세럼" }) => {
  void storagePath;
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    alias,
    ingredients: [
      { standardName: "정제수", matched: true },
      { standardName: "글리세린", matched: true },
      { standardName: "부틸렌글라이콜", matched: true },
      { standardName: "1,2-헥산다이올", matched: true },
      { standardName: "나이아신아마이드", matched: true },
      { standardName: "판테놀", matched: true },
      { standardName: "병풀추출물", matched: false, rawName: "센텔라아시아티카추출물" },
      { standardName: "소듐하이알루로네이트", matched: true },
      { standardName: "알란토인", matched: true },
      { standardName: "마트리카리아꽃추출물", matched: false, rawName: "캐모마일추출물" },
      { standardName: "에틸헥실글리세린", matched: true },
    ],
    matchedCount: 9,
    totalCount: 11,
  };
};
