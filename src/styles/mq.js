/**
 * 반응형 미디어 쿼리 기준이 되는 브레이크포인트(px)
 */
// pc, tablet, mobile 명칭으로 변경
const breakpoints = { pc: 1200, tablet: 1024, mobile: 768 };

/**
 * 브레이크포인트를 기반으로 max-width 미디어 쿼리 문자열을 생성한 객체
 * 예: mq.md -> "@media (max-width: 768px)"
 */
export const mq = Object.entries(breakpoints).reduce((acc, [label, value]) => {
  acc[label] = `@media (max-width: ${value}px)`;
  return acc;
}, {});
