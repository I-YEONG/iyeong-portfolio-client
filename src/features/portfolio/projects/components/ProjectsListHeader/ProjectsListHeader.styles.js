import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectsListHeaderCss = css({
  ...theme.flex.rowBetween,
  width: "100%",
  margin: "0 auto",
  borderTop: `1px solid ${theme.colors.lightLine}`,
  borderBottom: `1px solid ${theme.colors.lightLine}`,
  height: "48px",

  // 중간 박스
  "& > div": {
    display: "flex",
    justifyContent: "end",
    width: "90%",
    margin: "0 auto",
    maxWidth: "1280px",
    height: "48px",
    borderRight: `1px solid ${theme.colors.lightLine}`,
    borderLeft: `1px solid ${theme.colors.lightLine}`,

    "& > div": {
      ...theme.flex.rowCenter,
      position: "relative",

      "& > div": {
        ...theme.flex.center,
        ...theme.fonts.captionLg,
        width: "68px",
        cursor: "pointer",
        borderRight: `1px solid ${theme.colors.lightLine}`,

        "&.is-active": {
          borderBottom: `2px solid ${theme.colors.green}`,
        },
      },

      "&:last-child > div": {
        borderRight: "none",
        borderLeft: `1px solid ${theme.colors.lightLine}`,
      },
    },
  },
});
