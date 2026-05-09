import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const mouseFollowerCss = css({
  position: "fixed",
  top: 0,
  left: 0,
  width: "var(--cursor-size, 12px)",
  height: "var(--cursor-size, 12px)",
  borderRadius: "999px",
  backgroundColor: "rgba(22, 22, 22, 0.7)",
  pointerEvents: "none",
  opacity: 0,
  transform: "translate3d(var(--cursor-x, 0), var(--cursor-y, 0), 0) scale(var(--cursor-scale, 1))",
  transition: "width 220ms ease, height 220ms ease, background-color 300ms ease, box-shadow 300ms ease",
  zIndex: 9999,

  "&.is-white": {
    backgroundColor: "rgba(255, 255, 255, 0.88)",
  },

  "&.is-green": {
    backgroundColor: `${theme.colors.green}95`,
  },

  "&.is-orange": {
    backgroundColor: `${theme.colors.orange}95`,
  },

  "&.is-red": {
    backgroundColor: `${theme.colors.red}95`,
  },

  "&.is-blue": {
    backgroundColor: `${theme.colors.blue}95`,
  },

  "&.is-hover": {
    "--cursor-size": "8px",
  },

  "@media (hover: none)": {
    display: "none",
  },
});
