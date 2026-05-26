import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectDetailImgsCss = css({
  // 레이아웃
  width: "100%",
  height: "23vh",
  borderBottom: `1px solid ${theme.colors.lightLine}`,

  "& .explanation": {
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
    ...theme.fonts.captionLg,
    color: theme.colors.black600,
  },

  "& .mySwiper": {
    marginBottom: "2rem",
  },

  "& .mySwiper .swiper-wrapper": {
    alignItems: "flex-start",
  },

  "& .mySwiper .swiper-slide": {
    width: "fit-content",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
  },

  "& .content-center": {
    position: "relative",
    ...theme.flex.rowBetween,
    width: "90%",
    height: "100%",
    margin: "0 auto",
    maxWidth: "1280px",
    padding: "2rem",

    borderRight: `1px solid ${theme.colors.lightLine}`,
    borderLeft: `1px solid ${theme.colors.lightLine}`,

    "& .image-item": {
      width: "auto",
      height: "100%",
      objectFit: "contain",
      display: "block",
    },
  },
  [mq("mobile")]: {
    height: "30vh",
  },
});
