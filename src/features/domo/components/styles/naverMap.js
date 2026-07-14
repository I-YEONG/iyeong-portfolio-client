import { css, keyframes } from "@emotion/react";

// --- 연결선 애니메이션 (Keyframes) ---
const dashAnimation = keyframes`
  to {
    stroke-dashoffset: -20;
  }
`;

export const domoNaverMapStyle = (isPc) =>
  css({
    // --- 지도 컨테이너 자체 스타일 (기존 #map 및 인라인 스타일 대체) ---
    width: "100%",
    height: isPc ? "100vh" : "60vh",
    borderRadius: 0,

    // --- 번호 마커 스타일 (지도 내부에 동적으로 삽입되는 요소) ---
    ".custom-marker": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      // isPc를 이용해 미디어 쿼리 대체
      width: isPc ? "32px" : "28px",
      height: isPc ? "32px" : "28px",
      fontSize: isPc ? "14px" : "12px",

      backgroundColor: "#0052e9",
      color: "white",
      borderRadius: "50%",
      fontWeight: "bold",
      border: "3px solid white",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
      cursor: "pointer",
      transition: "all 0.2s ease",

      "&:hover": {
        transform: "scale(1.1)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
      },
    },

    // --- 연결선 스타일 ---
    ".route-line": {
      stroke: "#0052e9",
      strokeWidth: 4,
      strokeLinecap: "round",
      fill: "none",
      opacity: 0.8,
      animation: `${dashAnimation} 2s ease-in-out infinite`,
    },
  });
