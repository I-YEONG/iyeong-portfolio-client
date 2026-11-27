import vignetteLeft from '@/assets/wish/about/vignette-left.png';
import vignetteRight from '@/assets/wish/about/vignette-right.png';
/** 화면 가장자리를 어둡게 덮는 레이어 (Figma 652:3001 어둠) */
export function VignetteOverlay() {
    return (<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <img src={vignetteLeft} alt="" className="absolute top-[-27.226cqw] left-0 h-[888.041cqw] w-[23.41cqw] max-w-none object-cover"/>
      <img src={vignetteRight} alt="" className="absolute top-[-28.244cqw] right-0 h-[889.059cqw] w-[23.41cqw] max-w-none scale-x-[-1] object-cover"/>
      <div className="absolute top-[-28.244cqw] left-1/2 h-[161.323cqw] w-[100cqw] -translate-x-1/2 bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0)_100%)]"/>
    </div>);
}
