import { css } from "@emotion/react";

export const foodInputCPMainStyle = () =>
  css({
    width: "100%",
    display: "flex",
    flexDirection: "column",

    "& > label": {
      fontSize: "1rem",
      marginBottom: "0.5rem",

      "& > .essential": {
        color: "orange",
        paddingLeft: "0.2rem",
      },
    },

    "& input": {
      width: "100%",
      height: "3.5rem",
      padding: "0.5rem 1.5rem",
      border: "1px solid var(--food-gray-4)",
      borderRadius: "0.5rem",
      outline: "none",
      transition: "all 0.1s ease-in-out",

      "&:focus": {
        border: "1px solid var(--food-brown-light)",
        outline: "none",
      },

      "&:disabled": {
        background: "#f5f5f5",
        color: "#aaa",
        cursor: "not-allowed",
      },
    },
  });
