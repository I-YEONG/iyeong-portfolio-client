import { css } from "@emotion/react";

export const foodMyFTCPMainStyle = (isPc) =>
  css({
    width: "100%",
    height: "100%",
    padding: isPc ? "4rem 8rem" : "6rem 2rem",
    overflowY: "scroll",
    zIndex: 996,

    ".image-upload": {
      padding: "2rem 0",
      border: "1px solid var(--food-gray-3)",
      borderRadius: "1rem",
    },

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
    "& span.essential": {
      color: "orange",
      paddingLeft: "0.2rem",
    },

    // =========================
    // 약관 영역
    // =========================
    "& form.terms > label": {
      paddingLeft: "1rem",
    },
    "& form.terms > label > a": {
      color: "var(--food-brown)",
    },
    "& form.terms + div > span": {
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
      width: "100%",
    },

    /* 각 섹션(기본정보, 메뉴, 스케줄, 사업자 등) 구분 */
    "& > section > div": {
      marginBottom: "2rem",
    },

    /* 타이틀 */
    "& > section > div > h1": {
      fontSize: isPc ? "2.2rem" : "1.9rem", // isPc 삼항연산자 적용
      fontWeight: 700,
      marginBottom: "0.5rem",
    },
    "& > section > div > h1 + p": {
      fontSize: isPc ? "1rem" : "0.9rem",
    },
    "& > section h2": {
      fontSize: "1.5rem",
      fontWeight: 600,
      marginBottom: "2rem",
      marginTop: "1rem",
    },

    // =========================
    // 에러 메시지
    // =========================
    "& span.error": {
      color: "red",
      fontSize: "0.8rem",
      visibility: "hidden",
    },

    // =========================
    // 기본정보 인풋 col 스타일 (미디어쿼리 대체)
    // =========================
    "& > section > div:nth-child(2) > .col": {
      display: isPc ? "flex" : "block", // isPc 삼항연산자 적용
      justifyContent: isPc ? "space-between" : "initial",
      gap: isPc ? "1rem" : "initial",
      margin: isPc ? "0.7rem 0" : "initial",
    },
    "& > section > div:nth-child(2) > .col > div": {
      width: isPc ? "49%" : "100% !important", // isPc 삼항연산자 적용
      marginBottom: isPc ? "0" : "1.6rem",
    },
    "& > section > div:nth-child(2) > .col > div > span": {
      fontSize: "0.8rem",
    },
    "& > section > div:nth-child(2) > .col-full": {
      width: "100%",
      margin: "1rem 0",
    },

    /* 안내사항 */
    "& > div:last-child": {
      borderTop: "1px solid var(--food-gray-4)",
      paddingTop: "3rem",
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

export const foodMyFTCPMenuStyle = (isPc) =>
  css({
    width: "100%",
    "& > h2 + div": {
      display: "flex",
      justifyContent: isPc ? "space-between" : "initial",
      flexDirection: isPc ? "row" : "column",
      alignItems: isPc ? "initial" : "flex-start",
      marginBottom: "1rem",
    },
    "& .col > div": {
      width: isPc ? "49%" : "100% !important",
      marginBottom: isPc ? "0" : "1.6rem",
    },
    "& .col > div > p": {
      fontSize: "1.2rem",
      fontWeight: 600,
      marginBottom: "1.2rem",
    },
    "& span.essential": {
      color: "orange",
      paddingLeft: "0.2rem",
    },
    "& .menu-add > div > *": {
      marginBottom: "1rem",
    },
    "& .menu-list > p + div": {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: isPc ? "430px" : "200px !important", // isPc 삼항연산자 적용
      overflowY: "auto",
      border: "1px solid var(--food-gray-4)",
      borderRadius: "0.5rem",
      backgroundColor: "var(--food-gray-0)",
    },
    /* 메뉴 아이템 */
    "& .menu-item": {
      padding: "1rem 2rem",
      borderBottom: "1px solid var(--food-gray-2)",
    },
    "& .menu-item > div > p": {
      gap: "0.6rem",
    },
    "& .menu-item .icon > *": {
      cursor: "pointer",
      fontSize: "1.2rem",
      color: "var(--food-gray-4)",
      transition: "all 0.2s ease-in-out",
    },
    "& .menu-item .icon > *:hover": {
      color: "var(--food-brown-light)",
    },
    "& .menu-item .menu-item-info": {
      fontSize: "0.9rem",
      color: "var(--food-gray-4)",
      marginTop: "0.5rem",
    },
  });

export const foodMyFTCPScheduleStyle = (isPc) =>
  css({
    width: "100%",
    "& > div": {
      marginBottom: "3rem !important",
    },
    "& > div > div": {
      display: "flex",
      flexDirection: isPc ? "row" : "column", // isPc 삼항연산자 적용
      justifyContent: isPc ? "space-between" : "initial",
      alignItems: isPc ? "center" : "flex-start",
      marginBottom: isPc ? "1rem" : "3vh !important",
      gap: isPc ? "initial" : "1rem",
    },
    "& > div > div > *": {
      width: isPc ? "auto" : "100% !important", // isPc 삼항연산자 적용
    },
    "& label": {
      display: isPc ? "none" : "initial",
    },
    /* 요일 */
    "& > div > div > *:nth-child(1)": {
      width: isPc ? "20%" : "100% !important",
    },
    "& > div > div:nth-child(2) > *:nth-child(1) > span": {
      height: isPc ? "56px" : "auto",
      borderRadius: isPc ? "0.5rem" : "0",
    },
    "& > div > div > *:nth-child(3), & > div > div > *:nth-child(5)": {
      width: isPc ? "36%" : "100% !important",
    },
  });
