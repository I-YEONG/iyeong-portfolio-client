import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectsListCss = css({
  "& .content-box": {
    width: "100%",
    margin: "0 auto",
    // borderTop: `1px solid ${theme.colors.lightLine}`,
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

    "& > div": {
      width: "90%",
      margin: "0 auto",
      maxWidth: "1280px",
      height: "48px",
      borderRight: `1px solid ${theme.colors.lightLine}`,
      borderLeft: `1px solid ${theme.colors.lightLine}`,
    },
  },

  "& .loading-box": {
    width: "100%",
    height: "100vh",
  },

  "& .project-row": {
    display: "flex",
    gap: "24px",
    padding: "24px",

    [mq("mobile")]: {
      flexDirection: "column",
      padding: "20px 16px",
    },
  },

  "& .project-card": {
    flex: 1,
    padding: "16px",
    borderRight: `1px solid ${theme.colors.lightLine}`,

    "&:last-of-type": {
      borderRight: "none",
    },
  },

  "& .project-title": {
    ...theme.fonts.textMd_B,
  },

  "& .project-subtitle": {
    marginTop: "6px",
    ...theme.fonts.captionLg,
    color: theme.colors.black600,
  },
});
