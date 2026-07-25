import { css } from "@emotion/react";

// =========================
// 메인 컨테이너 및 전체 레이아웃
// =========================
export const foodRegisterPageMainStyle = (isPc) =>
  css({
    width: "100%",
    minHeight: "100%",
    padding: "3rem 0",
    backgroundColor: "var(--food-main-page-bg)",

    /* 등록 버튼 영역 */
    ".axiosButton": {
      height: "3rem",
      marginTop: "2rem",
    },
    ".axiosButton > *": {
      height: "100%",
    },

    /* 입력 비활성화 스타일 */
    ".disabled-input": {
      pointerEvents: "none !important",
      opacity: 0.5,
    },

    /* 필수 표시 */
    "span.essential": {
      color: "orange",
      paddingLeft: "0.2rem",
    },

    // =========================
    // 약관 영역
    // =========================
    "form.terms > label": {
      paddingLeft: "1rem",
    },
    "form.terms > label > a": {
      color: "var(--food-brown)",
    },
    "form.terms + div > span": {
      marginTop: "5rem",
      width: "100%",
      height: "3rem",
      display: "flex",
    },

    /* 체크박스 크기 키우기 */
    'input[type="checkbox"]': {
      width: "1.4em",
      height: "1.4em",
      accentColor: "var(--food-brown-light)",
      verticalAlign: "middle",
      marginRight: "0.3em",
    },

    // =========================
    // section(폼 전체) 및 내부 구조
    // =========================
    "& > section": {
      width: isPc ? "75%" : "90%",
      maxWidth: "1440px",
      margin: "0 auto",
      padding: isPc ? "3rem 3rem" : "3rem 2rem",
      backgroundColor: "var(--food-gray-0)",
      borderRadius: "1rem",
      border: "1px solid var(--food-gray-4)",
    },

    /* 각 섹션(기본정보, 메뉴, 스케줄, 사업자 등) 구분 */
    "& > section > div": {
      marginBottom: "2rem",
    },

    /* 타이틀 */
    "& > section > div > h1": {
      fontSize: isPc ? "2.2rem" : "1.9rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
    },
    "& > section h2": {
      fontSize: "1.5rem",
      fontWeight: 600,
      marginBottom: "2rem",
      marginTop: "1rem",
    },
    "& > section > div > h1 + p": {
      fontSize: isPc ? "inherit" : "0.9rem",
    },

    // =========================
    // 에러 메시지
    // =========================
    "span.error": {
      color: "red",
      fontSize: "0.8rem",
      visibility: "hidden",
    },

    // =========================
    // 기본정보 인풋 col 스타일
    // =========================
    "& > section > div:nth-of-type(2) > .col": {
      display: isPc ? "flex" : "block",
      justifyContent: "space-between",
      gap: "1rem",
      margin: "0.7rem 0",
    },
    "& > section > div:nth-of-type(2) > .col > div": {
      width: isPc ? "49%" : "100% !important",
      marginBottom: isPc ? "0" : "1.6rem",
    },
    "& > section > div:nth-of-type(2) > .col > div > span": {
      fontSize: "0.8rem",
    },
    "& > section > div:nth-of-type(2) > .col-full": {
      width: "100%",
      margin: "1rem 0",
    },

    /* 안내사항 */
    "& > div:last-child": {
      width: "75%",
      maxWidth: "1440px",
      margin: "0 auto",
      padding: "3rem 3rem",
      backgroundColor: "var(--food-gray-0)",
      borderRadius: "1rem",
      border: "1px solid var(--food-gray-4)",
      marginTop: "3rem",
    },
    "& > div:last-child > h2": {
      fontSize: "1.5rem",
      fontWeight: 600,
      marginBottom: "1rem",
    },
    "& > div:last-child > p": {
      fontSize: "1rem",
      color: "var(--food-gray-6)",
      marginBottom: "1rem",
    },
  });

// =========================
// 메뉴 정보 스타일
// =========================
export const foodRegisterPageMenuStyle = (isPc) =>
  css({
    width: "100%",
    "& > h2 + div": {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "1rem",
      flexDirection: isPc ? "row" : "column",
      alignItems: isPc ? "inherit" : "flex-start",
    },

    ".col > div": {
      width: isPc ? "49%" : "100% !important",
      marginBottom: isPc ? "0" : "1.6rem",
    },
    ".col > div > p": {
      fontSize: "1.2rem",
      fontWeight: 600,
      marginBottom: "1.2rem",
    },
    "span.essential": {
      color: "orange",
      paddingLeft: "0.2rem",
    },
    ".menu-add > div > *": {
      marginBottom: "1rem",
    },

    ".menu-list > p + div": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: isPc ? "430px" : "200px !important",
      overflowY: "auto",
      border: "1px solid var(--food-gray-4)",
      borderRadius: "0.5rem",
      backgroundColor: "var(--food-gray-0)",
    },

    /* 메뉴 아이템 */
    ".menu-item": {
      padding: "1rem 2rem",
      borderBottom: "1px solid var(--food-gray-2)",
    },
    ".menu-item > div > p": {
      gap: "0.6rem",
    },
    ".menu-item .icon > *": {
      cursor: "pointer",
      fontSize: "1.2rem",
      color: "var(--food-gray-4)",
      transition: "all 0.2s ease-in-out",
    },
    ".menu-item .icon > *:hover": {
      color: "var(--food-brown-light)",
    },
    ".menu-item .menu-item-info": {
      fontSize: "0.9rem",
      color: "var(--food-gray-4)",
      marginTop: "0.5rem",
    },

    ".image-upload": {
      border: "1px dashed var(--food-gray-4)",
      borderRadius: "1rem",
      width: "100%",
      height: "180px",
      textAlign: "center",
    },
    ".image-upload > div > p:nth-of-type(2)": {
      fontSize: "0.8rem",
      color: "var(--food-gray-4)",
      marginBottom: "2rem",
    },
  });

// =========================
// 스케줄(운영 정보) 스타일
// =========================
export const foodRegisterPageScheduleStyle = (isPc) =>
  css({
    width: "100%",

    "& > div": {
      marginBottom: "3rem !important",
    },

    "& > div > div": {
      display: "flex",
      flexDirection: isPc ? "row" : "column",
      justifyContent: isPc ? "space-between" : "flex-start",
      alignItems: isPc ? "center" : "flex-start",
      gap: isPc ? "0" : "1rem",
      marginBottom: isPc ? "1rem" : "3vh !important",
    },

    /* 모바일 환경일 때 하위 요소 100% 꽉 채우기 */
    "& > div > div > *": {
      width: isPc ? "auto" : "100% !important",
    },

    "& label": {
      display: isPc ? "none" : "block",
    },

    /* PC 환경일 때만 적용되는 상세 레이아웃 (원본 CSS 복구) */
    ...(isPc && {
      "& > div > div > *:nth-child(1)": {
        width: "20%",
      },
      "& > div > div:nth-child(2) > *:nth-child(1) > span": {
        height: "56px",
        borderRadius: "0.5rem",
      },
      "& > div > div > *:nth-child(3), & > div > div > *:nth-child(5)": {
        width: "36%",
      },
    }),
  });
