import { css } from "@emotion/react";

export const foodFaqPageMainStyle = (isPc) =>
  css({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    padding: isPc ? "2rem" : "1rem",
    gap: "2rem",
    backgroundColor: "var(--food-main-page-bg)",
  });

export const foodFaqHeaderStyle = (isPc) =>
  css({
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    background: "none",
    boxShadow: "none",

    "& > h1": {
      fontSize: isPc ? "2.2rem" : "1.8rem",
      fontWeight: 600,
    },
    "& > p": {
      color: "var(--food-gray-5)",
      wordBreak: "keep-all",
    },
  });

export const foodQnaSectionStyle = (isPc) =>
  css({
    width: "100%",
    height: "fit-content",
    maxWidth: "1440px",
    padding: isPc ? "2rem" : "1rem",
    backgroundColor: "var(--food-gray-0)",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: "2rem",

    "& > div": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    "& > p": {
      fontSize: "1rem",
      color: "var(--food-gray-5)",
    },
    "& h2": {
      padding: "1rem",
      fontSize: isPc ? "2rem" : "1.5rem",
      fontWeight: 600,
      color: "var(--food-brown)",
    },
    "& .icon": {
      width: "2rem",
      height: "2rem",
      color: "var(--food-brown)",
      paddingLeft: "0.5rem",
    },
    "& .titleWrapper": {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  });

export const foodContactSectionStyle = (isPc) =>
  css({
    width: "100%",
    maxWidth: "1440px",
    display: "flex",
    flexDirection: isPc ? "row" : "column",
    flexWrap: "wrap",
    gap: "2rem",
    margin: "0 auto",
  });

export const foodContactCardStyle = (isPc) =>
  css({
    padding: isPc ? "2rem" : "1.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    flex: 1,
    minWidth: "300px",
    backgroundColor: "var(--food-gray-0)",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

    "& .header-wrap": {
      display: "flex",
      justifyContent: "flex-start",
      gap: "0.3rem",
      alignItems: "center",
    },
    "& .icon": {
      width: "2rem",
      height: "2rem",
      color: "var(--food-brown)",
      paddingRight: "0.5rem",
    },
    "& h2": {
      fontSize: isPc ? "2rem" : "1.6rem",
      fontWeight: 600,
      color: "var(--food-brown)",
    },
    "& > div > p": {
      margin: "1rem 0",
      fontSize: "1rem",
      color: "var(--food-gray-6)",
    },
    "& textarea, & select": {
      fontSize: "1rem",
      padding: "1rem",
    },
    "& .error": {
      color: "var(--food-red, red)",
    },
  });

export const foodContactInfoItemStyle = (isPc) =>
  css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",

    "& > div": {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    "& h3": {
      fontSize: "1.3rem",
      fontWeight: 500,
    },
    "& p": {
      color: "var(--food-gray-6)",
      fontWeight: 400,
    },
    "& p:nth-of-type(2)": {
      color: "var(--food-gray-4)",
    },
  });

export const foodQuickLinkSectionStyle = (isPc) =>
  css({
    display: "flex",
    flexDirection: "column",
    gap: "1rem",

    "& > h2": {
      fontSize: "1.3rem",
      fontWeight: 500,
      paddingTop: "1rem",
      borderTop: "1px solid var(--food-gray-3)",
    },
    "& > *": {
      display: "flex",
      justifyContent: "flex-start",
      transition: "0.3s ease",
      "&:hover": {
        background: "var(--food-gray-1)",
      },
    },
  });
