import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const aboutTechnicalItemBoxCss = (color, pagination) =>
  css({
    ...theme.flex.colBetween,
    width: "100%",
    height: "100%",
    borderRight: `1px solid ${theme.colors.lightLine}`,

    "& > .title-box": {
      ...theme.flex.rowBetween,
      fontWeight: "600",
      width: "100%",
      borderBottom: `1px solid ${theme.colors.lightLine}`,
      padding: "16px 22px 14px 22px",

      "& .color-bar": {
        width: "3px",
        height: "100%",
        backgroundColor: `${color}90`,
      },
    },

    // data-list-box
    "& .data-list-box": {
      height: "100%",
      width: "100%",
      display: `${pagination ? "flex" : "unset"}`,
      flexWrap: "wrap",
      alignContent: "flex-start",

      overflowY: "auto",

      "& > div": {
        ...theme.flex.colCenter,
        width: pagination ? "33.333%" : "100%",
        flex: pagination ? "0 0 33.333%" : "0 0 100%",
        borderRight: pagination ? `1px solid ${theme.colors.lightLine}` : "none",
        borderBottom: `1px solid ${theme.colors.lightLine}`,
        height: "calc(100% / 5)",
        padding: "0 22px",
        position: "relative",

        [mq("mobile")]: {
          width: "100%",
          flex: "0 0 100%",
          borderRight: "none",
        },
      },

      "& .item-title-box": {
        ...theme.flex.rowBetween,
        ...theme.fonts.captionXl,
        "& div:last-of-type": {
          ...theme.flex.center,
          ...theme.fonts.captionMd_B,
          lineHeight: 0,
          padding: "2px 6px",
          borderRadius: "4px",
        },
      },
    },
  });

export const aboutTechnicalItemCss = (proficiency, expertise) =>
  css({
    width: `calc(${proficiency}% - 44px)`,
    height: "2px",
    position: "absolute",
    bottom: -1,
    backgroundColor: expertise === "core" ? theme.colors.green : expertise === "expert" ? theme.colors.orange : `${theme.colors.black400}`,
  });
