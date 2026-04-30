import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const aboutHeroCss = css({
  ...theme.flex.center,
  width: "100%",
  height: "83vh",
  position: "relative",
  overflow: "hidden",

  borderTop: `1px solid ${theme.colors.lightLine}`,
  borderBottom: `1px solid ${theme.colors.lightLine}`,

  "& .bg": {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    zIndex: 0,
    "&::before": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundSize: "92px 92px",
      backgroundImage: `repeating-linear-gradient(0deg, rgb(221, 223, 234) 0 1px, transparent 1px 92px), repeating-linear-gradient(90deg, rgb(221, 223, 234) 0 1px, transparent 1px 92px)`,
    },

    "&::after": {
      content: '""',
      position: "absolute",
      inset: 0,
      backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 100%)",
    },
  },

  // 콘텐츠
  "& .content": {
    position: "relative",
    zIndex: 1,
    width: "80%",
    maxWidth: "1280px",
    alignItems: "center",
    ...theme.flex.rowBetween,

    [mq("mobile")]: {
      ...theme.flex.colCenter,
      alignItems: "start",
    },

    // 콘텐츠 백스
    "& .title-box": {
      ...theme.fonts.titleLg_B,
      fontWeight: "900",
      lineHeight: "1.2",
      marginBottom: "5vh",

      "& .me": {
        ...theme.fonts.titleXLg_B,
        marginLeft: "50%",
        color: theme.colors.green,
        "& span": {
          color: theme.colors.orange,
        },
      },
    },

    "& .content-box": {
      ...theme.flex.colCenter,
      gap: "26px",

      "& .title": {
        ...theme.fonts.testXLg_B,
      },

      "& .state": {
        "& p": {
          ...theme.fonts.captionLg,
          color: theme.colors.black600,
        },
        "& > div": {
          ...theme.fonts.captionXl_B,
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginLeft: "12px",
          color: theme.colors.green,
          "& > div": {
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: theme.colors.green,
          },
        },
      },

      "& .button": {
        width: "50%",
        maxWidth: "240px",
        marginTop: "12px",
      },
    },
  },
});
