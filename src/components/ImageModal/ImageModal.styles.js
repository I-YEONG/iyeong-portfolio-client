import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const imageModalCss = css({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "32px",
  zIndex: 9999,
  overscrollBehavior: "contain",

  "& .dialog": {
    position: "relative",
    width: "min(1200px, 92vw)",
    maxHeight: "88vh",
    borderRadius: "16px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "48px 20px 20px",
    overscrollBehavior: "contain",
    minHeight: 0,
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.45)",
  },

  "& .image-wrap": {
    width: "100%",
    maxHeight: "70vh",
    overflow: "auto",
    flex: "1 1 auto",
    minHeight: 0,
    WebkitOverflowScrolling: "touch",
    marginTop: "8px",
  },

  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    display: "block",
    backgroundColor: theme.colors.darkBG,
    transition: "width 0.25s ease",
    cursor: "zoom-in",
    maxWidth: "100%",
  },

  "& img.is-zoomed": {
    width: "160%",
    cursor: "zoom-out",
    maxWidth: "none",
  },

  "& .close": {
    position: "absolute",
    top: "12px",
    right: "12px",
    padding: "8px 12px",
    borderRadius: "999px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    color: theme.colors.black100,
    ...theme.fonts.captionLg,
  },

  [mq("mobile")]: {
    padding: "18px",

    "& .dialog": {
      maxHeight: "82vh",
    },
  },
});
