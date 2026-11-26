import bottomGlow from '@/assets/wish/about/bottom-glow.svg';
import bulletStar from '@/assets/wish/about/bullet-star.svg';
import divider from '@/assets/wish/about/divider.svg';
import gift from '@/assets/wish/about/gift.png';
import likelion14thLogo from '@/assets/wish/about/likelion-14th-logo.svg';
import { trackEvent } from '@/features/wish/shared/lib/analytics';
import { LIKELION_SITE_URL, MAKER_PARTS } from '../constants';
import { SectionHeading } from './SectionHeading';
/** 파트별 명단의 캔버스 기준 top (px). MAKER_PARTS와 같은 순서 (Figma 652:2977) */
const PART_TOPS = ['530.789cqw', '543.257cqw', '555.725cqw', '573.028cqw'];
/** 만든이들 — 멋쟁이사자처럼 소개와 제작 명단 (Figma 652:2940 멋사) */
export function MakersSection() {
    return (<>
      <SectionHeading starTop="391.349cqw" titleTop="402.036cqw">
        만든이들
      </SectionHeading>

      {/* 하단 빛 번짐 */}
      <img src={bottomGlow} alt="" aria-hidden className="pointer-events-none absolute top-[487.277cqw] left-1/2 h-[93.893cqw] w-[100cqw] max-w-none -translate-x-1/2"/>

      {/* 선물 이미지 (좌우로 화면을 넘어간다) */}
      <div aria-hidden className="pointer-events-none absolute top-[421.12cqw] left-1/2 h-[87.786cqw] w-[105.852cqw] -translate-x-[52.036cqw] overflow-hidden [filter:drop-shadow(0_0_24px_#9D9DFF)]">
        <img src={gift} alt="" className="relative top-[-30.66%] h-[160.74%] w-full max-w-none"/>
      </div>

      <img src={likelion14thLogo} alt="" aria-hidden className="absolute top-[443.257cqw] left-[28.244cqw] h-[9.277cqw] w-[42.494cqw] max-w-none"/>
      <p className="absolute top-[454.707cqw] left-[33.842cqw] text-[3.562cqw] leading-[1.2] font-medium text-[#002956]">
        멋쟁이사자처럼 14기
      </p>
      <img src={divider} alt="" aria-hidden className="absolute top-[464.377cqw] left-[27.481cqw] h-[0.254cqw] w-[44.402cqw] max-w-none"/>
      <p className="absolute top-[467.684cqw] left-1/2 w-[62.595cqw] -translate-x-[31.298cqw] text-center text-[3.562cqw] leading-[1.26] font-light text-[#1c7ac7]">
        멋쟁이사자처럼 삼육대학교는
        <br />
        테크 기반의 아이디어 실현을 위한
        <br />
        전국 최대 규모의 대학연합 IT 동아리이자
        <br />
        삼육대학교 중앙 동아리입니다.
      </p>

      <a href={LIKELION_SITE_URL} target="_blank" rel="noreferrer" onClick={() => trackEvent('EXTERNAL_LINK_CLICK', { route: '/about', targetId: 'likelion' })} className="absolute top-[511.959cqw] left-1/2 flex h-[13.995cqw] w-[53.435cqw] -translate-x-1/2 items-center justify-center rounded-full bg-white/1 text-center text-[4.071cqw] text-white shadow-[inset_0_0_0_1px_rgba(150,240,245,0.36),inset_1px_1px_0_rgba(150,240,245,0.22),inset_-1px_-1px_0_rgba(150,240,245,0.08),inset_2px_0_1px_-1px_rgba(150,240,245,0.45),inset_-2px_0_1px_-1px_rgba(150,240,245,0.32)] backdrop-blur-[3.053cqw] [text-shadow:0_0_4px_#5B36FF]">
        삼육 멋사 14기 바로가기
      </a>

      {MAKER_PARTS.map((maker, index) => (<div key={maker.part} className="absolute left-[24.936cqw] flex text-[3.562cqw] text-white [text-shadow:0_0_7.7px_#007BFF]" style={{ top: PART_TOPS[index] }}>
          <img src={bulletStar} alt="" aria-hidden className="absolute top-[-1.527cqw] left-[-7.379cqw] h-[8.142cqw] w-[8.397cqw] max-w-none"/>
          <p className="w-[7.379cqw] shrink-0 leading-[5.089cqw]">{maker.part}</p>
          <ul className="leading-[5.089cqw]">
            {maker.members.map((member) => (<li key={member}>{member}</li>))}
          </ul>
        </div>))}
    </>);
}
