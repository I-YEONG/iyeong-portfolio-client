// import { css } from "@emotion/react";
// import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const fonts = {
  // 기본은 600~700
  titleXLg: { fontSize: "64px", fontWeight: "600", lineHeight: "1.2", letterSpacing: "-0.02em" },
  titleLg: { fontSize: "56px", fontWeight: "600", lineHeight: "1.2", letterSpacing: "-0.02em" },
  titleMd: { fontSize: "36px", fontWeight: "600", lineHeight: "1.3", letterSpacing: "-0.02em" },
  titleSm: { fontSize: "32px", fontWeight: "600", lineHeight: "1.3", letterSpacing: "-0.02em" },

  //title_B는 900~800으로 굵게,
  titleXLg_B: { fontSize: "64px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.02em" },
  titleLg_B: { fontSize: "56px", fontWeight: "800", lineHeight: "1.2", letterSpacing: "-0.02em" },
  titleMd_B: { fontSize: "36px", fontWeight: "800", lineHeight: "1.3", letterSpacing: "-0.02em" },
  titleSm_B: { fontSize: "32px", fontWeight: "800", lineHeight: "1.3", letterSpacing: "-0.02em" },

  textXLg: { fontSize: "24px", fontWeight: "400", lineHeight: "1.5", letterSpacing: "-0.01em" },
  textLg: { fontSize: "20px", fontWeight: "400", lineHeight: "1.5", letterSpacing: "-0.01em" },
  textMd: { fontSize: "16px", fontWeight: "400", lineHeight: "1.5", letterSpacing: "-0.01em" },

  textXLg_B: { fontSize: "24px", fontWeight: "700", lineHeight: "1.5", letterSpacing: "-0.01em" },
  textLg_B: { fontSize: "20px", fontWeight: "700", lineHeight: "1.5", letterSpacing: "-0.01em" },
  textMd_B: { fontSize: "16px", fontWeight: "700", lineHeight: "1.5", letterSpacing: "-0.01em" },

  textXLg_L: { fontSize: "24px", fontWeight: "200", lineHeight: "1.5", letterSpacing: "-0.01em" },
  textLg_L: { fontSize: "20px", fontWeight: "200", lineHeight: "1.5", letterSpacing: "-0.01em" },
  textMd_L: { fontSize: "16px", fontWeight: "200", lineHeight: "1.5", letterSpacing: "-0.01em" },

  // 캡션(8~14px)
  captionXl: { fontSize: "14px", fontWeight: "400", lineHeight: "1.4", letterSpacing: "-0.005em" },
  captionLg: { fontSize: "12px", fontWeight: "400", lineHeight: "1.4", letterSpacing: "-0.005em" },
  captionMd: { fontSize: "10px", fontWeight: "400", lineHeight: "1.4", letterSpacing: "-0.005em" },
  captionSm: { fontSize: "8px", fontWeight: "400", lineHeight: "1.4", letterSpacing: "-0.005em" },

  captionXl_B: { fontSize: "14px", fontWeight: "700", lineHeight: "1.4", letterSpacing: "-0.005em" },
  captionLg_B: { fontSize: "12px", fontWeight: "700", lineHeight: "1.4", letterSpacing: "-0.005em" },
  captionMd_B: { fontSize: "10px", fontWeight: "700", lineHeight: "1.4", letterSpacing: "-0.005em" },
  captionSm_B: { fontSize: "8px", fontWeight: "700", lineHeight: "1.4", letterSpacing: "-0.005em" },

  captionXl_L: { fontSize: "14px", fontWeight: "300", lineHeight: "1.4", letterSpacing: "-0.005em" },
  captionLg_L: { fontSize: "12px", fontWeight: "300", lineHeight: "1.4", letterSpacing: "-0.005em" },
  captionMd_L: { fontSize: "10px", fontWeight: "300", lineHeight: "1.4", letterSpacing: "-0.005em" },
  captionSm_L: { fontSize: "8px", fontWeight: "300", lineHeight: "1.4", letterSpacing: "-0.005em" },
};

export const flex = {
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  flexStart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  colStart: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  colEnd: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  // 중앙 정렬
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  rowCenter: {
    display: "flex",
    justifyContent: "center",
  },
  colCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  // 비트윈
  between: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  colBetween: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  // 어라운드
  around: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  rowAround: {
    display: "flex",
    justifyContent: "space-around",
  },
  colAround: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
};

export const colors = {
  text: "#333333",

  black900: "#252732",
  black800: "#414456",
  black600: "#6E738C",
  black400: "#B7BBCF",
  black200: "#DDDFE9",
  black100: "#EFF0F5",

  darkBG: "#090809",
  darkLine: "#2A2B2B",
  lightLine: "#DDDFEA",

  green: "#16B48F",
  deepGreen: "#448262",
  orange: "#FF9919",
  red: "#e84a69",
  blue: "#20A9EE",

  deepGreenBG: "#44826229",
  greenBG: "#16B48F29",
  orangeBG: "#FF991929",
  redBG: "#e84a6929",
  blueBG: "#20A9EE29",
};

export const theme = { fonts, colors, flex };
