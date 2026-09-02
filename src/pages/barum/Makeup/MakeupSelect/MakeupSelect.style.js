import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const layoutStyle = css({
  "& header": { justifyContent: "start", gap: "18px", ...theme.barum.fonts.section },
});

export const makeupSelectStyle = css({
  width: "100%",
  height: "100%",
  flex: 1,

  "& .title": {
    ...theme.barum.fonts.titleL,
    marginBottom: "26px",
  },

  "& .box": {
    ...theme.barum.flex.colStart,
    cursor: "pointer",
    gap: "12px",
    width: "100%",
    padding: "24px",
    borderRadius: "30px",
    marginBottom: "12px",

    "& .title-box": {
      ...theme.barum.flex.rowStart,
      ...theme.barum.fonts.titleS,
      alignItems: "center",

      gap: "12px",
      "& .icon-box": {
        ...theme.barum.flex.center,
        backgroundColor: theme.barum.colors.veil,
        width: "48px",
        height: "48px",
        borderRadius: "14px",
      },
    },

    "& .caption": {
      ...theme.barum.fonts.sub,
      fontWeight: "300",
      opacity: "0.7",
    },

    "& .suggestion": {
      width: "100%",
      ...theme.barum.flex.rowBetween,
      ...theme.barum.fonts.nano,

      "& span": {
        fontWeight: "650",
        backgroundColor: theme.barum.colors.veil,
        borderRadius: "999px",
        padding: "4px 12px",
      },
    },
  },

  "& .green": {
    backgroundColor: theme.barum.colors.green,
    color: "#fff",
  },

  "& .white": {
    backgroundColor: "#fff",
    color: theme.barum.colors.ink1,

    "& > .title-box > .icon-box": {
      backgroundColor: theme.barum.colors.greenSoft,
      color: theme.barum.colors.greenInk,
    },
  },
});
