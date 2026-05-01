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

  // Layout
  width: "100%",
  height: "360px",
  ...theme.flex.rowBetween,
  flexWrap: "nowrap",
  position: "relative",

  // Swiper
  "& > .swiperDiv": {
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
  },

  "& .swiper .swiper-pagination": {
    display: "none",
  },

  "& .swiper .item": {
    width: "100%",
    height: "100%",
    ...theme.flex.colCenter,
    alignItems: "center",
    gap: "26px",
    [mq("UHD")]: {
      borderRightWidth: "2px",
    },
  },

  // Fixed block
  "& > .fixed-block": {
    flex: "0 0 25%",
    width: "25%",
    minWidth: 0,
    borderRight: `1px solid ${theme.colors.lightLine}`,
    backgroundColor: "#fff",
    ...theme.flex.colCenter,
    alignItems: "center",
    textAlign: "center",
    gap: "26px",

    [mq("UHD")]: {
      borderLeftWidth: "2px",
    },
  },
});
