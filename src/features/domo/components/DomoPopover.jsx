import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useEffect, useRef } from "react";

import "./styles/Popover.css";
import { css } from "@emotion/react";

const popoverStyle = (isPc, pos) =>
  css({
    // 🚨 핵심 수정: absolute 대신 fixed를 사용하여 화면 좌표와 완벽히 일치시킵니다.
    position: "fixed",
    zIndex: 9999,

    // isPc에 따른 위치 분기 처리
    ...(isPc
      ? {
          // PC: 마우스/타겟 근처에 배치
          top: `${pos.top}px`,
          left: `${pos.right - 320}px`,
        }
      : {
          // 모바일: 보통 우측에 고정 (필요 시 주석 해제하여 사용)
          top: `90px`,
          right: "20px",
          zIndex: "9999",
        }),

    // 기존 .popover_container 에 있던 스타일이 있다면 이어서 작성
  });

const DomoPopover = ({ children, onClose, position }) => {
  const popoverRef = useRef(null);
  const { isPc } = useDeviceMode();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 팝업 영역 외부를 클릭하면 닫힘
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    // 동적 style 객체 대신 css 속성에 Emotion 함수를 호출하여 주입합니다.
    <div className="popover_container" ref={popoverRef} css={popoverStyle(isPc, position)}>
      <div className="popover_content">{children}</div>
    </div>
  );
};

export default DomoPopover;
