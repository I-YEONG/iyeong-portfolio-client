import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const background = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  minHeight: "100%",
  backgroundColor: theme.barum.colors.bgApp,
  position: "relative",
});

export const mobileContainer = css({
  width: "390px",
  height: "844px",
  backgroundColor: theme.barum.colors.bg,
  boxShadow: "0 24px 60px rgba(53, 60, 55, .01)",
  position: "relative",
  overflowX: "hidden",
  overflowY: "auto",
  borderRadius: "44px",

  /* 스크롤바 숨김 처리 */
  "&::-webkit-scrollbar": {
    display: "none",
  },
});
