import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const layoutStyle = css({
  overflow: "hidden",
  "& header": {
    justifyContent: "start",
    gap: "18px",
    ...theme.barum.fonts.section,
    marginBottom: "16px",
  },
});

// 동적 상태(isUploading)를 받아 하위 선택자에 적용
export const makeupCameraStyle = css({
  width: "100%",
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  ...theme.barum.flex.colStart,
  gap: "12px",

  "& > .camera": {
    height: "60%",
    maxHeight: "430px",
    borderRadius: "30px",
  },

  "& .caption": {
    padding: "14px 18px",
    backgroundColor: "white",
    borderRadius: "20px",
    "& .title": {
      ...theme.barum.fonts.body_B,
      color: theme.barum.colors.ink2,
      marginBottom: "4px",
    },
    "& .sub": {
      color: theme.barum.colors.ink2,
      ...theme.barum.fonts.micro,
    },
  },

  "& .alias > p": {
    ...theme.barum.fonts.caption,
    color: theme.barum.colors.ink2,
  },

  "& .alias > input": {
    outline: "none",
    border: "none",
    width: "100%",
    padding: "16px 18px",
    borderRadius: "999px",
  },
});

export const shootButton = css({
  "& .button-box": {
    ...theme.barum.flex.rowBetween,
    alignItems: "center",
    gap: "24px",

    "& > .button": {
      maxWidth: "60px",
      minWidth: "60px",
      maxHeight: "60px",
      minHeight: "60px",
      borderRadius: "999px",
      padding: "3px",
      border: `4px solid ${theme.barum.colors.greenDeep}`,
      position: "relative",
      cursor: "pointer",
      ...theme.barum.flex.center,

      "& > div": {
        width: "46px",
        height: "46px",
        borderRadius: "999px",
        backgroundColor: theme.barum.colors.greenDeep,
      },
    },

    "& .text": {
      width: "100%",
      color: theme.barum.colors.ink2,
      ...theme.barum.fonts.body,
    },
  },
});

export const ocrLoadingStyle = css({
  width: "100%",
  flex: 1,
  ...theme.barum.flex.colCenter,
  alignItems: "center",
  justifyContent: "center",
  gap: "28px",

  "& .title": {
    ...theme.barum.fonts.display,
    textAlign: "center",
  },

  "& .sub": {
    ...theme.barum.fonts.caption,
    color: theme.barum.colors.ink3,
    textAlign: "center",
  },

  "& .item-box": {
    width: "100%",
  },
});
