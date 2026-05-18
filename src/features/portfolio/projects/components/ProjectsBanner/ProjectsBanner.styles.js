import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectsBannerCss = css({
  ...theme.flex.rowBetween,
  width: "100%",
  maxHeight: "460px",
  "& .content": {},

  // 이미지
  "& .img-box": {
    position: "relative",
    maxWidth: "50%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
  },

  [mq("mobile")]: {
    flexDirection: "column",

    "& .img-box": {
      maxWidth: "100%",
    },
  },
});
