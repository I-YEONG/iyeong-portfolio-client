import { css } from "@emotion/react";

// 2. 컴포넌트 이름에 맞춰 Food 접두사를 넣고 첫 글자는 소문자로 작성
// 0. () => css({}) 형태의 객체 방식 사용
// 1. isPc를 인자로 받아 미디어 쿼리 처리
export const foodMobileCPMainStyle = (isPc, imgUrl) =>
  css({
    position: "absolute",
    width: "100%", // 예시: PC 화면일 때의 너비 처리
    height: "100%",

    "& > .ftList, & > .ftDetails": {
      zIndex: 999,
      width: isPc ? "400px" : "100%", // 예시: PC일 때는 고정너비, 모바일은 100%
      backgroundColor: "var(--food-gray-0)",
      padding: "2rem",
      borderRadius: "1rem 1rem 0 0",
      boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.1)",
      height: "40%",
      position: "absolute",
      transition: "all 0.2s ease-in-out",
    },

    "& > .ftList": {
      paddingRight: 0,
    },

    "& > .ftList > h3": {
      paddingRight: "2rem",
    },

    "& > .ftList > ul": {
      overflowY: "scroll",
      paddingRight: "calc(2rem - 12px)",
    },

    "& h3": {
      fontSize: "1.6rem",
      fontWeight: 600,
      marginBottom: "0.5rem",
    },

    "& .marginTop": {
      height: "2rem",
    },

    "& .ftDetails > section": {
      width: "100%",
      height: "100%",
      position: "relative",
      marginTop: "1.6rem",
    },

    "& .ftDetails > section.info": {
      "& > div:first-child": {
        backgroundImage: imgUrl ? `url(${imgUrl})` : "none", // props.imgUrl 대체
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "28%",
        maxHeight: "170px",
        color: "var(--food-gray-3)",
        borderRadius: "12px",
      },

      "& h3.name": {
        fontSize: "1.4rem",
        fontWeight: 600,
        marginBottom: "0.8rem",
      },

      "& p.intro": {
        fontSize: "1rem",
        color: "var(--food-gray-5)",
        marginBottom: "1.2rem",
        lineHeight: 1.5,
      },

      "& p.category.review": {
        fontSize: "1rem",
        color: "var(--food-gray-5)",

        "& .category": {
          fontWeight: 600,
          color: "var(--food-brown-dark)",
        },

        "& .icon": {
          color: "orange",
          paddingRight: "0.5rem",
        },
      },
    },

    "& .ftDetails > section.menu": {
      overflowY: "scroll",

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
    },

    "& .ftDetails > section.schedule": {
      "& ul": {
        color: "var(--food-gray-5)",
        marginBottom: "1.2rem",
        borderTop: "1px solid var(--food-gray-2)",
        fontFamily: '"Noto Sans KR", sans-serif',
      },

      "& ul > li": {
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem 0",
        borderBottom: "1px solid var(--food-gray-2)",
        color: "var(--food-gray-4)",
        gap: "1rem",
      },

      "& ul > li > span:nth-child(1)": {
        fontWeight: 600,
      },

      "& ul > li > span:nth-child(4)": {
        flex: 1,
        textAlign: "center",
      },
    },

    "& .ftDetails > section.review": {
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
        fontSize: "0.95rem",
        color: "var(--food-gray-5)",
      },

      "& .reviewItem": {
        padding: "1.6rem 0",
        borderBottom: "1px solid var(--food-gray-2)",

        "& > p:nth-child(1)": {
          marginBottom: "0.5rem",
          fontWeight: 600,
        },

        "& > p:nth-child(1) > span:nth-child(2)": {
          fontSize: "0.95rem",
        },

        "& > p:nth-child(1) > span:nth-child(2) .icon": {
          color: "orange",
        },
      },
    },
  });

export const foodMobileCPButtonStyle = (isPc) =>
  css({
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 998,

    "& > div.gps, & > div.home, & > div.menu, & > div.relay": {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "var(--food-gray-0)",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      fontSize: "0.9rem",
      transition: "all 0.15s ease-in-out",
      cursor: "pointer",
      position: "absolute",
    },

    "& > div.gps": {
      color: "var(--food-brown-dark)",
      left: "calc(100% - 1rem - 40px)",
      top: "1rem",
    },

    "& > div.home": {
      color: "var(--food-brown)",
      left: "calc(100% - 1.6rem - 80px)",
      top: "1rem",
    },

    "& > div.relay": {
      color: "var(--food-brown-light)",
      left: "calc(100% - 2.2rem - 120px)",
      top: "1rem",
    },

    "& > div.menu": {
      color: "var(--food-brown-light)",
      left: "calc(100% - 1rem - 40px) !important",
      bottom: "1rem !important",
    },

    "& > div.gps:hover, & > div.home:hover, & > div.relay:hover, & > div.menu:hover": {
      backgroundColor: "var(--food-brown-light)",
      color: "var(--food-gray-0)",
    },
  });
