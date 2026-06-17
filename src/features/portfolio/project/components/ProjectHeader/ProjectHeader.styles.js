import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
// import { mq } from "@/styles/mq";

export const ProjectHeaderCss = css({
  width: "100%",
  height: "62px",
  borderBottom: `1px solid ${theme.colors.lightLine}`,
  ...theme.flex.rowBetween,

  backgroundColor: "#353535",
});
