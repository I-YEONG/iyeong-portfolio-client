import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const fullCenterLayoutCss = () =>
  css({
    // 레이아웃
    width: "100%",
    minHeight: "10vh",
    position: "relative",

    ...theme.flex.colCenter,
    gap: "min(4vh, 48px)",

    // 타이틀
    "& .title-box": {
      ...theme.flex.colCenter,
      gap: "12px",
      margin: "0 auto",
      textAlign: "center",

      "& .title": {
        ...theme.fonts.titleMd_B,
        lineHeight: "1.4",
      },

      "& .sub-title": {
        ...theme.fonts.captionXl_L,
        // lineHeight: "1.4",
      },
    },

    // 콘텐츠
    "& .content": {
      width: "100%",
      margin: "0 auto",
      borderTop: `1px solid ${theme.colors.lightLine}`,
      borderBottom: `1px solid ${theme.colors.lightLine}`,

      "& .content-center": {
        width: "90%",
        margin: "0 auto",
        maxWidth: "1280px",

        borderRight: `1px solid ${theme.colors.lightLine}`,
        borderLeft: `1px solid ${theme.colors.lightLine}`,
      },

      // 반응형
      [mq("UHD")]: {
        "& .title-box .sub-title": {
          ...theme.fonts.captionXl,
        },

        borderTop: `2px solid ${theme.colors.lightLine}`,
        borderBottom: `2px solid ${theme.colors.lightLine}`,

        "& .content-center": {
          maxWidth: "1680px",
          borderRight: `2px solid ${theme.colors.lightLine}`,
          borderLeft: `2px solid ${theme.colors.lightLine}`,
        },
      },
    },
  });
