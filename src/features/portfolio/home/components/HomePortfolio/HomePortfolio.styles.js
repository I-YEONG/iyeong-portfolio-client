import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

// 공통 레이아웃: 전체 섹션과 배너 스택의 기본 구조
const layoutCss = () => ({
  display: "flex",
  flexDirection: "column",
  gap: "min(4vh, 48px)",
  overflow: "visible",

  ".banner-stack": {
    width: "100%",
    position: "relative",
  },

  ".banner-stage": {
    height: "215vh",
    width: "100%",
    position: "relative",
  },

  // sticky 뷰포트(100vh) 안에서 배경은 고정되고, 내부 요소만 움직이게 만드는 핵심 레이어
  ".banner-sticky": {
    position: "sticky",
    top: 0,
    height: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "0 20px",
    isolation: "isolate",
  },

  ".banner-bg": {
    position: "absolute",
    inset: 0,
    zIndex: 0,
  },
});

// 배너 1 전용 스타일
export const banner1Css = () => ({
  ".banner-1": {
    height: "300vh",
  },

  "& .banner-1 .banner-content": {
    ...theme.flex.colCenter,
    gap: "18px",
    textAlign: "center",

    "& .title": {
      ...theme.fonts.titleMd_B,
      lineHeight: 1.3,
    },

    "& .sub-title": {
      ...theme.fonts.textLg_B,
      color: theme.colors.orange,
    },

    "& .caption": {
      ...theme.fonts.captionXl,
    },

    "& .icon-box": {
      gap: "32px",
      ...theme.flex.rowCenter,
      color: theme.colors.gray400,
      fill: theme.colors.gray400,

      "& .user-box": {
        ...theme.flex.rowCenter,
        ...theme.fonts.captionXl_B,
        alignItems: "center",
        gap: "6px",
      },
    },

    "& .button-box": {
      width: "50%",
      margin: "0 auto",
      marginTop: "3vh",
    },
  },

  ".banner-1 .banner-bg": {
    backgroundColor: "#EDEDED",
  },
});

// 배너 2 전용 스타일
export const banner2Css = () => ({
  ".banner-2": {
    color: theme.colors.black,
  },

  ".banner-2 .banner-bg": {
    background: "linear-gradient(140deg, #f8fafc 0%, #e2e8f0 100%)",
  },
});

// 배너 3 전용 스타일
export const banner3Css = () => ({
  // 3번째 배너는 긴 스크롤 구간(300vh)을 가져야 200vh 패널이 자연스럽게 통과함
  ".banner-3": {
    color: theme.colors.black,
    height: "360vh",
  },

  ".banner-3 .banner-bg": {
    background: "linear-gradient(150deg, #ffffff 0%, #f1f5f9 100%)",
  },

  ".banner-3 .banner-sticky": {
    alignItems: "flex-start",
  },

  ".banner-3 .banner-content": {
    marginTop: "14vh",
  },

  // 200vh 패널: GSAP에서 yPercent로 아래->위 이동시키는 대상
  ".slide-up-panel": {
    position: "absolute",
    top: "100%",
    left: "50%",
    width: "min(760px, 92%)",
    height: "200vh",
    zIndex: 1,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 1,
  },
});

// 반응형 보정
const responsiveCss = () => ({
  [mq("tablet")]: {
    ".banner-1": {
      height: "225vh",
    },
    ".banner-stage": {
      height: "195vh",
    },
    ".banner-3": {
      height: "310vh",
    },
    ".slide-up-panel": {
      width: "94%",
    },
  },
});

export const homePortfolioCss = () =>
  css({
    ...layoutCss(),
    ...banner1Css(),
    ...banner2Css(),
    ...banner3Css(),
    ...responsiveCss(),
  });
