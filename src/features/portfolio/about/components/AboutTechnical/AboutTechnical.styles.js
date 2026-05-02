import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const aboutTechnicalCss = css({
  // Loading
  "& > .loading-wrap": {
    width: "100%",
    height: "100%",
    ...theme.flex.center,
  },

  "& .swiper-navigation-icon": {
    display: "none",
  },

  // Layout
  width: "100%",
  height: "360px",
  ...theme.flex.rowBetween,
  flexWrap: "nowrap",
  position: "relative",

  // Swiper
  "& > .swiper-div": {
    flex: "0 0 75%",
    width: "75%",
    minWidth: 0,
    overflow: "hidden",

    "& .swiper": {
      width: "100.1%",
      height: "100%",

      [mq("UHD")]: {
        width: "100.3%",
      },
    },

    [mq("mobile")]: {
      flex: 1,
      width: "100%",
    },
  },

  "& .swiper .swiper-pagination": {
    display: "none",
  },

  "& .swiper .item": {
    ...theme.flex.rowBetween,
    width: "100%",
    height: "100%",
    alignItems: "center",
    [mq("UHD")]: {
      borderRightWidth: "2px",
    },

    // 기술 스택 박스
    "& .technical-box": {
      width: "33.3333%",
    },
  },

  // Fixed block
  "& > .fixed-block": {
    ...theme.flex.colCenter,
    ...theme.fonts.captionXl,
    flex: "0 0 25%",
    width: "25%",
    minWidth: 0,
    borderRight: `1px solid ${theme.colors.lightLine}`,
    backgroundColor: "#fff",
    alignItems: "center",
    textAlign: "center",
    gap: "26px",

    [mq("mobile")]: {
      display: "none",
    },

    [mq("UHD")]: {
      borderLeftWidth: "2px",
    },

    "& .title": {
      ...theme.fonts.textLg_B,
    },
  },
});
