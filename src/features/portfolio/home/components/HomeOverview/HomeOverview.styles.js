import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const homeOverviewCss = () =>
  css({
    width: "100%",
    height: "360px",
    ...theme.flex.rowBetween,
    flexWrap: "nowrap",
    position: "relative",

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

    "& .swiper .item": {
      width: "100%",
      height: "100%",
      borderRight: `1px solid ${theme.colors.lightLine}`,

      ...theme.flex.colCenter,
      alignItems: "center",
      gap: "26px",

      [mq("UHD")]: {
        borderRightWidth: "2px",
      },
    },

    "& > .fixed-block": {
      flex: "1 1 0%",
      minWidth: 0,
      borderLeft: `1px solid ${theme.colors.lightLine}`,
      backgroundColor: "#fff",

      ...theme.flex.colCenter,

      [mq("UHD")]: {
        borderLeftWidth: "2px",
      },
    },

    [mq("mobile")]: {
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

    "& .swiper .item .title": {
      ...theme.fonts.textLg_B,
    },

    "& .swiper .item .sub-title": {
      ...theme.fonts.captionXl,
      textAlign: "center",
    },
  });
