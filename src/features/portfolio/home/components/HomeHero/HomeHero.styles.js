import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const homeHeroContent = css({
  ...theme.flex.colCenter,
  position: "relative",
  gap: "32px",
  marginBottom: "80px",
  alignItems: "center",

  "& .title": {
    ...theme.fonts.titleLg_B,
    lineHeight: "1.4",
  },

  "& .title-sub": {
    ...theme.fonts.textMd_L,
  },

  "& .button": {
    width: "40%",
    height: "52px",
    marginTop: "24px",
  },

  [mq("mobile")]: {
    gap: "26px",

    "& .title": {
      ...theme.fonts.titleMd_B,
    },

    "& .title-sub": {
      ...theme.fonts.captionLg_L,
    },

    "& .button": {
      width: "60%",
    },
  },

  [mq("UHD")]: {
    "& .title-sub": {
      ...theme.fonts.textMd,
    },
  },
});

export const homeHero = css({
  ...theme.flex.center,
  width: "100%",
  height: "calc(100vh - 93px)",
  color: "#fff",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  backgroundColor: "rgba(0,0,0,0.5)",

  "& video": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    transform: "scale(1.15) translate(-1%, -3%)",
  },

  // 반응형
  [mq("mobile")]: {
    height: "calc(100vh - 85px)",
  },
});
