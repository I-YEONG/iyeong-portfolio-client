import { css, keyframes } from "@emotion/react";
import IMAGE_A from "@/assets/domo/recsMap.png";
import IMAGE_B from "@/assets/domo/recsBackground.svg";

// --- 배경 움직이는 원 애니메이션 (Keyframes) ---
const moveCircle = keyframes`
  0% {
    left: 10%;
    bottom: -25%;
  }
  50% {
    left: 50%;
    bottom: -10%;
  }
  100% {
    left: 10%;
    bottom: -25%;
  }
`;

export const domoRecsPageStyle = (isPc) =>
  css({
    // --- 최상위 컨테이너 ---
    "&.recsPage, .recsPage": {
      width: "100%",
      height: "calc(100% - 64px)",
      position: "relative",
      zIndex: 0,

      // 모바일 미디어 쿼리 대체
      padding: isPc ? "5% 20%" : "2rem",

      marginTop: "64px",
      backgroundImage: `url(${IMAGE_B})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",

      // 헤더/푸터 레이아웃 제어 (기존 인접 형제 선택자)
      "& + footer": {
        display: "none",
      },
      "& + header": {
        position: "relative",
        backgroundColor: "var(--black-0)",
        zIndex: "unset !important",
      },
    },

    // --- 메인 콘텐츠 박스 ---
    ".content": {
      position: "relative",
      width: "100%",
      height: "100%",
      background: "radial-gradient(71.06% 98.68% at 50% 51.84%, #ffffff 0%, rgba(255, 255, 255, 0.2) 100%)",
      borderRadius: "30px",
      zIndex: 2,

      // 모바일 미디어 쿼리 대체
      padding: isPc ? "0 5%" : "0 1rem",
      gap: isPc ? "initial" : "clamp(0.7rem, 1rem, 1.4rem)", // 모바일에서만 gap 적용

      "> div": {
        width: "100%",
        height: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },

      h2: {
        marginBottom: "32px",
        fontWeight: "600",

        // 모바일 미디어 쿼리 대체
        fontSize: isPc ? "clamp(2.25rem, 4%, 2.25rem)" : "clamp(1.65rem, 6%, 2.25rem)",
        lineHeight: isPc ? "100%" : "1.5",
      },

      p: {
        fontFamily: "pre-regular",

        // 모바일 미디어 쿼리 대체
        fontSize: isPc ? "90%" : "clamp(0.7rem, 0.9rem, 1.2rem)",
        lineHeight: isPc ? "27px" : "1.5",

        ".point": {
          color: "var(--domo-main-color)",
          position: "relative",

          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: "-0.25rem", // 글자 위로 조정
            left: "50%",
            transform: "translateX(-50%)",
            width: "3px",
            height: "3px",
            background: "var(--domo-main-color)", // 점 색상
            borderRadius: "50%",
          },
        },
      },

      ".image": {
        width: "100%",
        height: "30%",
        backgroundImage: `url(${IMAGE_A})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      },

      ".button": {
        width: "100%",
        maxWidth: "360px",
        minHeight: "60px",

        // 모바일 미디어 쿼리 대체
        fontSize: isPc ? "clamp(0.7rem, 0.9rem, 1.2rem)" : "0.9rem",
      },
    },

    // --- 배경 장식 원형 오브젝트들 ---
    ".recsPage_circle1": {
      position: "absolute",
      zIndex: 0,
      width: "40%",
      height: "40%",
      left: "-20%",
      top: "-20%",
      background: "var(--domo-point-color-1)",
      filter: "blur(200px)",
    },

    ".recsPage_circle2": {
      position: "absolute",
      zIndex: 0,
      width: "45%",
      height: "45%",
      right: "-22%",
      bottom: "-22%",
      background: "rgba(255, 255, 255, 0.5)",
      filter: "blur(200px)",
    },

    ".recsPage_circle_move": {
      zIndex: 0,
      position: "absolute",
      width: "50%",
      height: "50%",
      background: "rgba(255, 247, 221, 0.8)",
      filter: "blur(200px)",
      animation: `${moveCircle} 20s linear infinite alternate`,
    },

    // --- 다음 버튼 위치 ---
    ".NextButton": {
      position: "absolute",
      zIndex: 1000,
      height: "4.65rem",
      fontSize: "1rem",

      // 모바일 미디어 쿼리 대체
      left: isPc ? "50%" : "calc(1rem + 48px)",
      bottom: isPc ? "15%" : "27%",
      transform: isPc ? "translateX(-50%)" : "translateX(0)",
      width: isPc ? "23.5rem" : "calc(100% - 2rem - (48px * 2))",
    },

    // --- 모달 전용 스타일 (recsPage 하위에 렌더링될 때) ---
    ".modal_background": {
      paddingBottom: "100px",

      "> div": {
        width: "608px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "pre-semibold",

        "> div:nth-of-type(1)": {
          marginBottom: "4.875rem",
          // 모바일 미디어 쿼리 대체
          fontSize: isPc ? "1.75rem" : "1.35rem !important",
          lineHeight: isPc ? "normal" : "1.75rem",
        },

        "> div:nth-of-type(2)": {
          fontSize: "16px",
          borderRadius: "12px",
          width: "100%",
          padding: "13px 16px",
          backgroundColor: "var(--black-1)",
          color: "var(--black-4)",

          "> div": {
            marginRight: "20px",
            width: "2.25rem",
            minWidth: "2.25rem",
            height: "2.25rem",
            minHeight: "2.25rem",
            cursor: "pointer",
            borderRadius: "8px",
            backgroundColor: "var(--black-0)",
          },
        },
      },

      ".checked": {
        color: "var(--black-4)",
        fontWeight: 700,
      },

      ".none > *": {
        display: "none",
      },
    },
  });
