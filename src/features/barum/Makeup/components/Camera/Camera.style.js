import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const containerStyle = css({
  ...theme.barum.flex.center,
  position: "relative",
  width: "100%",
  height: "100%",
  backgroundColor: theme.barum.colors.cam,
  borderRadius: "24px",
  overflow: "hidden",
});

export const videoStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const badgeStyle = css({
  position: "absolute",
  top: "16px",
  left: "16px",
  backgroundColor: theme.barum.colors.scrim,
  padding: "6px 10px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  zIndex: 10,

  "& span": {
    ...theme.barum.fonts.micro,
    color: theme.barum.colors.surface,
  },
});

export const dotStyle = css({
  width: "6px",
  height: "6px",
  backgroundColor: theme.barum.colors.greenDot,
  borderRadius: "50%",
});

export const guideStyle = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "60%",

  border: `1.5px solid ${theme.barum.colors.veil}`,
  borderRadius: "36px",
  zIndex: 10,
  pointerEvents: "none",
});

export const textStyle = css({
  position: "absolute",
  bottom: "24px",
  width: "100%",
  textAlign: "center",
  ...theme.barum.fonts.caption,
  color: "#e5e5e5",
  zIndex: 10,
  textShadow: "0px 1px 3px rgba(0,0,0,0.6)",
});

export const errorWrapperStyle = css({
  ...theme.barum.flex.colCenter,
  alignItems: "center",
  width: "100%",
  height: "100%",
  minHeight: "420px",
  backgroundColor: theme.barum.colors.surfaceMuted,
  borderRadius: "24px",
  padding: "20px",
  textAlign: "center",
});

export const errorIconBoxStyle = css({
  ...theme.barum.flex.center,
  width: "80px",
  height: "80px",
  backgroundColor: theme.barum.colors.surface,
  borderRadius: "50%",
  marginBottom: "24px",
  color: theme.barum.colors.ink4,
  fontSize: "32px",
});

export const errorTitleStyle = css({
  ...theme.barum.fonts.titleS,
  color: theme.barum.colors.ink1,
  marginBottom: "12px",
});

export const errorDescStyle = css({
  ...theme.barum.fonts.sub,
  color: theme.barum.colors.ink2,
  lineHeight: "1.6",
  wordBreak: "keep-all",
});
