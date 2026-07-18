import { css } from "@emotion/react";

export const foodMainPageTitleCPMainStyle = (isPc) =>
  css({
    width: isPc ? "75vw" : "90vw",
    maxWidth: "1440px",
    margin: "6vh auto",
    padding: isPc ? "4rem 6rem" : "4rem 0",
    borderRadius: "1rem",
    flexWrap: "wrap",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    // 모바일 뷰어 분기 처리
    gap: isPc ? undefined : "5rem 0",
    flexDirection: isPc ? undefined : "column",

    "& > div": {
      flex: isPc ? undefined : 1,
      width: isPc ? undefined : "100%",
      textAlign: isPc ? undefined : "center",

      "& > p:nth-of-type(1)": {
        fontSize: isPc ? "3rem" : "2.5rem",
        fontWeight: 700,
        textAlign: "center",
        lineHeight: "50px",
      },

      "& > p:nth-of-type(2)": {
        fontSize: isPc ? "1.3rem" : "1.2rem",
        fontWeight: 300,
        color: "var(--gray-5)",
        textAlign: "center",
        lineHeight: "29px",
        margin: "1.3rem 0",
      },

      "& > p > span.highlight": {
        color: "var(--brown-light)",
      },

      "& > div": {
        gap: "1rem",
        fontSize: "1rem",

        // 기존 span 선택자를 실제 DOM 구조에 맞게 a 태그 하위 자식으로 변경
        "& > a:nth-of-type(1) > *": {
          width: "160px",
          transition: ".3s",

          "&:hover": {
            backgroundColor: "var(--brown)",
            cursor: "pointer",
            transition: ".3s",
          },
        },

        "& > a:nth-of-type(2) > *": {
          width: "200px",
          transition: ".3s",

          "&:hover": {
            backgroundColor: "var(--gray-3)",
            cursor: "pointer",
            transition: ".3s",
          },
        },
      },
    },
  });
