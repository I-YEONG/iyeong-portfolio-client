import { css } from "@emotion/react";

export const foodMyReviewCPStyle = (isPc) =>
  css({
    width: "100%",
    height: "100%",
    padding: isPc ? "4rem 8rem" : "6rem 2rem",
    overflowY: "scroll",
    zIndex: 996,

    "& > h2": {
      fontSize: "2.2rem",
      fontWeight: 700,
      marginBottom: "2rem",
    },
  });

export const foodMyReviewCPDivStyle = css({
  marginBottom: "3rem",
  padding: "2rem",
  border: "1px solid var(--food-gray-3)",
  borderRadius: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  ".foodFlexBetween": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".truckName": {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
  ".ratingBox": {
    display: "inline-block",
    width: "5rem",
    textAlign: "center",
  },
  ".textAreaWrapper": {
    fontFamily: '"Noto Sans KR", sans-serif',
    fontSize: "0.9rem",
    color: "var(--food-gray-6)",
  },
  ".dateText": {
    fontSize: "0.9rem",
    color: "gray",
  },
  ".actionIcons": {
    cursor: "pointer",
    marginRight: "1rem",
  },
  ".deleteIcon": {
    cursor: "pointer",
    color: "var(--food-red)",
  },
  ".buttonGroup": {
    gap: "1rem",
  },
});
