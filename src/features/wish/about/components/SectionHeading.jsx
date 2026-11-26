import sectionStar from '@/assets/wish/about/section-star.svg';
/** 구분 제목: 별 아이콘 + 제목 (Figma 652:2937 · 652:2941 구분) */
export function SectionHeading({ children, starTop, titleTop }) {
    return (<>
      <img src={sectionStar} alt="" aria-hidden className="pointer-events-none absolute left-1/2 h-[10.687cqw] w-[10.941cqw] max-w-none -translate-x-[5.471cqw]" style={{ top: starTop }}/>
      <h2 className="absolute left-1/2 -translate-x-1/2 text-center text-[5.089cqw] text-white [text-shadow:0_0_4px_#0024FC]" style={{ top: titleTop }}>
        {children}
      </h2>
    </>);
}
