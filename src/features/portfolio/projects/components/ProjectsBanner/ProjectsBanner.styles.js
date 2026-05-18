import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

export const projectsBannerCss = css({
  "& .content-center": {
    padding: "24px",

    [mq("mobile")]: {
      padding: "20px 16px",
    },
  },

  "& .title": {
    ...theme.fonts.textLg_B,
  },

  "& .subtitle": {
    ...theme.fonts.captionLg,
    color: theme.colors.black600,
  },
});
