import { css } from "@emotion/react";

export const domoHomeStyle = (isPc) =>
  css({
    // --- 공통 & 컨테이너 ---
    "&.home-container, .home-container": {
      maxWidth: "1200px",
      margin: "0 auto",
    },

    ".span-domo-blue": {
      color: "#0052e9",
    },

    // --- Grid Section ---
    ".grid-section": {
      marginTop: isPc ? "60px" : "16px",
      padding: isPc ? "40px 20px" : "12px 0",
    },

    ".grid-title": {
      fontSize: isPc ? "36px" : "20px",
      fontWeight: 600,
      textAlign: "start",
      marginBottom: isPc ? "48px" : "12px",
      padding: isPc ? "0" : "0 16px",
      fontFamily: "pre-semibold",
    },

    // --- PC Grid Styles ---
    ".grid-container": {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
      padding: "0 20px",
    },

    ".grid-item": {
      overflow: "hidden",
      transition: "transform 0.3s ease",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",

      height: "auto",
      minHeight: isPc ? "402px" : "auto",
      width: isPc ? "280px" : "100%",

      "&:hover": {
        transform: "translateY(-5px)",
      },
    },

    ".grid-item-image": {
      height: isPc ? "280px" : "136px",
      width: "100%",
      borderRadius: isPc ? "20px" : "12px",
      backgroundColor: "#eff0f5",
      flexShrink: 0,
    },

    ".grid-item-info": {
      paddingTop: isPc ? "20px" : "10px",
      flex: isPc ? 1 : "initial",
      display: "flex",
      flexDirection: "column",

      h4: {
        fontSize: isPc ? "24px" : "14px",
        fontWeight: 600,
        marginBottom: isPc ? "10px" : "4px",
        fontFamily: "pre-semibold",
        color: "#2c2f33",
      },

      p: {
        fontSize: isPc ? "16px" : "12px",
        color: "#b7bbcf",
        marginBottom: isPc ? "14px" : "8px",
        fontFamily: "pre-medium",
        flex: isPc ? 1 : "initial",
        lineHeight: isPc ? 1.4 : "1.2",
      },
    },

    ".tags": {
      display: "flex",
      gap: "6px",
      marginTop: "auto",

      span: {
        padding: isPc ? "6px 12px" : "4px 6px",
        borderRadius: isPc ? "20px" : "6px",
        fontSize: isPc ? "16px" : "9px",
        fontWeight: 500,
        border: isPc ? "2px solid" : "1px solid",
        fontFamily: "pre-medium",
      },
    },

    ".tag-blue": {
      backgroundColor: "white",
      color: "#98cdff",
      borderColor: "#98cdff",
    },

    ".tag-yellow": {
      backgroundColor: "white",
      color: "#eba50c",
      borderColor: "#ffe17d",
    },

    ".load-more-button": {
      display: "block",
      margin: isPc ? "60px auto 0" : "24px auto 0",
      padding: isPc ? "32px 40px" : "18px 24px",
      fontSize: isPc ? "28px" : "14px",
      fontWeight: 600,
      background: "linear-gradient(90deg, rgba(152, 205, 255, 1) 0%, rgba(0, 82, 233, 1) 100%)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      cursor: "pointer",
      width: isPc ? "100%" : "calc(100% - 32px)",
      textAlign: "end",
      fontFamily: "pre-semibold",

      "&:hover": {
        background: "#0056b3",
      },

      a: {
        color: "white",
        fontFamily: "pre-semibold",
      },
    },

    // --- Swiper / Slider Section (모바일 & 태블릿 전용 렌더링 영역) ---
    ...(!isPc && {
      ".slider-section": {
        ".swiper-slide": {
          height: "277px",
        },
        ".slide-content h2": {
          fontSize: "28px",
        },
        ".slide-content button": {
          fontSize: "16px",
          padding: "10px 20px",
        },
      },

      ".grid-swiper": {
        width: "100%",
        paddingBottom: "16px",

        ".grid-swiper-slide": {
          height: "300px",
          width: "136px",
        },
      },
    }),
  });
