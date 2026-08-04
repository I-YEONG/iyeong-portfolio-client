import { css } from "@emotion/react";

export const foodReviewCPMainStyle = (isPc) =>
  css({
    height: "100vh",
    position: "absolute",
    zIndex: 1000,
    top: 0,
    backgroundColor: "var(--food-gray-0)",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.05)",
    padding: "0 2rem",

    // 기존 인라인으로 작성되어 있던 반응형 스타일을 통합
    width: isPc ? "20vw" : "100vw",
    maxWidth: isPc ? "360px" : "unset",
    left: isPc ? "calc(100vw - min(20vw, 360px))" : "0",

    "& > div": {
      width: "100%",
      minHeight: "180px",
      gap: "1.6rem",

      "& > div:nth-of-type(1)": {
        textAlign: "center",
        fontSize: "2.2rem",
        fontWeight: 600,
        lineHeight: 1.3,

        "& span": {
          color: "var(--food-brown-dark)",
          display: "inline-block",
          maxWidth: "80%",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          verticalAlign: "bottom",
        },
      },
    },

    "& .starControllerIcon": {
      // 중복된 display 속성을 하나로 병합
      display: "inline-flex",
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      fontSize: "1rem",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      color: "var(--food-gray-0)",
      backgroundColor: "var(--food-brown-light)",
      transition: "all 0.05s",

      "&:hover": {
        fontSize: "1.1rem",
      },
    },

    "& .starSpan": {
      fontSize: "2rem",
      marginBottom: "8px",
      color: "#fbcf3cff",
    },

    "& .textAreaDiv": {
      marginBottom: "2rem",
    },
  });
