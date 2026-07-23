/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export const foodMainPageBottomBannerCPMainStyle = () =>
  css({
    height: "264px",
    width: "100%",
    backgroundColor: "var(--food-brown-light)",
    color: "var(--food-gray-0)",

    "& > div": {
      width: "340px",
      height: "150px",
      textAlign: "center",

      "& > div": {
        justifyContent: "center",
        gap: "0 1rem",
      },

      "& > h2": {
        fontSize: "1.5rem",
        fontWeight: 700,
      },

      "& > p": {
        fontSize: "1rem",
      },
    },
  });
