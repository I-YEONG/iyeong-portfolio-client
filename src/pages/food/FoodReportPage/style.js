import { css } from "@emotion/react";

// =========================
// 제보 페이지 메인 레이아웃 스타일
// =========================
export const foodReportPageMainStyle = (isPc) =>
  css({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    padding: isPc ? "2rem 1rem" : "0", // 미디어 쿼리를 isPc 삼항연산자로 처리
    background: "var(--food-main-page-bg)",

    "& .cards": {
      border: "1px solid var(--food-brown-dark)",
      borderRadius: "8px",
      overflow: "hidden",
      /* Tailwind CSS의 shadow-lg */
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      background: "var(--food-gray-0)",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
  });

// =========================
// 하단 버튼 영역 스타일
// =========================
export const foodReportPageButtonStyle = () =>
  css({
    display: "flex",
    gap: "20px",
    "& > span": {
      flex: 1,
      padding: "1rem",
    },
  });
