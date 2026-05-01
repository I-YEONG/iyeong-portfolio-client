import { useEffect, useRef } from "react";
import { mouseFollowerCss } from "./MouseFollower.styles";

/**
 * 마우스를 따라다니는 부드러운 원형 커서 컴포넌트입니다.
 *
 * - .cursor-reactive 클래스를 가진 영역 위에서만 활성화 효과가 적용됩니다.
 * - 색상/크기 효과는 .is-green, .is-orange, .is-red, .is-blue, .is-big 등 추가 클래스로 분기할 수 있습니다.
 *   예시: <div className="cursor-reactive is-blue is-big">...</div>
 * - 오프셋, 속도, 스타일은 MouseFollower 컴포넌트와 MouseFollower.styles.js에서 커스텀 가능합니다.
 *
 * @returns {JSX.Element} 화면 전체에 부드럽게 따라다니는 커서 원
 */
const MouseFollower = () => {
  const cursorRef = useRef(null);
  const rafIdRef = useRef(0);

  useEffect(() => {
    const cursorEl = cursorRef.current;

    if (!cursorEl) {
      return undefined;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMoved = false;

    const offset = { x: 30, y: 30 }; // 커서 기준 위치 오프셋
    const easing = 0.048; // 값이 작을수록 더 천천히 따라옴

    const handleMove = (event) => {
      hasMoved = true;
      cursorEl.style.opacity = "1";
      const hovered = document.elementFromPoint(event.clientX, event.clientY);
      if (hovered && window.getComputedStyle(hovered).cursor === "pointer") {
        cursorEl.classList.add("is-hover");
      } else {
        cursorEl.classList.remove("is-hover");
      }
      // 마우스 위치 + 오프셋을 목표 위치로 설정
      targetX = event.clientX + offset.x;
      targetY = event.clientY + offset.y;
    };

    const handleLeave = () => {
      cursorEl.style.opacity = "0";
      cursorEl.classList.remove("is-hover");
    };

    const handleOver = (event) => {
      // 지정한 영역(.cursor-reactive) 위에서는 활성 효과
      const target = event.target.closest(".cursor-reactive");
      if (!target) {
        return;
      }

      const variantClasses = ["is-green", "is-orange", "is-red", "is-blue", "is-white"];
      variantClasses.forEach((className) => cursorEl.classList.remove(className));
      variantClasses.forEach((className) => {
        if (target.classList.contains(className)) {
          cursorEl.classList.add(className);
        }
      });
      cursorEl.classList.add("is-active");
    };

    const handleOut = (event) => {
      // 지정한 영역에서 벗어났을 때 원래 상태로 복귀
      const target = event.target.closest(".cursor-reactive");
      if (!target) {
        return;
      }

      const related = event.relatedTarget;
      if (related && target.contains(related)) {
        return;
      }

      cursorEl.classList.remove("is-active");
      cursorEl.classList.remove("is-green", "is-orange", "is-red", "is-blue", "is-white");
    };

    const animate = () => {
      if (hasMoved) {
        // 현재 위치에서 목표 위치로 보간 이동
        currentX += (targetX - currentX) * easing;
        currentY += (targetY - currentY) * easing;
        cursorEl.style.setProperty("--cursor-x", `${currentX}px`);
        cursorEl.style.setProperty("--cursor-y", `${currentY}px`);
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return <div ref={cursorRef} css={mouseFollowerCss} />;
};

export default MouseFollower;
