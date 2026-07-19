import { css } from "@emotion/react";

export const foodMyPageInfoCPStyle = (isPc) =>
  css({
    width: "100%",
    height: "100%",
    padding: isPc ? "4rem 8rem" : "6rem 2rem",
    overflowY: "scroll",
    zIndex: 996,

    ".error": {
      fontSize: "0.7rem",
      color: "var(--food-red)",
    },

    "& > h2": {
      fontSize: "2.2rem",
      fontWeight: 700,
      marginBottom: "2rem",
    },

    "& > div": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexWrap: "nowrap",
      gap: "3rem",
      width: "100%",
    },
  });
