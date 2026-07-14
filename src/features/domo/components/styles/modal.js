import { css } from "@emotion/react";

export const domoModalStyle = (isPc) =>
  css({
    // --- 모달 배경 (오버레이) ---
    "&.modal_background, .modal_background": {
      width: isPc ? "100%" : "100%",
      height: isPc ? "100%" : "100%",
      backgroundColor: "#0000007d",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 99999,

      // 모바일 미디어 쿼리 대체
      padding: isPc ? 0 : "0 16px",
      boxSizing: "border-box", // 패딩 추가로 인해 100vw 영역을 벗어나지 않도록 방지
    },

    // --- 모달 컨텐츠 (내부 흰색 박스) ---
    ".modal_content": {
      backgroundColor: "var(--black-0)",
      borderRadius: "24px",

      // 모바일 환경에서 48px 패딩은 너무 공간을 많이 차지하므로 분기 처리
      padding: isPc ? "48px" : "24px",

      // 모바일에서는 vw 대신 100% 꽉 차게 (부모의 0 16px 패딩 안에서 꽉 참)
      minWidth: isPc ? "32%" : "100%",
    },
  });
