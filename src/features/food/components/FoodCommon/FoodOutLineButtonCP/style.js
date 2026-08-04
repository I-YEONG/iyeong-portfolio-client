/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const foodOutLineButtonCPStyle = ({ pcOnly, isPc, color, borderColor, width }) => {
  // 테두리 색상 결정 로직을 변수로 분리하여 가독성 확보
  const finalBorderColor = borderColor ? (borderColor.startsWith("--") ? `var(${borderColor})` : borderColor) : color;

  return css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: pcOnly ? (isPc ? "10px 14px" : "unset") : "10px 14px",
    borderRadius: pcOnly ? (isPc ? "5px" : "unset") : "5px",
    color: pcOnly ? (isPc ? color : "black") : color,
    border: `${pcOnly ? (isPc ? "1px" : "0px") : "1px"} solid ${finalBorderColor}`,
    width: width ? width : undefined,
  });
};
