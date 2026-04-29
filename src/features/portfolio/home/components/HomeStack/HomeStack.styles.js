import { css } from "@emotion/react";
// import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const HomeStackCss = () =>
  css({
    margin: "24px 0",

    "& .swiper-slide": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    "& .icon": {
      height: "32px",
      width: "auto",
      maxWidth: "100%",
      display: "block",
      opacity: 0.15,

      [mq("mobile")]: { height: "24px" },
      margin: "0 auto",
    },
  });
