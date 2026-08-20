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

    // 습도
    "& .humidity": {
      ...theme.barum.fonts.nano,
      opacity: "0.7",
      textAlign: "end",
    },
  },
});
