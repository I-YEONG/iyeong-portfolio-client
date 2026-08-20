import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const weatherBoxStyle = css({
  width: "100%",
  backgroundColor: theme.barum.colors.green,
  borderRadius: "30px",
  padding: "22px 24px",
  color: "#fff",

  "& > .title-box": {
    ...theme.barum.flex.rowBetween,
    marginBottom: "24px",

    "& > .title": {
      maxWidth: "50%",
      wordBreak: "keep-all",
      overflowWrap: "break-word",
    },

    "& .loc": {
      ...theme.barum.fonts.micro,
      opacity: "0.75",
      marginBottom: "8px",
    },

    "& .text": {
      ...theme.barum.fonts.lead,
    },

    // 온도
    "& .temp": {
      ...theme.barum.fonts.metric,
    },
  },

  // 상세 데이터
  "& > .data-box": {
    ...theme.barum.flex.rowBetween,
    paddingTop: "20px",
    borderTop: `1px solid ${theme.barum.colors.hairline}`,

    "& > div": {
      width: "100%",
    },

    "& > div > p:first-of-type": {
      ...theme.barum.fonts.micro,
      opacity: "0.75",
    },

    "& > div > p:last-child": {
      ...theme.barum.fonts.body,
    },
  },
});

export const weatherBoxErrorStyle = css({
  padding: "22px 24px",
  borderRadius: "30px",
  backgroundColor: theme.barum.colors.surfaceMuted,

  ...theme.barum.flex.rowBetween,
  alignItems: "center",

  "& .text-box > p:nth-of-type(1)": {
    color: theme.barum.colors.ink3,
    marginBottom: "4px",
    ...theme.barum.fonts.caption,
  },

  "& .text-box > p:nth-of-type(2)": {
    color: theme.barum.colors.ink2,
    ...theme.barum.fonts.body_B,
  },

  "& .button": {
    ...theme.barum.fonts.micro,
    color: theme.barum.colors.ink2,
    fontWeight: "600",
    padding: "10px 16px",
    backgroundColor: "#fff",
    borderRadius: "999px",
    cursor: "pointer",
  },
});
