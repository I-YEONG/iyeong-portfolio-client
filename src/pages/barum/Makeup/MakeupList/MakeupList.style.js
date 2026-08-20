import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const makeupPageStyle = css({
  ...theme.barum.flex.colStart,
  gap: "22px",
  flex: 1,
  // height: "calc(100% - 36px - 8px)",

  // 타이틀 박스 시작

  "& .makeup": {
    ...theme.barum.flex.rowBetween,
    alignItems: "center",

    "& .plus": {
      borderRadius: "999px",
      padding: "8px 18px",
      backgroundColor: theme.barum.colors.greenDeep,
      color: "#fff",
      ...theme.barum.fonts.caption_tab,
      cursor: "pointer",
    },
  },

  "& .makeup > .title-box": {
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
