import { css } from "@emotion/react";

export const domoFilterStyle = (isPc) =>
  css({
    // --- 전체 컨테이너 ---
    // 모바일에서는 부모를 숨기지 않고 껍데기만 남겨 플로팅 버튼이 보이도록 수정
    display: isPc ? "flex" : "block",
    justifyContent: isPc ? "space-between" : "initial",
    alignItems: isPc ? "center" : "initial",
    gap: isPc ? "20px" : "initial",
    padding: isPc ? "26px" : "0",
    borderRadius: isPc ? "15px" : "0",
    backgroundColor: isPc ? "#eff0f5" : "transparent",
    marginBottom: isPc ? "40px" : "0",
    width: isPc ? "1200px" : "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    marginLeft: "auto",
    marginRight: "auto",

    // 모바일일 때 필요 없는 내부 요소 숨김 처리
    ...(!isPc && {
      ".region-filter, .sort-select, .search-btn": {
        display: "none",
      },
    }),

    // --- 좌측 필터 영역 ---
    ".filter-left": {
      display: isPc ? "flex" : "block",
      alignItems: "center",
      gap: "15px",
    },

    // --- 지역 찾기 버튼 ---
    ".region-search-btn": isPc
      ? {
          color: "#0052e9",
          fontWeight: 600,
          fontSize: "24px",
          paddingLeft: "16px",
          background: "none",
          border: "none",
          boxShadow: "none",
          fontFamily: "pre-semibold",
        }
      : {
          display: "block",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
          background: "#0052e9",
          color: "white",
          borderRadius: "50px",
          padding: "16px 24px",
          boxShadow: "0 4px 12px rgba(0, 82, 233, 0.3)",
          fontSize: "16px",
          fontWeight: 600,
          fontFamily: "pre-semibold",
          border: "none",
          cursor: "pointer",
        },

    // --- MUI 인풋 오버라이드 ---
    ".MuiInputBase-root": {
      backgroundColor: "#fff",
      borderRadius: "20px",
      border: "none",
      width: "370px",
      height: "72px",
    },

    ".MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },

    ".filter-search-input": {
      width: "300px",
      fontFamily: "pre-semibold",
      paddingLeft: "10px",
    },

    ".MuiInputBase-input": {
      padding: "12px 15px !important",
      fontFamily: "pre-semibold",
      color: "#6e738c",
    },

    // --- 정렬 Select ---
    ".sort-select": {
      color: "#b7bbcf",
      width: "186px",
      height: "72px",
      marginLeft: "72px",

      ".MuiSvgIcon-root": {
        color: "#888",
      },
    },

    // --- 검색 버튼 ---
    ".search-btn": {
      backgroundColor: "#0052e9",
      borderRadius: "20px",
      boxShadow: "none",
      fontWeight: 600,
      fontFamily: "pre-semibold",
      fontSize: "24px",
      width: "168px",
      height: "72px",
    },

    // --- 커스텀 드롭다운 (지역 선택) ---
    ".region-filter": {
      position: "relative",
    },

    ".region-dropdown": {
      position: "absolute",
      top: "120%",
      left: "4%",
      backgroundColor: "white",
      borderRadius: "10px",
      zIndex: 100,
      width: "370px",
      maxHeight: "300px",
      overflowY: "auto",
      padding: "10px",
      boxSizing: "border-box",

      // 커스텀 스크롤바
      "&::-webkit-scrollbar": {
        width: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#ccc",
        borderRadius: "10px",

        "&:hover": {
          background: "#aaa",
        },
      },

      ul: {
        listStyle: "none",
        padding: 0,
        margin: 0,
      },

      li: {
        fontFamily: "pre-semibold",
        padding: "16px 15px",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background-color 0.2s",
        color: "#6e738c",

        "&:hover": {
          backgroundColor: "#eff0f5",
        },
      },
    },

    ".dropdown-header": {
      display: "flex",
      alignItems: "center",
      padding: "10px 15px",
      borderBottom: "1px solid #eee",
      marginBottom: "5px",

      button: {
        background: "none",
        border: "none",
        fontSize: "20px",
        cursor: "pointer",
        marginRight: "10px",
      },

      span: {
        fontFamily: "pre-semibold",
        fontWeight: 200,
      },
    },
  });
