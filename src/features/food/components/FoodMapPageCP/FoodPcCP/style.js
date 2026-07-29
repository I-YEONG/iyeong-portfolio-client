import { css } from "@emotion/react";

export const foodPcCpButtonStyle = (isPc) =>
  css({
    width: "0%",
    height: "100%",
    position: "absolute",
    zIndex: 999,

    "& > div.gps, & > div.home, & > div.relay": {
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      backgroundColor: "var(--food-gray-0)",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      transition: "all 0.15s ease-in-out",
      cursor: "pointer",
      left: "calc(100% - 45px - 1rem)",
      position: "absolute",
    },
    "& > div.gps": {
      color: "var(--food-brown-dark)",
      bottom: "1rem",
    },
    "& > div.home": {
      color: "var(--food-brown)",
      bottom: "calc(1.6rem + 45px)",
    },
    "& > div.relay": {
      color: "var(--food-brown-light)",
      bottom: "calc(2.2rem + 90px)",
    },
    "& > div.gps:hover, & > div.home:hover, & > div.relay:hover": {
      backgroundColor: "var(--food-brown-light)",
      color: "var(--food-gray-0)",
    },
  });

export const foodPcCpMainStyle = (isPc) =>
  css({
    // 사이드 메뉴 영역
    "& > .sideMenu": {
      width: isPc ? "26%" : "100%", // isPc 활용 예시 (필요에 따라 수정)
      height: "100%",
      maxWidth: "460px",
      position: "absolute",
      overflow: "hidden",
      top: 0,
      left: 0,
      backgroundColor: "var(--food-gray-0)",
      padding: "3rem 1.8rem",
      boxShadow: "0px 0 6px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
    },
    "& .sideMenu > div:last-child": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0,
    },
    "& .marginTop": {
      height: "2.4rem",
    },
    "& .sideMenu h3": {
      fontSize: "1.2rem",
      fontWeight: 600,
      marginBottom: "0.5rem",
    },
    "& .sideMenu h3 span": {
      fontSize: "0.75rem",
      color: "var(--food-gray-5)",
      fontWeight: 400,
    },
    "& .filter": {
      width: "100%",
      maxWidth: "100%",
      height: "45px",
      borderRadius: "5px",
      border: "1px solid var(--food-gray-4)",
      fontSize: "0.8rem",
      padding: "0 1rem",
      backgroundColor: "var(--food-gray-0)",
      color: "var(--food-gray-5)",
      cursor: "pointer",
      overflow: "hidden !important",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      backgroundImage: "none",
    },
    "& .sideMenu > div > ul": {
      overflowY: "scroll",
      flex: 1,
      borderTop: "1px solid var(--food-gray-2)",
      scrollbarWidth: "thin",
      scrollbarColor: "var(--food-gray-2) transparent",
      "&::-webkit-scrollbar": {
        width: "2px",
        background: "transparent",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "var(--food-gray-1)",
        borderRadius: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "transparent",
      },
      "&::-webkit-scrollbar-button": {
        display: "none",
      },
    },
  });

// 컴포넌트에서 imgUrl을 인자로 전달받도록 세팅
export const foodPcCpDetailsStyle = (isPc, imgUrl) =>
  css({
    width: isPc ? "23%" : "100%", // isPc 활용 예시
    maxWidth: "360px",
    height: "100%",
    position: "absolute",
    backgroundColor: "var(--food-gray-0)",
    top: 0,
    left: isPc ? "calc(min(26%, 460px))" : "0",
    zIndex: 998,
    padding: "2rem 1.8rem",
    overflowY: "scroll",
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "& > p": {
      marginBottom: "1rem",
    },
    "& > p > .icon": {
      color: "var(--food-gray-4)",
      cursor: "pointer",
      transition: "all 0.15s ease-in-out",
    },
    "& > p > .icon:hover": {
      color: "var(--food-brown-light)",
    },
    // 이미지 영역 백그라운드 처리
    "& > div:nth-child(2)": {
      backgroundImage: imgUrl ? `url(${imgUrl}) !important` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      height: "28%",
      maxHeight: "170px",
      fontSize: "2rem",
      borderRadius: "12px",
    },
    "& h3": {
      fontSize: "1.1rem",
      fontWeight: 600,
      marginBottom: "0.8rem",
    },
    "& h3.name": {
      fontSize: "1.4rem",
      fontWeight: 600,
      marginBottom: "0.8rem",
    },
    "& p.intro": {
      fontSize: "0.9rem",
      color: "var(--food-gray-5)",
      marginBottom: "1.2rem",
      lineHeight: 1.5,
    },
    "& p.category.review": {
      fontSize: "0.9rem",
      color: "var(--food-gray-5)",
      marginBottom: "1.2rem",
      "& .category": {
        fontWeight: 600,
        color: "var(--food-brown-dark)",
      },
      "& .icon": {
        color: "orange",
        paddingRight: "0.5rem",
      },
    },
    "& .schedule": {
      fontSize: "0.7rem",
      color: "var(--food-gray-5)",
      marginBottom: "1.2rem",
      borderTop: "1px solid var(--food-gray-2)",
      fontFamily: '"Noto Sans KR", sans-serif',
      "& > li": {
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem 0",
        borderBottom: "1px solid var(--food-gray-2)",
        color: "var(--food-gray-4)",
        gap: "1rem",
      },
      "& > li > span:nth-child(1)": {
        fontWeight: 600,
      },
      "& > li > span:nth-child(4)": {
        flex: 1,
        textAlign: "center",
      },
    },
    "& > ul.menuList > li:nth-child(1)": {
      borderTop: "1px solid var(--food-gray-2)",
    },
    "& > ul.menuList > li": {
      padding: "1.6rem 0",
      borderBottom: "1px solid var(--food-gray-2)",
    },
    "& > ul.menuList > li > p:nth-child(1) > span:nth-child(1)": {
      fontWeight: 600,
      fontSize: "1.1rem",
    },
    "& > ul.menuList > li > p:nth-child(2)": {
      marginTop: "0.5rem",
      fontSize: "0.9rem",
      color: "var(--food-gray-5)",
    },
    "& .reviewItem": {
      padding: "1.6rem 0",
      borderBottom: "1px solid var(--food-gray-2)",
      fontSize: "0.9rem",
      "& > p:nth-child(1)": {
        marginBottom: "0.5rem",
        fontWeight: 600,
      },
      "& > p:nth-child(1) > span:nth-child(2)": {
        fontSize: "0.8rem",
      },
      "& > p:nth-child(1) > span:nth-child(2) .icon": {
        color: "orange",
      },
    },
  });
