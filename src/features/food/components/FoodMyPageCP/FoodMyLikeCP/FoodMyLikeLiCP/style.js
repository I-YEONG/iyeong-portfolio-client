import { css } from "@emotion/react";

export const foodMyLikeLiCPStyle = (isPc) =>
  css({
    width: "100%",
    // isPc 값에 따른 미디어 쿼리 스타일 예시
    padding: isPc ? "20px" : "10px",

    ".ftListIndexLi": {
      listStyle: "none",
      padding: isPc ? "1.5rem" : "1rem",
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginBottom: "1rem",
      backgroundColor: "#fff",
    },
    ".ftListIndex": {
      marginBottom: "1rem",
    },
    ".flexBetween": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    ".name": {
      fontWeight: "bold",
      fontSize: isPc ? "1.3rem" : "1.1rem",
    },
    ".isHolidayToday": {
      padding: "0.2rem 0.5rem",
      borderRadius: "4px",
      color: "#fff",
      fontSize: "0.85rem",
      fontWeight: "bold",
    },
    ".intro": {
      color: "#666",
      margin: "0.5rem 0",
      fontSize: isPc ? "1rem" : "0.9rem",
    },
    ".ftScheduleDiv": {
      marginTop: "1rem",
      paddingTop: "1rem",
      borderTop: "1px dashed #eee",
    },
    ".schedule": {
      listStyle: "none",
      padding: 0,
      margin: 0,
      width: "100%",
      li: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem 0",
        fontSize: isPc ? "1rem" : "0.9rem",
        span: {
          flex: 1,
          textAlign: "center",
          "&:first-of-type": {
            flex: 0.5,
            textAlign: "left",
          },
          "&:last-of-type": {
            flex: 1.5,
            textAlign: "right",
          },
        },
      },
    },
    ".icon": {
      color: "#f5c518",
    },
  });
