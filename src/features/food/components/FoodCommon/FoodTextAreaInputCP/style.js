/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const foodTextAreaInputCPMainStyle = () =>
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

    "& textarea": {
      width: "100%",
      height: "3.5rem",
      padding: "1.5rem",
      border: "1px solid var(--food-gray-4)",
      borderRadius: "0.5rem",
      resize: "none" /* 드래그로 크기 변경 방지 */,
      outline: "none",
      transition: "all 0.1s ease-in-out",

      "&:focus": {
        border: "1px solid var(--food-brown-light)",
        outline: "none",
      },

      "&:disabled": {
        backgroundColor: "#f5f5f5",
        cursor: "not-allowed",
      },
    },

    "& *": {
      fontFamily: '"Noto Sans KR", sans-serif',
    },
  });
