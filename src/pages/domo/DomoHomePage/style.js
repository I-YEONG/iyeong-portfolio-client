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
      marginTop: isPc ? "60px" : "20px",
      padding: isPc ? "40px 20px" : "16px 0",
      ...(!isPc && {
        "@media (max-width: 768px)": {
          marginTop: "16px",
          padding: "12px 0",
        },
      }),
    },

    ".grid-title": {
      fontSize: isPc ? "36px" : "22px",
      fontWeight: 600,
      textAlign: "start",
      marginBottom: isPc ? "48px" : "12px",
      fontFamily: "pre-semibold",
      ...(!isPc && {
        "@media (max-width: 768px)": {
          fontSize: "20px",
          padding: "0 16px",
        },
      }),
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

      // ✅ 1. 핵심 수정: PC에서만 402px/280px을 유지하고 모바일은 자동으로 맞춤
      height: "auto",
      minHeight: isPc ? "402px" : "auto",
      width: isPc ? "280px" : "100%",

      "&:hover": {
        transform: "translateY(-5px)",
      },
    },

    ".grid-item-image": {
      // ✅ 2. 이미지 너비를 100%로 주어 SwiperSlide(136px)에 꽉 차게 변경
      height: isPc ? "280px" : "136px",
      width: "100%",
      borderRadius: isPc ? "20px" : "12px",
      backgroundColor: "#eff0f5",
      flexShrink: 0,
      // 모바일에서 억지로 밀어내던 marginTop: "100px" 코드 삭제됨
    },

    ".grid-item-info": {
      paddingTop: isPc ? "20px" : "10px", // 모바일에서도 텍스트가 너무 붙지 않게 10px 여백
      flex: isPc ? 1 : "initial",
      display: "flex",
      flexDirection: "column",

      h4: {
        fontSize: isPc ? "24px" : "13px", // 모바일 글씨 살짝 키움
        fontWeight: 600,
        marginBottom: isPc ? "10px" : "4px",
        fontFamily: "pre-semibold",
        color: "#2c2f33",
        ...(!isPc && {
          "@media (max-width: 768px)": {
            fontSize: "14px",
          },
        }),
      },

      p: {
        fontSize: isPc ? "16px" : "11px",
        color: "#b7bbcf",
        marginBottom: isPc ? "14px" : "8px",
        fontFamily: "pre-medium",
        flex: isPc ? 1 : "initial",
        lineHeight: isPc ? 1.4 : "1.2",
        ...(!isPc && {
          "@media (max-width: 768px)": {
            fontSize: "12px",
          },
        }),
      },
    },

    ".tags": {
      display: "flex",
      gap: "6px", // 모바일에서 태그 간격 살짝 줄임
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
      margin: isPc ? "60px auto 0" : "32px auto 0",
      padding: isPc ? "32px 40px" : "20px 28px",
      fontSize: isPc ? "28px" : "16px",
      fontWeight: 600,
      background: "linear-gradient(90deg, rgba(152, 205, 255, 1) 0%, rgba(0, 82, 233, 1) 100%)",
      color: "white",
      border: "none",
      borderRadius: "16px",
      cursor: "pointer",
      width: "100%",
      textAlign: "end",
      fontFamily: "pre-semibold",

      "&:hover": {
        background: "#0056b3",
      },

      a: {
        color: "white",
        fontFamily: "pre-semibold",
      },

      ...(!isPc && {
        "@media (max-width: 768px)": {
          fontSize: "14px",
          padding: "18px 24px",
          marginTop: "24px",
          width: "calc(100% - 32px)",
        },
      }),
    },

    // --- Swiper / Slider Section (모바일 & 태블릿용) ---
    ...(!isPc && {
      ".slider-section": {
        ".swiper-slide": {
          height: "350px",
          "@media (max-width: 768px)": {
            height: "277px",
          },
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
        // ✅ 3. 레이아웃을 망가뜨리던 height: 480px, marginTop: -200px 모두 제거
        paddingBottom: "16px", // 그림자나 호버 시 짤림 방지

        ".grid-swiper-slide": {
          height: "300px",
          width: "136px", // 슬라이드 하나의 넓이 고정
        },
      },
    }),
  });
