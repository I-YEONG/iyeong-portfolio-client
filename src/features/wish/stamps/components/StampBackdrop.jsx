import shootingStar from '@/assets/wish/about/shooting-star.png';
import sky from '@/assets/wish/stamps/sky.png';
import { StampConstellations } from './StampConstellations';
/** Figma의 배경 레이어 원본. 상태바·헤더 아래(y=113)부터 화면 폭에 맞춰 표시한다. */
export function StampBackdrop() {
    return (<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg viewBox="0 113 393 739" className="block h-auto w-full" focusable="false">
        <image href={sky} width={393} height={852}/>
      </svg>
      <StampConstellations />

      {/* 원본 이미지의 크롭과 회전을 유지한다. 기존 소개 화면과 같은 이미지다. */}
      <div className="absolute top-[16.794cqw] left-[-59.542cqw] flex h-[150.842cqw] w-[147.495cqw] items-center justify-center">
        <div className="relative h-[128.323cqw] w-[124.010cqw] rotate-[-11.722deg] overflow-hidden opacity-57">
          <img src={shootingStar} alt="" className="absolute top-[-61.11%] left-[-32.61%] h-[222.67%] w-[153.7%] max-w-none"/>
        </div>
      </div>
    </div>);
}
