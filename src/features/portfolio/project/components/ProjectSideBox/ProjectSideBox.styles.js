import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectSideBoxCss = css({
  width: "100%",
  maxWidth: "340px",
  height: "100%",
  padding: "24px",
  backgroundColor: "#28292a",
  overflowY: "hidden",
  color: "white",
  zIndex: "999",

  [mq("mobile")]: {
    height: "calc(100vh - 62px)",
  },

  "& .title-content": {
    paddingBottom: "24px",
    marginBottom: "24px",
    borderBottom: `1px solid #515151`,

    "& .title-box": {
      ...theme.flex.rowBetween,
      marginBottom: "8px",
      alignItems: "center",
      "& .title": {
        ...theme.fonts.textXLg_B,
      },
    },

    "& .date": {
      ...theme.fonts.captionXl,
      color: "#A0A0A0",
    },
  },
  "& .comment-box": {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    ...theme.flex.colStart,
    alignItems: "flex-start",
    gap: "24px",
    ...theme.fonts.captionXl_L,
    wordBreak: "keep-all",
    lineHeight: "1.5",
    color: "#A0A0A0",
    "& .comment-title": {
      ...theme.fonts.textMd_B,
      color: "white",
      "& span": { marginRight: "8px" },
    },
  },
});
