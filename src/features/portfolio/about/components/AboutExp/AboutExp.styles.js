import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const aboutExpCss = css({
  width: "100%",
  height: "100%",

  "& > .loading-box": {
    position: "absolute",
    inset: 0,
    ...theme.flex.center,
  },

  "& > .row": {
    ...theme.flex.rowBetween,
    ...theme.fonts.captionLg,
    width: "100%",
    borderBottom: `1px solid ${theme.colors.lightLine}`,

    "& > div": {
      padding: "12px 18px",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    "& > .title": {
      flex: "1 0 20%",
    },
    "& > .type": {
      display: "block",
    },

    "& > div.detail": {
      flex: "1 0 43%",
      whiteSpace: "pre-line",
    },
    "& > .period": {
      flex: "1 0 15%",
    },

    "& > .note": {
      flex: "1 0 15%",
    },

    "&:not(.header) > .type": {
      flex: "1 0 7%",
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      gap: "4px",
    },

    "&:last-child": {
      borderBottom: "none",
    },

    "& > div:not(:last-child)": {
      borderRight: `1px solid ${theme.colors.lightLine}`,
    },
  },

  "& > .header": {
    backgroundColor: "#FDFDFD",
  },
});
