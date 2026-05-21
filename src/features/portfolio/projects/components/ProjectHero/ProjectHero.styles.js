import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectHeroCss = () =>
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
        width: "25%",
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
          },
        },
      },

      "& .title-box": {
        ...theme.flex.colCenter,
        gpa: "16px",
        "& .button-box": {
          ...theme.flex.rowStart,
          gap: "12px",
        },
      },
    },
  });

export const projectInfoDomainCss = (domain) =>
  css({
    color: domain === "null" ? theme.colors.orange : theme.colors.green,
  });

export const projectInfoStatusCss = (status) =>
  css({
    color: status === "기획" ? theme.colors.black600 : status === "제작_중" ? theme.colors.orange : theme.colors.green,
  });
