/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const foodSelectInputCPMainStyle = () =>
  css({
    width: "100%",
    display: "flex",
    flexDirection: "column",

    "& > label": {
      fontSize: "1.1rem",
      marginBottom: "0.5rem",

      "& > .essential": {
        color: "orange",
        paddingLeft: "0.2rem",
      },
    },

    "& .select-wrapper": {
      position: "relative",
      width: "100%",
    },

    "& select": {
      width: "100%",
      height: "3.5rem",
      padding: "0.5rem 1.5rem",
      border: "1px solid var(--food-gray-4)",
      borderRadius: "0.5rem",
      outline: "none",
      transition: "all 0.1s ease-in-out",
      background: "#fff",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      cursor: "pointer",

      "&:focus": {
        border: "1px solid var(--food-brown-light)",
        outline: "none",
      },
    },

    "& .select-icon": {
      position: "absolute",
      right: "1.5rem",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
    },
  });
