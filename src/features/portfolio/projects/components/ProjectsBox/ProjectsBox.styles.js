import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectsBoxCss = css({
  width: "100%",
  height: "320xp",
  flex: "1 1 0",
  ...theme.flex.colStart,

  "& > .img-box": {
    width: "100%",
    aspectRatio: "16/9", // 또는 "2/1" 등 원하는 비율
    maxHeight: "480px", // 필요시 최대 높이 제한
    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
  },

  // 콘텐츠
  "& .content-box": {
    border: "none",
    ...theme.flex.colCenter,
  },
});
