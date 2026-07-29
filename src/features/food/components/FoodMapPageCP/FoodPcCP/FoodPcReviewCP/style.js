import { css } from "@emotion/react";

export const foodPcReviewCPMainStyle = (isPc) =>
  css({
    position: "relative", // 내부에 absolute 요소들이 있으므로 추가
    width: isPc ? "20%" : "100%",
    maxWidth: isPc ? "360px" : "unset",
    left: isPc ? "calc(100% - min(20%, 360px))" : "0",
    // 기존 Styled-components에 있던 다른 CSS 속성들을 아래에 추가하시면 됩니다.
  });
