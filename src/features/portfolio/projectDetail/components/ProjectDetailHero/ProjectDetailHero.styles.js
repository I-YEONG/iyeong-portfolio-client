import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectDetailHeroCss = () =>
  css({
    // 레이아웃
    width: "100%",
    height: "60vh",
    borderTop: `1px solid ${theme.colors.lightLine}`,
    borderBottom: `1px solid ${theme.colors.lightLine}`,

    "& .content-center": {
      ...theme.flex.rowBetween,
      width: "90%",
      height: "100%",
      margin: "0 auto",
      maxWidth: "1280px",

      borderRight: `1px solid ${theme.colors.lightLine}`,
      borderLeft: `1px solid ${theme.colors.lightLine}`,

      "& .info-box": {
        ...theme.flex.colCenter,
        width: "20%",
        height: "100%",
        borderLeft: `1px solid ${theme.colors.lightLine}`,

        "& .data-box": {
          borderTop: `1px solid ${theme.colors.lightLine}`,

          "& > div": {
            borderBottom: `1px solid ${theme.colors.lightLine}`,
            padding: "16px",

            "& p:first-of-type": {
              ...theme.fonts.captionLg,
              color: theme.colors.black600,
              marginBottom: "4px",
            },

            "& p:last-child": {
              ...theme.fonts.textMd,
              fontWeight: "500",
            },
          },

          [mq("mobile")]: {
            "& .status-box": {
              borderBottom: "none",
            },
          },
        },
      },

      "& .title-box": {
        ...theme.flex.colCenter,
        gap: "26px",
        marginLeft: "2rem",

        "& .path": {
          ...theme.fonts.captionXl,
          fontWeight: "500",
          color: theme.colors.orange,
          letterSpacing: "0.25rem",
        },

        "& .title": {
          ...theme.fonts.titleXLg,
        },
        "& .description": {
          ...theme.fonts.textLg,
        },

        "& .button-box": {
          ...theme.flex.rowStart,
          gap: "12px",
        },
      },
    },

    [mq("mobile")]: {
      height: "fit-content",

      "& .content-center": {
        ...theme.flex.colCenter,

        "& .info-box": {
          width: "100%",
          border: "none",
          marginTop: "24px",
        },

        "& .title-box": {
          margin: "0 12px",
          padding: "42px 0",

          "& .button-box": {
            flexWrap: "wrap",
          },
        },
      },
    },
  });

export const projectDetailHeroInfoDomainCss = (domain) =>
  css({
    color: domain === "null" ? theme.colors.orange : theme.colors.green,
  });

export const projectDetailHeroInfoStatusCss = (status) =>
  css({
    ...theme.flex.rowStart,
    gap: "6px",

    color: status === "기획" ? theme.colors.black600 : status === "제작_중" ? theme.colors.orange : theme.colors.green,

    "& div": {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      backgroundColor: status === "기획" ? theme.colors.black600 : status === "제작_중" ? theme.colors.orange : theme.colors.green,
    },
  });
