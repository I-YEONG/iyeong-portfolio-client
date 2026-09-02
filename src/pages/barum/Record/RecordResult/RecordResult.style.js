import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const layoutStyle = css({
  "& header .left-box": {
    ...theme.barum.flex.rowStart,
    alignItems: "center",
    gap: "20px",
  },

  "& header .left-box p": {
    color: theme.barum.colors.ink1,
    ...theme.barum.fonts.section,
  },

  "& header .delete": {
    color: theme.barum.colors.warn,
    padding: "0 8px",
    cursor: "pointer",
  },
});
export const recordResultStyle = css({
  ...theme.barum.flex.colStart,
  alignItems: "start",
  gap: "20px",
});
