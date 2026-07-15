import { css } from "@emotion/react";

export const domoRecsInfoStyle = (isPc) =>
  css({
    // --- 공통 스타일 & 최상위 ---
    "&.recsInfoPage, .recsInfoPage": {
      position: "relative",
      zIndex: 2,
    },

    "&.recsInfoPage > .context, .recsInfoPage > .context": {
      width: "95%",
      maxWidth: "652px",
      height: "90%",
      justifyContent: "start",
      overflowY: "auto",
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: "52px 52px 0 0",
      backgroundColor: "var(--black-0)",
      zIndex: 2,
      padding: isPc ? "4%" : "52px 42px",
      paddingBottom: "32px",

      // 미디어 쿼리 대체 (PC/노트북 vs 모바일)
      gap: isPc ? "calc((100% - 46px * 4) / 7)" : "3rem",
    },

    "&.recsInfoPage > .context > div > p, .recsInfoPage > .context > div > p": {
      fontSize: "clamp(0.9rem, 1.2%, 1.2rem)",
      fontFamily: "pre-semibold",
      paddingBottom: "0.6rem",
    },

    "&.recsInfoPage > .context > div div, .recsInfoPage > .context > div div": {
      width: "100%",
      // 미디어 쿼리 대체
      height: isPc ? "46px" : "64px",
    },

    "&.recsInfoPage > .context > div > div:nth-child(2), .recsInfoPage > .context > div > div:nth-child(2)": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1.4rem",
    },

    // --- 1번째 줄 ---
    "&.recsInfoPage > .context > div:nth-child(1) > div:nth-child(2) > div:first-child, .recsInfoPage > .context > div:nth-child(1) > div:nth-child(2) > div:first-child":
      {
        borderRadius: "12px",
        width: "68%",
      },

    "&.recsInfoPage > .context > div:nth-child(1) > div:nth-child(2) > div:first-child input, .recsInfoPage > .context > div:nth-child(1) > div:nth-child(2) > div:first-child input":
      {
        fontSize: "clamp(0.85rem, 1rem, 1.5rem)",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },

    "&.recsInfoPage > .context > div:nth-child(1) > div:nth-child(2) > div:last-child, .recsInfoPage > .context > div:nth-child(1) > div:nth-child(2) > div:last-child":
      {
        backgroundColor: "var(--domo-main-color)",
        borderRadius: "12px",
        width: "30%",
        color: "var(--black-0)",
        fontFamily: "pre-semibold",
        cursor: "pointer",
      },

    // --- 2번째 줄 ---
    "&.recsInfoPage > .context > div:nth-child(2) > div:nth-child(2), .recsInfoPage > .context > div:nth-child(2) > div:nth-child(2)": {
      gap: "1rem",
    },

    "&.recsInfoPage > .context > div:nth-child(2) > div:nth-child(2) > span:nth-child(2), .recsInfoPage > .context > div:nth-child(2) > div:nth-child(2) > span:nth-child(2)":
      {
        fontSize: 0,
      },

    "&.recsInfoPage > .context > div:nth-child(2) > div:nth-child(2) > span:nth-child(2)::before, .recsInfoPage > .context > div:nth-child(2) > div:nth-child(2) > span:nth-child(2)::before":
      {
        content: '""',
        display: "inline-block",
        width: "5px",
        height: "2px",
        backgroundColor: "var(--domo-main-color)",
      },

    // --- 3번째 줄 ---
    "&.recsInfoPage > .context > div:nth-child(3) > div:nth-child(2), .recsInfoPage > .context > div:nth-child(3) > div:nth-child(2)": {
      display: "block",
      height: "unset",
    },

    "&.recsInfoPage > .context > div:nth-child(3) > div:nth-child(2) > ul:first-child, .recsInfoPage > .context > div:nth-child(3) > div:nth-child(2) > ul:first-child":
      {
        // 미디어 쿼리 대체
        marginBottom: isPc ? "0.5rem !important" : "1rem",
      },

    "&.recsInfoPage > .context > div:nth-child(3) > div:nth-child(2) > ul, .recsInfoPage > .context > div:nth-child(3) > div:nth-child(2) > ul": {
      justifyContent: "start",
      gap: "1rem",
      flexWrap: "wrap",
    },

    "&.recsInfoPage > .context > div:nth-child(3) > div:nth-child(2) > ul > li, .recsInfoPage > .context > div:nth-child(3) > div:nth-child(2) > ul > li": {
      borderRadius: "999px",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      // 미디어 쿼리 대체
      padding: isPc ? "12px 16px" : "6px 12px !important",
      fontSize: "0.85rem !important",
    },

    "&.recsInfoPage input, .recsInfoPage input": {
      fontFamily: "pre-regular !important",
    },

    // --- 우편번호 검색 모달 오버레이 ---
    ".postcode-modal-overlay": {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.3)",
      zIndex: 10000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    // --- 우편번호 검색 모달 콘텐츠 박스 ---
    ".postcode-modal-content": {
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      padding: 0,
      zIndex: 10001,
      width: isPc ? "400px" : "90%",
      height: "500px",
      overflow: "hidden",
    },
  });
