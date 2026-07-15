import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const ProjectHeaderCss = css({
  width: "100%",
  height: "62px",
  borderBottom: `1px solid ${theme.colors.darkLine}`,
  // borderBottom: `1px solid #DDDFEA`,
  ...theme.flex.rowBetween,
  backgroundColor: "#353535",
  color: "#fff",
  padding: "0 24px",

  "& .menu": {
    display: "none",
  },

  [mq("mobile")]: {
    "& .device": {
      display: "none",
    },
    "& .menu": {
      display: "block",
    },
  },

  "& .icon-div": {
    ...theme.flex.center,
    flexWrap: "nowrap",
    gap: "24px",
    color: "white",
  },

  "& .logo": {
    width: "160px",
    height: "auto",
    color: "white",
  },
  "& .git": {
    width: "24px",
    height: "24px",
  },

  // 버튼 안의 SVG 아이콘이 부모의 color를 따르도록 설정
  "& .icon-div button": {
    color: "inherit",
    background: "transparent",
    border: "none",
    padding: 0,
  },

  "& .icon-div button svg": {
    width: "24px",
    height: "24px",
  },
});
