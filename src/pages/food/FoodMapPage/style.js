import { css } from "@emotion/react";

// ==========================================
// 메인 레이아웃 스타일 (isPc로 PC/모바일 분기)
// ==========================================
export const foodMapPageMainStyle = (isPc) =>
  css({
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",

    "#map > div:nth-child(3) > div": {
      display: isPc ? "unset" : "none",
    },

    "& > #map": {
      width: "100%",
      height: "100%",

      // 카카오맵 컨트롤러 커스텀 위치 조정
      "& > div:nth-child(3) > div:nth-child(1)": {
        top: "1rem !important",
        left: "calc(100% - 8rem) !important",
      },
      "& > div:nth-child(3) > div:nth-child(2)": {
        top: "4rem !important",
        left: "calc(100% - 3.2rem) !important",
      },

      // 기존 style.css 의 768px 미디어 쿼리를 isPc 조건문으로 처리
      "& > div:nth-child(3) > div": {
        display: isPc ? "block" : "none",
      },
    },
  });

// ==========================================
// 지도 컨테이너 스타일
// ==========================================
export const foodMapContainerStyle = (isPc) =>
  css({
    position: "absolute",
    right: "0px",
    width: isPc ? "calc(100% - min(26%, 460px))" : "100%",
    height: "100%",
  });
