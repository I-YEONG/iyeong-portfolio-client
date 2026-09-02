import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const routineSelfieLayoutStyle = css({ ...theme.barum.flex.colBetween });

// 메인 스타일
export const routineSelfieStyle = css({
  ...theme.barum.flex.colStart,
  width: "100%",
  height: " 100%",
  gap: "18px",

  "& .title": {
    ...theme.barum.fonts.titleL,
  },

  "& .caption": {
    color: theme.barum.colors.ink3,
    textAlign: "center",
    ...theme.barum.fonts.caption,
  },

  "& .button-box": {
    ...theme.barum.flex.rowBetween,
    alignItems: "center",
    gap: "24px",

    "& > .button": {
      maxWidth: "60px",
      minWidth: "60px",
      maxHeight: "60px",
      minHeight: "60px",
      borderRadius: "999px",
      padding: "3px",
      border: `4px solid ${theme.barum.colors.greenDeep}`,
      position: "relative",
      cursor: "pointer",
      ...theme.barum.flex.center,

      "& > div": {
        width: "46px",
        height: "46px",
        borderRadius: "999px",
        backgroundColor: theme.barum.colors.greenDeep,
      },
    },

    "& .text": {
      width: "100%",
      color: theme.barum.colors.ink2,
      ...theme.barum.fonts.body,
    },
  },

  "& .select-button": {
    marginBottom: "8px",
  },
});
