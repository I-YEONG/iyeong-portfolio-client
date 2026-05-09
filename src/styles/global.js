import { css } from "@emotion/react";

export const globalStyles = css({
  "*, *::before, *::after": {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },

  html: {
    height: "100%",
    WebkitTextSizeAdjust: "100%",
    textSizeAdjust: "100%",
  },

  body: {
    minHeight: "100%",
    fontFamily: "'Gothic A1', 'Pretendard', -apple-system, sans-serif",
    fontWeight: 400,
    color: "#333333",
    lineHeight: 1.5,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },

  a: {
    textDecoration: "none",
    color: "inherit",
  },

  "button, input, select, textarea": {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  "ul, ol": {
    listStyle: "none",
  },

  "img, picture, video, canvas, svg": {
    display: "block",
    maxWidth: "100%",
  },

  table: {
    borderCollapse: "collapse",
    borderSpacing: 0,
  },
});
