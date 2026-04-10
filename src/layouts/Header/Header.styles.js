import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const headerCss = (isScrolled, themeCode) =>
  css({
    position: "sticky",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "0px auto",
    top: 0,
    padding: "12px 0",
    minHeight: "80px",

    borderBottomStyle: "solid",
    borderBottomWidth: isScrolled ? 0 : 1,

    "& svg": {
      width: "18px",
      height: "18px",
      cursor: "pointer",
      padding: "8px",
      boxSizing: "content-box",
    },

    // 테마 분기
    ...(themeCode === "light" && {
      ...theme.fonts.captionXl_B, // 기존 테마 폰트 병합
      backgroundColor: isScrolled ? "none" : "#fff",
      color: theme.colors.text,
      borderBottomColor: theme.colors.lightLine,
      transition: isScrolled
        ? "background-color 0.3s, border-bottom-width 0.3s, border-bottom-color 0.3s"
        : "background-color 0.3s 1s, border-bottom-width 0.3s 1s, border-bottom-color 0.3s 1s",
    }),

    ...(themeCode === "dark" && {
      ...theme.fonts.captionXl_B, // 기존 테마 폰트 병합
      backgroundColor: isScrolled ? "none" : theme.colors.darkBG,
      color: isScrolled ? theme.colors.text : "#fff",
      borderBottomColor: theme.colors.darkLine,
      transition: isScrolled
        ? "background-color 0.3s, border-bottom-width 0s, border-bottom-color 0s, color 0.3s"
        : "background-color 0.1s , border-bottom-width 0.3s 1.04s, border-bottom-color 0.3s 1s, color 0.1s",
    }),

    // media query
    [mq("mobile")]: {
      width: "100%",
      padding: "8px 12px",
      ...theme.fonts.captionLg_B,
    },

    [mq("UHD")]: {
      borderBottomWidth: isScrolled ? 0 : 2,
    },
  });

export const sectionCss = (isScrolled) =>
  css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: isScrolled ? "90%" : "80%",
    padding: "12px 46px",
    borderRadius: "999px",
    transition: isScrolled
      ? "background-color 0.3s, box-shadow 0.3s, max-width 0.9s cubic-bezier(0.4, 1.1, 0.6, 1), border-radius 0.9s cubic-bezier(0.4, 1.1, 0.6, 1), width 0.9s cubic-bezier(0.4, 1.1, 0.6, 1)"
      : "background-color 0.3s, box-shadow 0.3s 1s, max-width 0.9s cubic-bezier(0.4, 1.1, 0.6, 1), border-radius 0.9s cubic-bezier(0.4, 1.1, 0.6, 1), width 0.9s cubic-bezier(0.4, 1.1, 0.6, 1)",

    // scrolled
    backgroundColor: isScrolled ? "#fff" : "none",
    maxWidth: isScrolled ? "1200px" : "1460px",
    height: "68px",
    boxShadow: isScrolled ? "0 8px 25px -8px rgba(0,0,0,0.15)" : "none",

    // media query
    [mq("mobile")]: {
      width: "100%",
      padding: "12px 24px",
      gap: "32px",
    },
  });

export const navCss = css({
  display: "flex",
  justifyContent: "space-between",
  gap: "3vw",

  [mq("mobile")]: {
    gap: "16px",
  },
});

export const navItemCss = css({
  cursor: "pointer",
  padding: "8px 12px",

  [mq("mobile")]: {
    padding: "8px 0px",
  },
});

export const logoCss = css({
  ...theme.flex.center,
  width: "16%",
  minWidth: "80px",
  maxWidth: "180px",
  cursor: "pointer",

  [mq("mobile")]: {
    width: "46%",
  },
});

export const iconCss = css({
  ...theme.flex.center,
  gap: "16px",
  justifyContent: "flex-end",
  width: "16%",
  minWidth: "80px",
  maxWidth: "180px",

  "& img": {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    padding: "8px",
    boxSizing: "content-box",
  },
});
