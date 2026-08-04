import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const aboutBannerCss = css({
  ...theme.flex.center,
  width: "100%",
  height: "520px",
  backgroundColor: theme.colors.darkBG,
  position: "relative",
  overflow: "hidden",

  [mq("mobile")]: {
    height: "400px",
  },

  "--grid-x": "0px",
  "--grid-y": "0px",

  "& .content": {
    width: "90%",
    maxWidth: "1280px",
    margin: "0 auto",
    color: "#fff",
    position: "relative",
    zIndex: 1,

    // 타이틀 박스
    "& .title-box": {
      display: "flex",
      gap: "24px",
      alignItems: "end",

      "& .title": {
        ...theme.fonts.titleSm_B,
        lineHeight: "1.4",
        [mq("mobile")]: {
          ...theme.fonts.textXLg_B,
        },
      },

      "& .sub-title": {
        [mq("mobile")]: {
          ...theme.fonts.captionXl,
        },
      },
    },

    // 버튼박스
    "& .button-box": {
      display: "flex",
      gap: "24px",
      marginTop: "24px",
      "& > a:first-of-type": {
        width: "224px",
      },
    },
  },

  "& .bg": {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",

    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      background: "radial-gradient(720px 820px at 50% 50%, rgba(255, 255, 255, 0.04), transparent 70%)",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      width: "300%",
      height: "300%",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) rotateX(65deg)",
      backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.75) 1.5px, transparent 1.5px)",
      backgroundSize: "48px 114px",
      opacity: 0.6,
      maskImage: "none",
      WebkitMaskImage: "none",
    },
  },
});
