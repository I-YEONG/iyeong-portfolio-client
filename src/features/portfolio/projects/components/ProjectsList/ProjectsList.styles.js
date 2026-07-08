import { css, keyframes } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

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

  "& .project-row": {
    display: "flex",

    [mq("mobile")]: {
      flexDirection: "column",
    },
  },

  "& .skeleton-block, & .skeleton-line": {
    backgroundImage: `linear-gradient(90deg, ${theme.colors.lightLine} 0%, ${theme.colors.black100} 50%, ${theme.colors.lightLine} 100%)`,
    backgroundSize: "200% 100%",
    animation: `${shimmer} 1.2s ease-in-out infinite`,
    borderRadius: "6px",
  },

  "& .projects-banner-skeleton": {
    ...theme.flex.rowBetween,
    width: "100%",
    minHeight: "460px",
    padding: "24px",
    gap: "24px",

    [mq("mobile")]: {
      flexDirection: "column",
    },

    "& .banner-content": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },

    "& .banner-image": {
      flex: 1,
      width: "100%",
      minHeight: "260px",
    },
  },

  "& .projects-box-skeleton": {
    width: "100%",
    minHeight: "320px",
    flex: "1 1 0",
    borderRight: `1px solid ${theme.colors.lightLine}`,

    "&:last-of-type": {
      borderRight: "none",
    },

    [mq("mobile")]: {
      borderRight: "none",
    },

    "& .box-image": {
      width: "100%",
      aspectRatio: "16/9",
      borderBottom: `1px solid ${theme.colors.lightLine}`,
    },

    "& .box-content": {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "24px 26px",
    },
  },

  "& .skeleton-line": {
    height: "14px",
  },

  "& .line-short": {
    width: "35%",
  },

  "& .line-mid": {
    width: "65%",
  },

  "& .line-wide": {
    width: "85%",
  },
});
