import { css, keyframes } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";
// import { transform } from "typescript";

const driftLeft = keyframes`
  0% {
    transform: translateX(-40px) translateY(0px) scale(1);
  }
  50% {
    transform: translateX(-50px) translateY(-6px) scale(1.015);
  }
  100% {
    transform: translateX(-40px) translateY(0px) scale(1);
  }
`;

const driftRight = keyframes`
  0% {
    transform: translateX(40px) translateY(0px) scale(1);
  }
  50% {
    transform: translateX(52px) translateY(5px) scale(1.018);
  }
  100% {
    transform: translateX(40px) translateY(0px) scale(1);
  }
`;

const driftIconLeft = keyframes`
  0% {
    transform: translateX(0px) translateY(0px) scale(1.2);
  }
  50% {
    transform: translateX(-6px) translateY(-3px) scale(1.205);
  }
  100% {
    transform: translateX(0px) translateY(0px) scale(1.2);
  }
`;

const driftIconRight = keyframes`
  0% {
    transform: translateX(0px) translateY(0px) scale(1.2);
  }
  50% {
    transform: translateX(7px) translateY(4px) scale(1.208);
  }
  100% {
    transform: translateX(0px) translateY(0px) scale(1.2);
  }
`;

const subTitleBase = {
  ...theme.fonts.textLg_B,

  [mq("mobile")]: {
    ...theme.fonts.captionXl_B,
  },
};

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
    height: "172vh",
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

const bannerContentBase = {
  ...theme.flex.colCenter,
  gap: "24px",
  width: "100%",
  maxWidth: "1280px",

  "& .not-mobile": {
    [mq("mobile")]: {
      display: "none",
    },
  },

  "& .title": {
    ...theme.fonts.titleMd_B,
    lineHeight: 1.3,

    [mq("mobile")]: {
      ...theme.fonts.textLg_B,
    },
  },

  "& .caption": {
    ...theme.fonts.captionXl,

    [mq("mobile")]: {
      ...theme.fonts.captionLg,
    },
  },

  "& .icon-box": {
    gap: "32px",
    display: "flex",
    color: theme.colors.gray400,
    fill: theme.colors.gray400,

    "& .user-box": {
      display: "flex",
      ...theme.fonts.captionXl_B,
      alignItems: "center",
      gap: "6px",
    },
  },

  "& .button-box": {
    width: "20%",
    marginTop: "3vh",

    [mq("mobile")]: {
      width: "70%",
    },
  },
};

// 배너 1 전용 스타일
export const banner1Css = () => ({
  ".banner-1": {
    height: "230vh",
  },

  "& .banner-1 .banner-content": {
    ...bannerContentBase,
    textAlign: "center",

    "& .sub-title": {
      ...subTitleBase,
      color: theme.colors.orange,
    },
  },

  "& .banner-1 .icon-box": {
    ...theme.flex.rowCenter,
  },

  "& .banner-1 .icon-box .user-box": {
    ...theme.flex.rowCenter,
  },

  "& .banner-1 .button-box": {
    margin: "0 auto",
  },

  ".banner-1 .banner-bg": {
    backgroundColor: "#EDEDED",
  },
});

// 배너 2 전용 스타일
export const banner2Css = () => ({
  ".banner-2": {
    height: "270vh",
  },

  "& .banner-2 .banner-content": {
    ...bannerContentBase,
    justifyContent: "flex-start",
    textAlign: "start",
    marginBottom: "10vh",

    "& .sub-title": {
      ...subTitleBase,
      color: theme.colors.blue,
    },
  },

  "& .banner-2 .icon-box": {
    width: "fit",
  },

  ".banner-2 .banner-bg": {
    backgroundColor: "#f3f3f3",
  },

  ".banner-2 .banner-bg .point-bg": {
    position: "absolute",
    filter: "blur(100px)",
    borderRadius: "200px",
    pointerEvents: "none",
  },

  ".banner-2 .banner-bg .point-bg-1": {
    width: "200px",
    height: "200px",
    left: "200px",
    top: "10%",
    background: "rgba(107, 162, 255, 0.15)",
    animation: `${driftLeft} 18s ease-in-out infinite`,
  },

  ".banner-2 .banner-bg .point-bg-2": {
    width: "280px",
    height: "280px",
    right: "10%",
    bottom: "10%",
    background: "rgba(107, 162, 255, 0.2)",
    animation: `${driftRight} 20s ease-in-out infinite 1s`,
  },

  ".banner-2 .banner-bg .icon-bg": {
    position: "absolute",
    opacity: 0.65,
  },

  ".banner-2 .banner-bg .icon-bg-1": {
    top: "20%",
    right: "0px",
    transformOrigin: "center",
    animation: `${driftIconLeft} 22s ease-in-out infinite`,
  },
  ".banner-2 .banner-bg .icon-bg-2": {
    bottom: "20%",
    animation: `${driftIconRight} 24s ease-in-out infinite 1.2s`,
  },

  ".banner-2 .images-box": {
    ...theme.flex.rowCenter,
    position: "absolute",
    top: "45%",
    left: "50%",
  },

  ".banner-2 .images-box .image-1": {
    transform: "scale(1.2)",
  },

  ".banner-2 .images-box .image-2": {
    position: "relative",
    left: "-68px",
    bottom: "-62px",
  },
});

// 배너 3 전용 스타일
export const banner3Css = () => ({
  ".banner-3": {
    height: "330vh",
    backgroundColor: "#F6F8FB",
  },

  "& .banner-3 .banner-content": {
    ...bannerContentBase,
    alignItems: "flex-end",
    textAlign: "end",
    marginBottom: "10vh",
    zIndex: 2, // 배경보다 위에 있도록 z-index 조정

    "& .sub-title": {
      ...subTitleBase,
      color: theme.colors.deepGreen,
    },
  },

  "& .banner-3 .icon-box": {
    width: "fit",
    justifyContent: "flex-end",
  },

  // 200vh 패널: GSAP에서 yPercent로 아래->위 이동시키는 대상
  ".slide-up-panel": {
    position: "absolute",
    top: "100%",
    left: "35%",
    width: "min(760px, 92%)",
    height: "200vh",
    zIndex: 1,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "1",
  },
});

// 반응형 보정
const responsiveCss = () => ({
  [mq("tablet")]: {
    ".banner-1": {
      height: "182vh",
    },
    ".banner-stage": {
      height: "158vh",
    },
    ".banner-2": {
      height: "210vh",
    },
    ".banner-3": {
      height: "290vh",
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
