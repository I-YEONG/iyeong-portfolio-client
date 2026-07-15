import { css } from "@emotion/react";

export const domoBenefixStyle = (isMobile) =>
  css({
    // --- 전체 컨테이너 ---
    "&.benefix-container, .benefix-container": {
      width: "100%",
      maxWidth: "1200px",
      margin: "40px auto",
      padding: "0 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    // --- 타이틀 영역 ---
    ".benefix-title-row": {
      display: "flex",
      alignItems: isMobile ? "baseline" : "center",
      justifyContent: "space-between",
      gap: "12px",

      ".benefix-title": {
        marginBottom: isMobile ? 0 : undefined,
        fontSize: isMobile ? "20px" : undefined,
        flex: isMobile ? 1 : undefined,
      },
    },

    ".benefix-title": {
      marginTop: isMobile ? "16px" : "60px",
      fontSize: isMobile ? "20px" : "36px",
      fontWeight: 600,
      marginBottom: isMobile ? "20px" : "30px",
      color: "#2c2f33",
      fontFamily: "pre-semibold",
      textAlign: "start",

      ".span-domo-blue": {
        color: "#0052e9",
      },
    },

    // --- 혜택 목록 스타일 ---
    ".benefits-list": {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "12px" : "24px",
      marginTop: isMobile ? "10px" : "24px",
    },

    ".benefit-card": {
      height: isMobile ? "auto" : "124px",
      border: "1px solid #dddfe9",
      background: "white",
      borderRadius: isMobile ? "8px" : "20px",
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "12px" : "18px",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      padding: isMobile ? "12px 4px" : "",

      "&:hover": {
        transform: "translateY(-5px)",
      },
    },

    // --- 태그 영역 ---
    ".card-tags": {
      display: "flex",
      gap: isMobile ? "6px" : "14px",
      flexShrink: 0,
      marginLeft: isMobile ? "16px" : "32px",
    },

    ".tag-blue, .tag-yellow": {
      padding: isMobile ? "4px 6px" : "6px 8px",
      borderRadius: isMobile ? "12px" : "20px",
      fontSize: isMobile ? "12px" : "16px",
      fontWeight: 500,
      fontFamily: "pre-medium",
    },

    ".tag-blue": {
      border: "1px solid #0052e9",
      color: "#0052e9",
    },

    ".tag-yellow": {
      border: "1px solid #ffe17d",
      color: "#eba50c",
    },

    ".card-title": {
      fontFamily: "pre-semibold",
      fontSize: isMobile ? "14px" : "24px",
      color: "#2c2f33",
      fontWeight: 600,
      margin: "0 auto",
      flex: 1,
    },

    // --- 모바일 전용 더보기 버튼 ---
    ...(isMobile && {
      ".m-more-button": {
        marginTop: "20px",
        width: "100%", // 모바일 환경에서 353px 고정보다는 100%가 더 안정적일 수 있어 변경을 권장하지만, 기존 353px을 유지하려면 "353px"로 수정하세요.
        maxWidth: "353px",
        display: "block",
        margin: "20px auto 0", // 가운데 정렬을 위해 추가
        height: "64px",
        borderRadius: "12px",
        backgroundColor: "#eff0f5",
        color: "#b7bbcf",
        fontSize: "24px",
        fontFamily: "pre-semibold",
        border: "none",
        cursor: "pointer",
      },
    }),
  });
