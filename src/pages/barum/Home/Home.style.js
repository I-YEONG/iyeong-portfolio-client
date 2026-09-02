import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const homePageStyle = css({
  ...theme.barum.flex.colStart,
  gap: "22px",

  // 타이틀 박스 시작
  "& .title-box.home": {
    ...theme.barum.flex.colStart,
    gap: "8px",

    // 날짜
    "& .date": {
      ...theme.barum.fonts.caption,
      color: theme.barum.colors.ink3,
    },

    // 타이틀
    "& .title": {
      ...theme.barum.fonts.display,
    },
  },
});
