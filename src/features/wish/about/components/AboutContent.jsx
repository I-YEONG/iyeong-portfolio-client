import { useNavigate } from 'react-router';
import { PageHeader } from '@/components/wish/layout/PageHeader';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { AboutBackdrop } from './AboutBackdrop';
import { AboutFooter } from './AboutFooter';
import { AboutHero } from './AboutHero';
import { CouncilGreeting } from './CouncilGreeting';
import { MakersSection } from './MakersSection';
import { VignetteOverlay } from './VignetteOverlay';
/**
 * Behind The Wish — 총학생회 인사와 만든 사람들 (Figma 652:2808 비대위/멋사 인사)
 *
 * Figma 프레임(393 × 2526)을 그대로 옮기기 위해 캔버스 안에서 절대 위치를 사용한다.
 * 캔버스의 y = 0은 Figma의 y = 53(상태바 아래)에 해당한다.
 */
export function AboutContent() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(ROUTES.HOME);
    };
    return (<div className="relative w-full bg-black">
      {/*
         * Figma 652:3094 상단: 높이 63px(상태바 제외), 아래 1px 흰색 17% 선.
         * Figma에서는 Glass 효과(Frost 4)라 뒤 배경이 살짝 비치지만, 웹에서는 헤더 뒤에
         * 배경이 없어 디자인의 해당 영역 색(BLACK)과 같은 결과가 된다.
         *
         * 페이지가 길어서 스크롤하면 제목이 사라진다는 지적이 있어 상단에 고정한다.
         */}
      <PageHeader title="Behind The Wish" onBack={handleBack} className="sticky top-0 z-20 min-h-[63px] border-b border-white/[0.17] bg-black shadow-none"/>

      {/*
         * 캔버스는 컨테이너 폭에 맞춰 통째로 확대·축소된다.
         * 좌표는 Figma 393px 프레임을 100cqw로 환산한 값이다. (1px = 0.2545cqw)
         * 높이 2413px → 613.995cqw
         */}
      {/* 케이크·선물 이미지가 가로로 넘쳐서 여기서 자른다. 바깥에 두면 헤더 sticky가 깨진다. */}
      <div className="@container relative w-full overflow-hidden">
        <div className="relative h-[613.995cqw] w-full">
          <AboutBackdrop />
          <CouncilGreeting />
          <MakersSection />
          <VignetteOverlay />
          <AboutFooter />
          <AboutHero />
        </div>
      </div>
    </div>);
}
