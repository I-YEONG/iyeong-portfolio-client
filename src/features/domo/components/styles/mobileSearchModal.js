import { css } from "@emotion/react";

export const domoMobileSearchStyle = (isPc) =>
  css({
    // --- 배경 오버레이 ---
    ".mobile-search-overlay": {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      zIndex: 9998,
    },

    // --- 검색창 컨테이너 ---
    ".mobile-search-modal": {
      position: "fixed",
      bottom: 0,
      // PC일 때는 화면 가운데 정렬, 모바일일 때는 좌측 딱 붙임
      left: isPc ? "50%" : 0,
      width: isPc ? "400px" : "100%",
      height: isPc ? "600px" : "85%", // 미디어 쿼리 대신 모바일은 85%로 통일
      background: "white",
      borderRadius: "20px 20px 0 0",
      zIndex: 9999,
      overflowY: "auto",

      // 슬라이딩 애니메이션 (PC는 가운데 정렬 유지를 위해 -50% 적용)
      transform: isPc ? "translate(-50%, 100%)" : "translateY(100%)",
      transition: "transform 0.3s ease-out",
    },

    // --- 검색창 열림 상태 ---
    ".mobile-search-modal.open": {
      transform: isPc ? "translate(-50%, 0)" : "translateY(0)",
    },

    // --- 검색 입력 필드 컨테이너 ---
    ".search-input-container": {
      padding: isPc ? "32px 24px" : "20px",
    },

    ".search-input": {
      width: "100%",

      ".MuiInputBase-root": {
        backgroundColor: "#eff0f5",
        borderRadius: "16px",
        height: "56px",
      },
      ".MuiOutlinedInput-notchedOutline": {
        border: "none !important",
      },
      ".MuiInputBase-input": {
        fontSize: "16px",
        fontFamily: "pre-medium",
        color: "#2c2f33",
      },
    },

    // --- 검색 아이콘 ---
    ".search-icon": {
      color: "#b7bbcf",
      cursor: "pointer",
      fontSize: "24px",
    },

    // --- 검색 결과 정보 ---
    ".search-info": {
      padding: isPc ? "0 24px 16px" : "0 20px 16px",
      textAlign: "right",
      color: "#2c2f33",
      fontSize: "14px",
      fontFamily: "pre-medium",
      marginTop: "10px",
      marginBottom: "20px",
    },

    ".result-count": {
      color: "#0052e9",
      fontWeight: 600,
    },

    // --- 지역 목록 ---
    ".region-list": {
      padding: isPc ? "0 24px 24px" : "0 20px 20px",
    },

    ".region-item": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: isPc ? "20px" : "12px",
      marginBottom: isPc ? "8px" : "12px",
      border: "1px solid #eff0f5",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",

      "&:hover": {
        background: "#e9ecef",
      },
      "&:active": {
        background: "#dee2e6",
      },
    },

    ".region-name": {
      fontSize: "16px",
      color: "#6e738c",
      fontFamily: "pre-medium",
      fontWeight: 500,
    },

    ".arrow-icon": {
      color: "#b7bbcf",
      fontSize: "18px",
      fontWeight: 600,
    },

    // --- 검색 헤더 (모달 타이틀 등) ---
    ".search-header": {
      padding: isPc ? "24px" : "16px 20px",
      h3: {
        fontSize: isPc ? "24px" : "18px",
      },
    },
  });
