import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const menuButtonStyle = css({
  ...theme.barum.fonts.micro,
  ...theme.barum.flex.center,
  backgroundColor: theme.barum.colors.surfaceMuted,
  cursor: "pointer",
  minWidth: "36px",
  maxWidth: "36px",
  minHeight: "36px",
  maxHeight: "36px",
  borderRadius: "20px",
});
