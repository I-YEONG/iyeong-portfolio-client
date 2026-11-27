import { IconHome, IconMail, IconMapPin, IconMessageCircle, IconMicrophone2, } from '@tabler/icons-react';
import makeAWishLogo from '@/assets/wish/make-a-wish-logo.svg';
import voteIcon from '@/assets/wish/material-symbols_how-to-vote-outline-rounded.svg';
import lineupBackground from '@/assets/wish/lineup/lineup-bg.png';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { formatReleaseAt } from '@/features/wish/shared/lib/format-release-at';
import { BottomNavigation } from './layout/BottomNavigation';
const navigationItems = [
    { id: 'booths', label: '부스 지도', to: ROUTES.BOOTHS, icon: <IconMapPin stroke={2}/> },
    {
        id: 'performances',
        label: '연예인 공개',
        to: ROUTES.PERFORMANCES,
        icon: <IconMicrophone2 stroke={2}/>,
    },
    { id: 'letters', label: '축하 편지', to: ROUTES.LETTERS, icon: <IconMail stroke={2}/> },
    { id: 'polls', label: '투표', to: ROUTES.POLLS, icon: <img src={voteIcon} alt=""/> },
    { id: 'bamboo', label: '대나무숲', to: ROUTES.BAMBOO, icon: <IconMessageCircle stroke={2}/> },
    { id: 'home', label: '홈', to: ROUTES.HOME, icon: <IconHome stroke={2}/> },
];
/** 기능별 역할 문구와 공개 일시를 표시하는 축제 공개 전 안내 화면이다. */
export function PendingRelease({ title, message, singleLine = false, activeNavigationId, ...release }) {
    return (<main className="relative isolate flex h-dvh max-h-dvh flex-col overflow-hidden bg-black bg-cover bg-[center_bottom]" style={{ backgroundImage: `url(${lineupBackground})` }}>
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[clamp(220px,36dvh,313px)] bg-gradient-to-b from-black to-transparent"/>

      <h1 className="sr-only">{title}</h1>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-between px-4 pt-[max(96px,calc(env(safe-area-inset-top)+72px))] pb-[clamp(24px,4dvh,40px)]">
        <p className="text-center font-display text-[14px] font-light text-[#adaeff] [text-shadow:0_0_4px_#00eaff]">
          삼육대학교 개교 <span className="text-[20px]">120</span> 주년 기념 천보축전
        </p>

        {/* 글로우는 SVG 필터에서 뺐다. 내부 필터는 비트맵으로 구워져 iOS에서 깨진다. */}
        <img src={makeAWishLogo} alt="" className="w-[66.4%] max-w-[319px] [filter:drop-shadow(0_0_12.2px_rgb(0_234_255/0.8))]"/>

        <p className="text-center font-display text-[16px] leading-normal font-light text-[#c0c2ff] [text-shadow:0_0_4px_#00eaff]">
          {message}
          {singleLine ? ' ' : <br />}
          {'releaseAt' in release && release.releaseAt ? (<>
              <time dateTime={release.releaseAt}>{formatReleaseAt(release.releaseAt)}</time>에
              공개됩니다.
            </>) : (release.releaseMessage)}
        </p>
      </div>

      <BottomNavigation items={navigationItems} activeId={activeNavigationId} className="mb-[max(26px,calc(env(safe-area-inset-bottom)+26px))] shrink-0"/>
    </main>);
}
