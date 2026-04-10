import { useEffect, useRef, useState } from "react";
import { useCountUp } from "use-count-up";

/**
 * 숫자 카운트 애니메이션을 보여주는 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {number|string} [props.start=0] - 카운트 시작값
 * @param {number|string} props.end - 카운트 종료값(필수)
 * @param {number|string} [props.duration=2] - 애니메이션 지속 시간(초)
 * @param {string} [props.separator=","] - 천 단위 구분자
 * @param {number|string} [props.decimals=0] - 소수점 자리수
 * @param {string} [props.prefix=""] - 숫자 앞에 붙는 텍스트(단위 등)
 * @returns {JSX.Element} 카운트 애니메이션 span 엘리먼트
 */
const CountUpSpan = ({
  start = 0,
  end,
  duration = 2,
  separator = ",",
  decimals = 0,
  prefix = "",
  suffix = "",
  style = {},
  startOnView = true,
  once = true,
  threshold = 0.5,
}) => {
  const targetRef = useRef(null);
  const [isCounting, setIsCounting] = useState(!startOnView);

  const formatStaticValue = (raw) => {
    const decimalCount = Number(decimals) || 0;
    const num = Number(raw);

    if (Number.isNaN(num)) {
      return `${prefix}${raw}${suffix}`;
    }

    const fixed = num.toFixed(decimalCount);
    const [intPart, fracPart] = fixed.split(".");
    const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    const valueText = decimalCount > 0 ? `${withSep}.${fracPart}` : withSep;

    return `${prefix}${valueText}${suffix}`;
  };

  useEffect(() => {
    if (!startOnView) return;
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCounting(true);
          if (once) observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [startOnView, once, threshold]);

  const { value } = useCountUp({
    isCounting,
    start,
    end,
    duration,
    decimalPlaces: decimals,
    thousandsSeparator: separator,
    prefix,
    suffix,
  });

  const displayValue = isCounting ? value : formatStaticValue(start);

  return (
    <span ref={targetRef} css={style}>
      {displayValue}
    </span>
  );
};

export default CountUpSpan;
