import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const aboutCertificationsCss = css({
  // Layout
  ...theme.flex.rowBetween,
  width: "100%",
  flexWrap: "nowrap",
  position: "relative",
  marginTop: "min(4vh, 48px)",
  minHeight: "120px",

  backgroundColor: "#FDFDFD",
  borderTop: `1px solid ${theme.colors.lightLine}`,
  borderBottom: `1px solid ${theme.colors.lightLine}`,

  "& > .content-box": {
    width: "90%",
    maxWidth: "1280px",
    minHeight: "120px",
    height: "100%",
    margin: "0 auto",
    position: "relative",
    borderRight: `1px solid ${theme.colors.lightLine}`,
    borderLeft: `1px solid ${theme.colors.lightLine}`,

    "& > .loading-box": {
      position: "absolute",
      inset: 0,
      ...theme.flex.center,
    },

    // 콘텐츠
    "& > .content .items-box": {
      width: "100%",
      minHeight: "120px",
      display: "flex",
      justifyContent: "flex-start",

      [mq("mobile")]: {
        flexDirection: "column",
        "&:last-child > .item-list-box > div:last-child": {
          borderBottom: "none",
        },
      },

      "& > .item-title-box": {
        minHeight: "120px",
        height: "auto",
        flex: "1 0 33.3333%",
        borderRight: `1px solid ${theme.colors.lightLine}`,
        borderBottom: `1px solid ${theme.colors.lightLine}`,
        backgroundColor: "#fff",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "end",
        padding: "16px 22px",

        [mq("mobile")]: {
          flex: "1 0 1",
          width: "100%",
          borderRight: "none",
        },

        "& > .title": {
          ...theme.fonts.textXLg_B,
          [mq("mobile")]: {
            ...theme.fonts.textLg_B,
          },
        },
        "& > .sub-title": {
          ...theme.fonts.captionXl_L,
          color: theme.colors.black600,
        },
      },

      "& > .item-list-box": {
        minHeight: "120px",
        height: "100%",
        flex: "0 0 66.7%",
        display: "flex",
        flexWrap: "wrap",
        position: "relative",
        boxSizing: "border-box",
        "& > div:nth-of-type(even)": {
          borderRight: "none !important",
        },
        [mq("mobile")]: {
          flex: "1 0 1",
          width: "100%",
          flexDirection: "column",
        },
      },

      "&:last-child > .item-title-box": {
        borderBottom: "none",
        [mq("mobile")]: {
          borderBottom: `1px solid ${theme.colors.lightLine}`,
        },
      },
    },

    [mq("pc")]: {
      "& > .content .items-box:nth-of-type(3) > .item-list-box > div:nth-last-child(-n+2)": {
        borderBottom: "none",
      },
    },
  },
});
