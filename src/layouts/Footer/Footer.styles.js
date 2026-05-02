import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

const lightLine = theme.colors.lightLine;
const borderLine = `1px solid ${lightLine}`;
const containerWidth = {
  width: "90%",
  maxWidth: "1280px",
};

export const footerCss = css({
  width: "100%",
  position: "relative",
  zIndex: 2,

  // 서브타이틀
  "& .sub-title": {
    width: "100%",
    borderTop: borderLine,
    borderBottom: borderLine,
    ...theme.flex.rowCenter,

    // 서브타이틀 콘텐츠
    "& > div": {
      ...theme.flex.rowBetween,
      ...theme.fonts.textMd_B,
      ...containerWidth,
      padding: "16px 32px",
      color: theme.colors.green,
      alignItems: "center",

      borderLeft: borderLine,
      borderRight: borderLine,

      [mq("mobile")]: {
        border: "none",
        ...theme.fonts.captionXl_B,
        padding: "16px 0",
      },

      // 서브타이틀 콘텐츠 가운데 줄
      "& .line": {
        width: "60%",
        height: "1px",
        backgroundColor: theme.colors.green,
      },

      "& .point": {
        color: theme.colors.orange,
      },
    },
  },

  // 푸터 콘텐츠
  "& .footer": {
    margin: "0 auto",
    ...containerWidth,
    borderLeft: borderLine,
    borderRight: borderLine,
    padding: "48px 32px",

    [mq("mobile")]: {
      border: "none",
      padding: "24px 0",
    },

    // 푸터 콘텐츠 첫 줄
    "& .row": {
      ...theme.flex.rowBetween,
      gap: "16px",
    },

    // 타이틀
    "& .title": {
      ...theme.fonts.testXLg_B,
      marginBottom: "16px",
      [mq("mobile")]: {
        ...theme.fonts.textLg_B,
      },
    },

    // 푸터 콘텐츠 두번째 줄
    "& .row-2": {
      alignItems: "end",
      "& > div:first-of-type": {
        width: "20%",
        "& > p": {
          ...theme.flex.rowBetween,

          "& .gray": {
            color: theme.colors.black600,
          },
        },
      },
      [mq("mobile")]: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        "& > div:first-of-type": {
          width: "100%",
          marginBottom: "8px",
        },
        "& > div": {
          width: "100%",
          "& > p": {
            marginBottom: "12px 0",
            ...theme.flex.rowBetween,
          },
        },
      },
    },

    // 저작권
    "& .copyrights": {
      ...theme.fonts.captionLg,
      color: theme.colors.black600,
      [mq("mobile")]: {
        width: "100%",
        textAlign: "center",
        ...theme.flex.rowCenter,
      },
    },
  },
});
