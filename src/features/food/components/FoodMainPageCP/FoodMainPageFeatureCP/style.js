/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const foodMainPageFeatureCPMainStyle = (isPc) =>
  css({
    width: "100%",
    margin: "6% 0",
    height: "auto",
    padding: "3rem 1rem",
    backgroundColor: "var(--food-gray-0)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // isPc 값에 따라 모바일 분기 처리
    gap: isPc ? undefined : "5rem 0",
    flexDirection: isPc ? undefined : "column",

    "& > div": {
      width: isPc ? "75%" : "100%",
      maxWidth: "1440px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      textAlign: "center",
      gap: "3rem 0",
      flex: isPc ? undefined : 1,

      "& > p": {
        fontSize: "2rem",
        fontWeight: 600,
      },

      "& > div": {
        /* card section container */
        height: "auto",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        // isPc 값에 따라 모바일 분기 처리
        flexDirection: isPc ? undefined : "column",

        "& > div": {
          /* card container */
          borderRadius: "8px",
          border: "1px solid var(--food-gray-2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1.5rem",
          gap: "1rem",
          transition: "all 0.3s ease-in-out",

          "&:hover": {
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.3)",
          },

          "& p:nth-of-type(1)": {
            fontSize: "1.5rem",
            fontWeight: 550,
            color: "var(--food-brown)",
          },

          "& p:nth-of-type(2)": {
            display: "flex",
            flexWrap: "wrap",
            maxWidth: "400px",
            fontSize: "1rem",
            fontWeight: 400,
            color: "var(--food-gray-4)",
          },
        },
      },
    },

    "& .icon": {
      width: "3rem",
      height: "3rem",
      fontSize: "3rem",
      color: "var(--food-brown-light)",
    },
  });
