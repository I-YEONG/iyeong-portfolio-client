import { css } from "@emotion/react";

export const projectViewCss = (isPc) =>
  css({
    width: "100%",
    height: "100%",
    backgroundColor: "#282828",
    borderLeft: "1px solid #3d3e3e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    overflow: "auto",

    ".project-view": {
      width: isPc ? "100%" : "min(94%, 420px)",
      height: isPc ? "100%" : "auto",
      aspectRatio: isPc ? "auto" : "9 / 19.5",
      maxHeight: isPc ? "none" : "94%",
      borderRadius: isPc ? "0" : "12px",
      boxShadow: isPc ? "none" : "0 18px 45px rgba(0, 0, 0, 0.35)",
      overflow: "hidden",
    },
  });
