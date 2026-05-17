import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectsListCss = css({
  "& .content-box": {
    width: "100%",
    margin: "0 auto",
    borderTop: `1px solid ${theme.colors.lightLine}`,
    borderBottom: `1px solid ${theme.colors.lightLine}`,
  },

  "& .content-center": {
    width: "90%",
    margin: "0 auto",
    maxWidth: "1280px",

    borderRight: `1px solid ${theme.colors.lightLine}`,
    borderLeft: `1px solid ${theme.colors.lightLine}`,
  },

  "& .gap-box": {
    width: "100%",
    margin: "0 auto",
    borderTop: `1px solid ${theme.colors.lightLine}`,
    borderBottom: `1px solid ${theme.colors.lightLine}`,

    "& > div": {
      width: "90%",
      margin: "0 auto",
      maxWidth: "1280px",
      height: "48px",
      borderRight: `1px solid ${theme.colors.lightLine}`,
      borderLeft: `1px solid ${theme.colors.lightLine}`,
    },
  },
});
