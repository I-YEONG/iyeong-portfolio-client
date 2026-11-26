import cake from '@/assets/wish/about/cake.png';
import cheongmyeongLogo from '@/assets/wish/about/cheongmyeong-logo.svg';
import divider from '@/assets/wish/about/divider.svg';
import { SectionHeading } from './SectionHeading';
/** 총학생회 인사 (Figma 652:2903 학생회) */
export function CouncilGreeting() {
    return (<>
      <SectionHeading starTop="187.786cqw" titleTop="198.473cqw">
        총학생회
      </SectionHeading>

      {/* 케이크 이미지 (좌우로 화면을 넘어간다) */}
      <div aria-hidden className="pointer-events-none absolute top-[217.557cqw] left-1/2 h-[151.399cqw] w-[147.074cqw] -translate-x-1/2 overflow-hidden [filter:drop-shadow(0_0_24px_#9D9DFF)]">
        <img src={cake} alt="" className="relative top-[-19.61%] h-[129.53%] w-full max-w-none"/>
      </div>

      <img src={cheongmyeongLogo} alt="" aria-hidden className="absolute top-[254.962cqw] left-[22.901cqw] h-[10.178cqw] w-[18.321cqw] max-w-none"/>
      <p className="absolute top-[254.962cqw] left-[41.985cqw] w-[33.079cqw] text-[3.562cqw] leading-[1.2] font-medium text-[#0011b6]">
        제 66대 총학생회
        <br />
        비상대책위원회 ‘청명’
      </p>
      <img src={divider} alt="" aria-hidden className="absolute top-[267.176cqw] left-[26.463cqw] h-[0.254cqw] w-[44.402cqw] max-w-none"/>

      <div className="absolute top-[269.72cqw] left-1/2 w-[76.081cqw] -translate-x-1/2 text-center text-[3.562cqw] leading-[1.26] font-light text-[#1c7ac7]">
        <p>
          안녕하세요,
          <br />
          삼육대학교 제66대 총학생회
          <br />
          비상대책위원회 ‘청명’입니다.
        </p>
        <p className="mt-[2.799cqw]">
          삼육대학교 개교 120주년을
          <br />
          맞이한 올해 천보축전은
          <br />
          WISH (Make a Wish)라는 이름으로
          <br />
          여러분과 함께합니다.
        </p>
        <p className="mt-[2.799cqw]">
          생일날 소원을 빌듯, 축제의 모든 순간이
          <br />
          여러분의 바람과 설렘으로 채워져 오래도록
          <br />
          기억될 특별한 하루가 되길 바랍니다.
        </p>
        <p className="mt-[2.799cqw] leading-normal">감사합니다.</p>
      </div>
    </>);
}
