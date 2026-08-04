import { css } from "@emotion/react";

export const foodReportPageMenuStyle = (isPc) =>
  css({
    width: "100%",

    "& > h2": {
      fontSize: "1.5rem",
      fontWeight: 600,
      marginBottom: "2rem",
      marginTop: "1rem",
    },

    "& > h2 + div": {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: isPc ? "row" : "column", // 미디어 쿼리 대체
      alignItems: isPc ? "stretch" : "flex-start", // 미디어 쿼리 대체
    },

    ".col > div": {
      width: isPc ? "49%" : "100%", // 미디어 쿼리 대체
      marginBottom: isPc ? "0" : "1.6rem", // 미디어 쿼리 대체
      "& > p": {
        fontSize: "1.2rem",
        fontWeight: 600,
        marginBottom: "1.2rem",
      },
    },

    "span.essential": {
      color: "orange",
      paddingLeft: "0.2rem",
    },

    ".menu-add": {
      marginBottom: isPc ? "auto" : "0", // 미디어 쿼리 대체
    },

    ".menu-add > div > *": {
      marginBottom: "1rem",
    },

    ".menu-list > p + div": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: isPc ? "430px" : "200px", // 미디어 쿼리 대체
      overflowY: "auto",
      border: "1px solid var(--food-gray-4)",
      borderRadius: "0.5rem",
      backgroundColor: "var(--food-gray-0)",
    },

    /* 메뉴 아이템 */
    ".menu-item": {
      padding: "1rem 2rem",
      borderBottom: "1px solid var(--food-gray-2)",
      "& > div > p": {
        gap: "0.6rem",
      },
      ".icon > *": {
        cursor: "pointer",
        fontSize: "1.2rem",
        color: "var(--food-gray-4)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          color: "var(--food-brown-light)",
        },
      },
      ".menu-item-info": {
        fontSize: "0.9rem",
        color: "var(--food-gray-4)",
        marginTop: "0.5rem",
      },
    },

    /* 수정모드, 등록모드 버튼 */
    ".btnMod > div span": {
      padding: "14px",
      marginBottom: 0,
    },
  });

export const foodButtonStyle = css({
  display: "flex",
  gap: "20px",
  "& > span": {
    flex: 1,
    padding: "1rem",
  },
});
