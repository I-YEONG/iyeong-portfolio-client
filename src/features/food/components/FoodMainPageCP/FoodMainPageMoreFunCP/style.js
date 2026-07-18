import { css } from "@emotion/react";

export const foodMainPageMoreFunCPMainStyle = (isPc) =>
  css({
    width: isPc ? "65vw" : "90vw",
    maxWidth: "1240px",
    margin: "6vh auto",
    padding: isPc ? "4rem 6rem" : "4rem 0",
    backgroundColor: "var(--gray-0)",
    borderRadius: "1rem",
    boxShadow: "0px 0px 14.7px rgba(0, 0, 0, 0.05)",
    flexWrap: "wrap",
    position: "relative",
    // 모바일 뷰어 분기 처리
    gap: isPc ? undefined : "5rem 0",
    flexDirection: isPc ? undefined : "column",

    "& > div": {
      height: "100%",
      flex: isPc ? 0.3 : 1,
      width: isPc ? undefined : "100%",
      textAlign: "center",
      gap: "1rem 0",

      "& > div": {
        width: "6rem",
        height: "6rem",
        borderRadius: "50%",
        backgroundColor: "var(--brown-light)",
        margin: "0 auto",
      },

      "& > p:nth-of-type(1)": {
        fontSize: "1rem",
        fontWeight: 600,
        marginBottom: "-5px",
      },

      "& > p:nth-of-type(2)": {
        fontSize: "14px",
        color: "var(--gray-5)",
        lineHeight: 1.5,
      },
    },

    "& .icon": {
      fontSize: "1.8rem",
      color: "var(--gray-0)",
    },
  });
