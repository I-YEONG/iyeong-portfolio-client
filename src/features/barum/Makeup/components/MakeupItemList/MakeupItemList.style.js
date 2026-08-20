import { theme } from "@/styles/theme";
import { css } from "@emotion/react";

export const noneDataStyle = css({
  height: "100%",
  width: "100%",
  ...theme.barum.flex.colCenter,
  alignItems: "center",
  textAlign: "center",
  gap: "36px",

  "& .icon": {
    minHeight: "160px",
    maxHeight: "160px",
    minWidth: "160px",
    maxWidth: "160px",
    backgroundColor: theme.barum.colors.greenSoft,
    borderRadius: "999px",
    ...theme.barum.flex.colCenter,
    alignItems: "center",
    gap: "8px",

    "& .bar_1": {
      width: "70px",
      backgroundColor: "#fff",
      borderRadius: "999px",
      height: "22px",
    },
    "& .bar_2": {
      width: "88px",
      backgroundColor: theme.barum.colors.green,
      borderRadius: "999px",
      height: "22px",
    },
    "& .bar_3": {
      width: "60px",
      backgroundColor: theme.barum.colors.blue,
      borderRadius: "999px",
      height: "22px",
    },
  },

  "& .title": {
    ...theme.barum.fonts.titleM,
    marginBottom: "8px",
  },

  "& .sub": {
    ...theme.barum.fonts.sub,
    color: theme.barum.colors.ink2,
  },

  "& .button-box": {
    width: "100%",
    padding: "0 18px",
  },
});
