import { css } from "@emotion/react";

export const foodFTListMainStyle = () =>
  css({
    padding: "1.6rem 0",
    paddingRight: "12px",
    borderBottom: "1px solid var(--gray-2)",
    cursor: "pointer",

    "& > p:nth-of-type(1)": {
      marginBottom: "0.5rem",

      "& > span:nth-of-type(1)": {
        padding: "0.4rem 0",
        fontWeight: 600,
        fontSize: "1.2rem",
      },

      "& > span:nth-of-type(2)": {
        display: "inline-block",
        width: "56px",
        fontSize: "0.75rem",
        padding: "0.3rem 0",
        lineHeight: 1.6,
        textAlign: "center",
        color: "var(--gray-0)",
        borderRadius: "16px",
      },
    },

    "& > p:nth-of-type(2)": {
      color: "var(--gray-5)",
      fontSize: "0.75rem",
      lineHeight: 1.5,
    },

    "& > p:nth-of-type(3)": {
      color: "var(--gray-5)",
      fontSize: "0.75rem",
      marginTop: "1rem",
    },

    "& > p:nth-of-type(4)": {
      color: "var(--gray-5)",
      fontSize: "0.75rem",
      marginTop: "0.5rem",
    },

    "& .icon": {
      paddingRight: "0.5rem",
      color: "orange",
    },
  });
