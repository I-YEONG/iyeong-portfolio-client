import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectDetailContentCss = () =>
  css({
    // 레이아웃
    width: "100%",
    height: "60vh",

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
        borderRight: `1px solid ${theme.colors.lightLine}`,
      },

      "& .title-box": {},
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
        },
      },
    },
  });
