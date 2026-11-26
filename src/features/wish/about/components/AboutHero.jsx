import cheongmyeongLogo from '@/assets/wish/about/cheongmyeong-logo-hero.svg';
import heroCross from '@/assets/wish/about/hero-cross.svg';
import heroStar from '@/assets/wish/about/hero-star.svg';
import likelionLogo from '@/assets/wish/about/likelion-logo.svg';
import mainLogo from '@/assets/wish/about/main-logo.svg';
import stars from '@/assets/wish/about/stars.svg';
/** 상단 로고 영역과 주최 로고 (Figma 652:3009 메인로고 · 652:3021 · 652:3022 별 · 652:3043 삼멋x비대위) */
export function AboutHero() {
    return (<>
      <img src={stars} alt="" aria-hidden className="pointer-events-none absolute top-[2.799cqw] left-1/2 h-[501.018cqw] w-[105.089cqw] max-w-none -translate-x-[52.824cqw]"/>

      <p className="absolute top-[8.397cqw] left-1/2 h-[8.142cqw] w-[64.122cqw] -translate-x-1/2 text-center leading-[8.142cqw] font-light text-[#adaeff] [text-shadow:0_0_4px_#00EAFF]">
        <span className="text-[3.562cqw]">삼육대학교 개교 </span>
        <span className="text-[5.089cqw]">120 </span>
        <span className="text-[3.562cqw]">주년 기념 천보축전</span>
      </p>

      <h2 className="absolute top-[23.41cqw] left-1/2 -translate-x-[40.585cqw]">
        <img src={mainLogo} alt="Make A Wish" 
    /* 글로우는 SVG 필터에서 뺐다. 내부 필터는 비트맵으로 구워져 iOS에서 깨진다. */
    className="h-[58.67cqw] w-[81.17cqw] max-w-none [filter:drop-shadow(0_0_3.817cqw_rgb(0_234_255/0.8))]"/>
      </h2>

      <img src={heroStar} alt="" aria-hidden className="pointer-events-none absolute top-[117.303cqw] left-1/2 h-[19.898cqw] w-[18.117cqw] max-w-none -translate-x-[8.931cqw]"/>

      {/* 주최: 멋쟁이사자처럼 × 제66대 총학생회 비상대책위원회 '청명' */}
      <img src={likelionLogo} alt="멋쟁이사자처럼 삼육대학교" className="absolute top-[137.405cqw] left-[30.789cqw] h-[8.115cqw] w-[37.165cqw] max-w-none"/>
      <img src={heroCross} alt="" aria-hidden className="absolute top-[149.364cqw] left-[47.964cqw] size-[3.069cqw] max-w-none"/>
      <img src={cheongmyeongLogo} alt="제66대 총학생회 비상대책위원회 청명" className="absolute top-[156.489cqw] left-[23.41cqw] h-[9.669cqw] w-[18.83cqw] max-w-none"/>
      <p className="absolute top-[156.489cqw] left-[43.003cqw] w-[33.588cqw] text-[3.562cqw] leading-[1.2] font-medium text-white">
        제 66대 총학생회
        <br />
        비상대책위원회 ‘청명’
      </p>
    </>);
}
