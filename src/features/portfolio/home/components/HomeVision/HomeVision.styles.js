import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const homeVisionCss = () =>
  css({
    // 레이아웃
    width: "100%",
    minHeight: "10vh",
    position: "relative",

    ...theme.flex.colCenter,
    gap: "min(4vh, 48px)",

    "& .not-mobile": {
      [mq("mobile")]: {
        display: "none",
      },
    },

    // 콘텐츠
    "& .content": {
      width: "100%",
      display: "flex",
      flexWrap: "nowrap",

      borderTop: `1px solid ${theme.colors.lightLine}`,
      borderBottom: `1px solid ${theme.colors.lightLine}`,

      // 반응형
      [mq("mobile")]: {
        flexDirection: "column",
      },

      "& > div": {
        ...theme.flex.colBetween,
        flex: 1,
        padding: "32px 38px",
        gap: "8px 0",

        [mq("mobile")]: {
          borderBottom: `1px solid ${theme.colors.lightLine}`,
        },
        [mq("pc")]: {
          borderRight: `1px solid ${theme.colors.lightLine}`,
        },

        "& .title-box": {
          ...theme.fonts.testXLg_B,
          display: "flex",
          gap: "16px",
          alignItems: "center",
          color: theme.colors.black900,
        },

        "& .sub-title": {
          ...theme.fonts.textMd,
          color: theme.colors.black800,
        },

        "& .caption": {
          ...theme.fonts.captionXl_L,
          color: theme.colors.black600,
        },
      },
      "& > div:last-child": {
        borderRight: "none",
        borderBottom: "none",
      },
    },
  });
