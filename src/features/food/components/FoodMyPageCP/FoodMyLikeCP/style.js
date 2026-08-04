import { css } from "@emotion/react";

export const foodMyLikeCPStyle = (isPc) =>
  css({
    width: "100%",
    height: "100%",
    padding: isPc ? "4rem 8rem" : "6rem 2rem",
    overflowY: "scroll",
    zIndex: 996,

    h2: {
      fontSize: "2.2rem",
      fontWeight: 700,
      marginBottom: "2rem",
    },

    ".ftListIndexLi": {
      display: "flex",
      flexDirection: "column",
      marginBottom: "3rem",
      padding: isPc ? "1rem 3rem" : "0rem 1.5rem", // 미디어 쿼리 대체
      borderRadius: "30px",
      border: "1px solid var(--food-gray-3)",

      ".ftScheduleDiv": {
        width: "100%",
        ".schedule": {
          width: "100%",
          fontSize: "0.7rem",
          color: "var(--food-gray-5)",
          borderTop: "1px solid var(--food-gray-2)",
          fontFamily: '"Noto Sans KR", sans-serif',
          paddingBottom: "2rem",

          li: {
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem 0",
            borderBottom: "1px solid var(--food-gray-2)",
            color: "var(--food-gray-4)",
            gap: "1rem",

            "span:nth-of-type(1)": {
              fontWeight: 600,
              flex: 0.15,
              textAlign: "center",
            },
            "span:nth-of-type(2), span:nth-of-type(3)": {
              flex: 0.2,
              textAlign: "center",
            },
            "span:nth-of-type(4)": {
              flex: isPc ? "1 1 0%" : 1, // 미디어 쿼리 대체
              maxWidth: "100%",
              textAlign: "center",
            },
          },
        },
      },

      ".ftListIndex": {
        padding: "2rem 0",
        borderBottom: "1px solid var(--food-gray-2)",
        width: "100%",

        "p:nth-of-type(1)": {
          marginBottom: "0.5rem",

          "span:nth-of-type(1)": {
            padding: "0.4rem 0",
            fontWeight: 600,
            fontSize: "1.2rem",
          },
          "span:nth-of-type(2)": {
            display: "inline-block",
            width: "56px",
            fontSize: "0.75rem",
            padding: "0.3rem 0",
            lineHeight: 1.6,
            textAlign: "center",
            color: "var(--food-gray-0)",
            borderRadius: "16px",
          },
        },
        "p:nth-of-type(2)": {
          color: "var(--food-gray-5)",
          fontSize: "0.75rem",
          lineHeight: 1.5,
        },
        "p:nth-of-type(3)": {
          color: "var(--food-gray-5)",
          fontSize: "0.75rem",
          marginTop: "1rem",
        },
        "p:nth-of-type(4)": {
          color: "var(--food-gray-5)",
          fontSize: "0.75rem",
          marginTop: "0.5rem",
        },
        ".icon": {
          paddingRight: "0.5rem",
          color: "orange",
        },
      },
    },
  });
