/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
export const foodContainerStyle = () =>
  css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  });

export const foodItemStyle = () =>
  css({
    borderBottom: "1px solid var(--food-gray-3)",
  });

/** 질문버튼, 누르면 answer 내용 드랍 */
export const foodHeaderStyle = () =>
  css({
    width: "100%",
    padding: "1rem",
    backgroundColor: "var(--food-gray-0)",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    gap: "0.5rem",
    alignItems: "center",
    textAlign: "left",
    border: "none", // 기본 버튼 테두리 제거 (필요시 유지)

    "&:hover": {
      textDecoration: "underline",
    },
  });

/** 질문버튼 내부 question 내용 */
export const foodQuestionStyle = () =>
  css({
    fontSize: "1.2rem",
    fontWeight: 500,
    flex: 1,
  });

export const foodIconStyle = (isOpen) =>
  css({
    width: "15px",
    height: "15px",
    color: "var(--food-brown)",
    transform: isOpen ? "rotate(-90deg)" : "rotate(90deg)",
    transition: "transform 0.4s ease",
  });

export const foodAnswerWrapperStyle = (isOpen) =>
  css({
    overflow: "hidden",
    maxHeight: isOpen ? "300px" : "0",
    opacity: isOpen ? 1 : 0,
    transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
  });

export const foodAnswerStyle = (isOpen) =>
  css({
    fontSize: "0.8rem",
    padding: "1rem",
    color: "var(--food-gray-5)",
    transition: "opacity 0.3s ease",
    opacity: isOpen ? 1 : 0,
  });
