import { css } from "@emotion/react";

export const foodCardTitleFlexStyle = () =>
  css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  });

export const foodIconStyle = () =>
  css({
    width: "1.25rem",
    height: "1.25rem",
    color: "var(--brown-main, #8B4513)", // 설정된 메인 컬러 변수 사용
  });

export const foodContentSpaceStyle = () =>
  css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  });

export const foodDayListContainerStyle = () =>
  css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  });

export const foodDayRowStyle = () =>
  css({
    padding: "1rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  });

export const foodDayRowTopStyle = (isPc) =>
  css({
    display: "flex",
    alignItems: isPc ? "center" : "flex-start",
    justifyContent: "space-between",
    flexDirection: isPc ? "row" : "column",
    gap: isPc ? "0" : "1rem",
  });

export const foodDayLabelAreaStyle = (isPc) =>
  css({
    display: "flex",
    alignItems: "center",
    width: isPc ? "8rem" : "100%",
    gap: "1rem",
  });

export const foodDayLabelTextStyle = () =>
  css({
    fontWeight: 500,
  });

export const foodCheckboxAreaStyle = () =>
  css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  });

export const foodCheckboxStyle = () =>
  css({
    borderStyle: "solid",
    borderColor: "var(--brown-main, #8B4513)",
    "&[data-state='checked']": {
      backgroundColor: "var(--brown-main, #8B4513)",
    },
  });

export const foodTimeInputAreaStyle = (isPc) =>
  css({
    display: "flex",
    alignItems: "center",
    flex: 1,
    marginLeft: isPc ? "2rem" : "0",
    width: isPc ? "auto" : "100%",
    gap: "0.5rem",
  });

export const foodAddressRowStyle = (isPc) =>
  css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: isPc ? "center" : "flex-start",
    flexDirection: isPc ? "row" : "column",
    gap: isPc ? "0" : "1rem",
  });

export const foodAddressInputAreaStyle = (isPc) =>
  css({
    display: "flex",
    flex: 1,
    marginLeft: isPc ? "2rem" : "0",
    gap: isPc ? "1.5rem" : "0.5rem",
    width: isPc ? "auto" : "100%",
    flexDirection: isPc ? "row" : "column",
  });

export const foodInputCommonStyle = () =>
  css({
    flex: 1,
    border: "1px solid #e5e7eb",
    padding: "0.5rem",
    borderRadius: "0.375rem",
  });

export const foodPhoneInputContainerStyle = () =>
  css({
    marginTop: "1rem",
  });

export const foodPhoneInputStyle = () =>
  css({
    marginTop: "0.5rem",
    border: "1px solid #e5e7eb",
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.375rem",
  });

export const foodModalOverlayStyle = () =>
  css({
    position: "fixed",
    top: 0,
    left: 0,
    margin: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.1)",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });

export const foodModalContentStyle = () =>
  css({
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    padding: 0,
    zIndex: 10001,
  });
