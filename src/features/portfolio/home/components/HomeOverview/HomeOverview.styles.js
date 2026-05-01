import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const homeOverviewCss = () =>
  css({
    // Layout
    width: "100%",
    height: "360px",
    ...theme.flex.rowBetween,
    flexWrap: "nowrap",
    position: "relative",

    // Swiper
    "& > .swiperDiv": {
      flex: "3 1 0%",
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

      borderRight: `1px solid ${theme.colors.lightLine}`,

      [mq("UHD")]: {
        borderRightWidth: "2px",
      },
    },

    // Fixed block
    "& > .fixed-block": {
      flex: "1 1 0%",
      minWidth: 0,
      borderLeft: `1px solid ${theme.colors.lightLine}`,
      backgroundColor: "#fff",
      ...theme.flex.colCenter,
      alignItems: "center",
      textAlign: "center",
      gap: "26px",

      [mq("UHD")]: {
        borderLeftWidth: "2px",
      },
    },

    // Loading
    "& > .loading-wrap": {
      width: "100%",
      height: "100%",
      ...theme.flex.center,
    },

    // Typography
    "& .swiper .item .title, & .fixed-block .title": {
      ...theme.fonts.textLg_B,
    },

    "& .swiper .item .sub-title": {
      ...theme.fonts.captionXl,
      textAlign: "center",
      color: theme.colors.black600,
    },

    // Responsive
    [mq("mobile")]: {
      // Swiper 페이지네이션
      "& .swiper .swiper-pagination": {
        display: "block",
        bottom: "18px",
      },

      "& .swiper-pagination-bullet-active-main": {
        backgroundColor: theme.colors.green,
      },

      "& .swiperDiv": {
        flex: 1,
      },

      "& .swiperDiv .swiper .item": {
        borderRight: "none",
      },

      "& .fixed-block": {
        display: "none",
      },
    },
  });
