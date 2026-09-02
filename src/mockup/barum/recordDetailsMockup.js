export const recordDetailsMockup = {
  date: "2026-08-11",
  selfieUrl: "https://placehold.co/350x190",
  // selfieUrl: "none",
  weather: {
    temp: 29.0,
    humidity: 38.0,
    pm10: 22,
    pm25: 14,
    summary: "건조하고 미세먼지 보통이에요",
  },
  skin: {
    dry: false,
    oily: true,
    redness: false,
    trouble: true,
    summary: "턱 주변 트러블이 보여요",
  },
  conflicts: [
    {
      ingredients: ["레티놀", "비타민C"],
      level: "AVOID",
      label: "같이 쓰지 마세요",
      reason: "순수 비타민C와 레티놀을 한 번에 쓰면 자극이 겹칠 수 있어요.",
      source: "...",
    },
    {
      ingredients: ["세라마이드", "판테놀"],
      level: "GOOD",
      label: "함께 쓰면 좋아요",
      reason: "장벽 보습 조합이라 함께 쓰면 피부 컨디션 유지에 도움이 돼요.",
      source: "...",
    },
  ],
  routine: {
    apply: [
      { order: 1, name: "약산성 젤 클렌저", reason: "장벽은 남기고" },
      { order: 2, name: "어성초 77 토너", reason: "습도 61%, 진정 위주" },
      { order: 3, name: "나이아신아마이드 세럼", reason: "턱 트러블 진정" },
      { order: 4, name: "무기자차 선크림", reason: "미세먼지 차단막" },
    ],
    skip: [
      { name: "레티놀 앰플", reason: "비타민C와 겹쳐 자극이 커져요" },
      { name: "스크럽 필링젤", reason: "트러블 부위에 자극이 될 수 있어요" },
    ],
  },
};
