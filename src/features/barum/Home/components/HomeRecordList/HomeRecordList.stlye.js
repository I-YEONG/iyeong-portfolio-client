import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const homeRecordListStyle = css({
  width: "100%",
  overflow: "",

  " & > .title-box": {
    ...theme.barum.flex.rowBetween,
    marginBottom: "20px",

    "& > .title": {
      ...theme.barum.fonts.section,
    },
    "& > .button": {
      ...theme.barum.fonts.micro,
      color: theme.barum.colors.ink3,
      cursor: "pointer",
    },
  },
});
