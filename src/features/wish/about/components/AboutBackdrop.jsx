import constellations from '@/assets/wish/about/constellations.png';
import shootingStar from '@/assets/wish/about/shooting-star.png';
import { GrainOverlay } from './GrainOverlay';
/**
 * 페이지 전체 배경 (Figma 652:2809 배경 · 652:2812 · 652:2815 별자리모음 · 652:2902 큰 별똥별)
 *
 * 별자리모음은 벡터 60여 개로 이루어져 있어 Figma에서 레이어 전체를 PNG로 내보내 사용한다.
 */
export function AboutBackdrop() {
    return (<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 배경색: 밤하늘 → 민트 그라데이션 */}
      <div className="absolute top-[-28.244cqw] left-1/2 h-[219.084cqw] w-[100cqw] -translate-x-1/2 bg-[linear-gradient(180deg,#080C18_12%,#18365C_51%,#35FFF5_100%)]"/>
      <div className="absolute top-[190.84cqw] left-1/2 h-[423.155cqw] w-[100cqw] -translate-x-1/2 bg-main-01"/>

      {/* 그레인은 배경 사각형에만 적용된다. 별·그림·푸터는 Figma에서 깨끗하다. */}
      <GrainOverlay />

      {/* 보라색 띠 (위/아래 대칭) */}
      <div className="absolute top-[187.532cqw] left-1/2 h-[139.186cqw] w-[100.509cqw] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(89,104,193,0)_0%,#2A315B_60.096%)]"/>
      <div className="absolute top-[321.12cqw] left-1/2 h-[56.743cqw] w-[100.509cqw] -translate-x-1/2 bg-[linear-gradient(0deg,rgba(89,104,193,0)_0%,#2A315B_64.904%)]"/>

      {/* 별자리 */}
      <img src={constellations} alt="" className="absolute top-[-28.753cqw] left-1/2 h-[471.501cqw] w-[100cqw] max-w-none -translate-x-1/2"/>

      {/* 큰 별똥별 */}
      <div className="absolute top-[-0.509cqw] left-1/2 flex h-[157.761cqw] w-[154.198cqw] -translate-x-[106.743cqw] items-center justify-center">
        <div className="h-[134.097cqw] w-[129.517cqw] rotate-[-11.72deg] overflow-hidden">
          <img src={shootingStar} alt="" className="relative top-[-61.11%] left-[-32.61%] h-[222.67%] w-[153.7%] max-w-none"/>
        </div>
      </div>
    </div>);
}
