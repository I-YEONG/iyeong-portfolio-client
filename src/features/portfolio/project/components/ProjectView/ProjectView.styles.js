import { css } from "@emotion/react";
import { mq } from "@/styles/mq";

export const projectViewCss = (isPc) =>
  css({
    width: "100%",
    height: "100%",
    backgroundColor: "#282828",
    borderLeft: "1px solid #3d3e3e",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    ".project-view": {
      width: isPc ? "100%" : "min(94%, 420px)",
      // height: isPc ? "100%" : "auto",
      height: isPc ? "100%" : "calc(min(94%, 420px) * (19.5 / 9))",
      aspectRatio: isPc ? "auto" : "9 / 19.5",
      maxHeight: isPc ? "none" : "94%",
      borderRadius: isPc ? "0" : "12px",
      boxShadow: isPc ? "none" : "0 18px 45px rgba(0, 0, 0, 0.35)",
      overflow: "auto",
      position: "relative", // absolute 가두기 (기존 유지)

      /* ✨ 추가된 마법의 코드 2줄 ✨ */
      transform: "translate(0, 0)", // fixed 요소를 이 박스 안에 가둡니다.
      containerType: "size", // 내부에서 vh/vw 대신 cqh/cqw를 쓸 수 있게 컨테이너로 선언합니다.
    },

    [mq("mobile")]: {
      "& > .project-view": {
        width: "100%",
        borderRadius: "0",
        height: "calc(100vh - 62px)",
      },
    },
  });
