import { css } from "@emotion/react";

export const MyPageInfoCPMainStyle = (isPc) => css({
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    zIndex: "996",
    fontSize: "0.7rem",
    color: "var(--food-red)",
    fontSize: "2.2rem",
    fontWeight: "700",
    marginBottom: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    gap: "3rem",
    width: "100%",
    "padding: $": {

    },
    ".error": {
        fontSize: "0.7rem",
        color: "var(--food-red)",
    },
    "& > h2": {
        fontSize: "2.2rem",
        fontWeight: "700",
        marginBottom: "2rem",
    },
    "& > div": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: "3rem",
        width: "100%",
    },
});
