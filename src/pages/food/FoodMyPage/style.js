import { css } from "@emotion/react";

export const foodMyPageMainStyle = (isPc, onMenu) =>
  css({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "white",

    ".margin": {
      margin: "1rem 0",
    },

    ".menuBars": {
      position: "absolute",
      top: "1rem",
      left: "1rem",
      fontSize: "1.6rem",
      zIndex: 999,
      padding: "1rem",
      backgroundColor: "var(--food-gray-0)",
      borderRadius: "50%",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    },

    ".menuXmark": {
      top: "1rem",
      right: "1rem",
      zIndex: 999,
    },

    /* menu */
    "> section.menu": {
      backgroundColor: "var(--food-gray-0)",
      position: "absolute",
      left: isPc ? "0" : onMenu ? "0" : "-460px",
      zIndex: 998,
      width: isPc ? "min(20vw, 460px)" : "100vw",
      height: "100%",
      boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
      padding: "4rem 3rem",
      transition: "all 0.3s ease-in-out",
      justifyContent: isPc ? "start" : "center",
      alignItems: isPc ? "flex-start" : "center",
      fontSize: isPc ? "1rem" : "2rem",

      ".image": {
        width: isPc ? "calc(min(20vw, 460px) - 6rem)" : "70vw",
        height: isPc ? "calc(min(20vw, 460px) - 6rem)" : "70vw",
        color: "var(--food-brown-dark)",
        fontSize: "7rem",
      },

      /* 이미지 */
      ".ftIcon": {
        width: "calc(min(20vw, 460px) - 6rem)",
        height: "calc(min(20vw, 460px) - 6rem)",
        background: 'url("/img/foodTruck.png") no-repeat center center',
        backgroundSize: "contain",
      },

      ul: {
        lineHeight: isPc ? "1.6rem" : "2.4rem",
        marginTop: "2rem",
        width: "100%",

        li: {
          cursor: "pointer",
          width: "100%",
          textAlign: isPc ? "left" : "center",
        },

        "li.homeButton": {
          marginTop: "2rem",
          color: "var(--food-brown-light)",
        },

        "li.logoutButton": {
          width: isPc ? "50%" : "100%",
          marginTop: "0.5rem",
          color: "var(--food-red)",
          fontWeight: 600,
          transition: "all 0.2s",

          "&:hover": {
            color: "var(--food-red-dark)",
            borderBottom: "2px solid var(--food-red-dark)" /* 바닥선 추가 */,
          },
        },
      },
    },

    "> section.mainSection": {
      width: "100%",
      height: "100%",
      paddingLeft: isPc ? "min(20vw, 460px)" : "0",
      position: "relative",
      zIndex: 996,
    },
  });
