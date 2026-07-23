import { css } from "@emotion/react";

export const foodMainPageMethodCPMainStyle = (isPc) =>
  css({
    /* 전체 푸터 */
    width: isPc ? "100%" : "90%",
    margin: isPc ? "6% 0" : "6% auto",

    "& > div:nth-of-type(1)": {
      textAlign: "center",
      marginBottom: "2rem",

      "& > h2": {
        fontSize: "2rem",
        fontWeight: 700,
      },

      "& > p": {
        fontSize: "1.1rem",
        color: "var(--food-gray-6)",
        padding: "1rem 0rem",
      },
    },

    "& > div:nth-of-type(2)": {
      width: isPc ? "75%" : "100%",
      maxWidth: "1440px",
      margin: "0 auto",
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      // isPc 값에 따라 모바일 분기 처리 (모바일일 때 gap 2rem)
      gap: isPc ? undefined : "2rem",
    },
  });

export const foodMainPageMethodCPStyle = (isPc, color = "--food-brown-light") =>
  css({
    padding: isPc ? "3rem" : "3rem 2.5rem",
    width: isPc ? "48%" : "100%",
    borderRadius: "1rem",
    backgroundColor: "var(--food-gray-0)",
    boxShadow: "0px 0px 14.7px rgba(0, 0, 0, 0.05)",

    "& > div:first-of-type": {
      width: "100%",
      textAlign: "center",

      "& > h2": {
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: "1rem",
        color: `var(${color})`,
      },

      "& > p": {
        color: "var(--food-gray-5)",
      },
    },

    /* List */
    "& > div:nth-of-type(2)": {
      gap: "2rem 0",
      margin: "3rem 0 5rem",

      "& > div": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "0 1.6rem",
        minHeight: "4rem",

        "& > div:first-of-type": {
          width: "2.5rem",
          height: "2.5rem",
          borderRadius: "50%",
          backgroundColor: `var(${color})`,
          color: "var(--food-gray-0)",
          fontWeight: 700,
          paddingBottom: "0.1rem",
        },

        "& > div:nth-of-type(2)": {
          width: "calc(100% - 2.5rem - 1.6rem)",

          "& > p:nth-of-type(1)": {
            fontSize: "1.2rem",
            paddingBottom: "0.5rem",
            fontWeight: 700,
          },

          "& > p:nth-of-type(2)": {
            color: "var(--food-gray-5)",
            fontSize: "1rem",
          },
        },
      },
    },

    "& .icon": {
      width: "6rem",
      height: "6rem",
      borderRadius: "50%",
      backgroundColor: `var(${color})`,
      margin: "0 auto 1rem",
      fontSize: "1.8rem",
      color: "var(--food-gray-0)",
    },

    "& > div:nth-of-type(3)": {
      width: "100%",
      gap: "0.5rem",
      backgroundColor: `var(${color})`,
      padding: "1rem",
      borderRadius: "0.5rem",
      color: "var(--food-gray-0)",
    },
  });
