// src/styles/mq.js

const breakpoints = {
  sm: 599, // mobile
  md: 1023, // tablet
  lg: 1439, // laptop
  xl: 2559, // below 32-inch class displays
};

// 사용법: ${mq.md` color: red; `}
export const mq = Object.entries(breakpoints).reduce((acc, [label, value]) => {
  acc[label] = (segments, ...args) => {
    // 템플릿 리터럴 처리를 위해 스타일 내용을 합칩니다.
    const style = segments.reduce((res, str, i) => res + str + (args[i] || ""), "");
    return `@media (max-width: ${value}px) { ${style} }`;
  };
  return acc;
}, {});
