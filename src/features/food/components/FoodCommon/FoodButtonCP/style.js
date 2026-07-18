import { css } from "@emotion/react";

export const buttonCPStyle = ({ disabled, pcOnly, isPc, color, fontColor }) =>
  css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s ease",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    backgroundColor: pcOnly ? (isPc ? `var(${color})` : "transparent") : `var(${color})`,
    padding: pcOnly ? (isPc ? "10px 14px" : "unset") : "10px 14px",
    borderRadius: pcOnly ? (isPc ? "5px" : "unset") : "5px",
    color: pcOnly ? (isPc ? `var(${fontColor})` : "black") : `var(${fontColor})`,
  });
