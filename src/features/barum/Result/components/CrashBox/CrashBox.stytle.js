import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const crashBoxStyle = (good) =>
  css({
    ...theme.barum.flex.rowStart,
    backgroundColor: good ? theme.barum.colors.greenSoft : theme.barum.colors.warnBg,
    padding: "20px 24px",
    gap: "14px",
    borderRadius: "30px",

    marginBottom: "8px",

    "&:last-child": {
      marginBottom: "0px",
    },

    "& .icon": {
      marginTop: "12px",
      fontSize: "22px",
      color: good ? theme.barum.colors.green : theme.barum.colors.warn,
    },

    "& .text-box": {
      ...theme.barum.flex.colCenter,
      gap: "6px",

      "& .title-box": {
        ...theme.barum.flex.rowBetween,
        color: good ? theme.barum.colors.green : theme.barum.colors.warnInk3,
        ...theme.barum.fonts.micro,

        "& .reason": {
          alignItems: "center",
        },

        "& p.ingredient": {
          ...theme.barum.fonts.body,
          fontWeight: "600",
          color: good ? theme.barum.colors.greenDeep : theme.barum.colors.warnInk,

          "& span.ingredient": {
            marginRight: "4px",
          },

          "& span.plus": {
            marginLeft: "4px",
          },

          "& span.ingredient:last-child > .plus": {
            display: "none",
          },
        },
      },
    },

    "& .text": {
      color: good ? theme.barum.colors.greenInk : theme.barum.colors.warnBody,
      ...theme.barum.fonts.sub,
    },

    "& .guide": {
      color: good ? theme.barum.colors.green : theme.barum.colors.warnSource,
      ...theme.barum.fonts.nano,
    },
  });
