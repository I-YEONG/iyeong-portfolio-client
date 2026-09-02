import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const barButtonStyle = (colorTheme) =>
  css({
    ...theme.barum.flex.center,
    width: "100%",
    height: "56px",
    borderRadius: "999px",
    cursor: "pointer",
    flexShrink: 0,
    transition: "all 0.2s",

    // 그린 테마
    ...(colorTheme === "green" && {
      ...theme.barum.fonts.cta,
      backgroundColor: theme.barum.colors.greenDeep,
      color: "#fff",

      "&:hover": { backgroundColor: theme.barum.colors.greenDeepHover },
    }),

    ...(colorTheme === "white" && {
      ...theme.barum.fonts.cta,
      backgroundColor: "#fff",
      color: theme.barum.colors.ink2,

      "&:hover": { backgroundColor: theme.barum.colors.surfaceMuted },
    }),

    ...(colorTheme === "none" && {
      ...theme.barum.fonts.cta,
      backgroundColor: theme.barum.colors.surfaceMuted,
      color: theme.barum.colors.ink4,
      cursor: "not-allowed",
    }),

    ...(colorTheme === "red" && {
      ...theme.barum.fonts.cta,
      backgroundColor: theme.barum.colors.warn,
      color: "#fff",

      "&:hover": { backgroundColor: theme.barum.colors.warnInk },
    }),
  });
