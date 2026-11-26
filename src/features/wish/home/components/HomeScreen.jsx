import { IconHome, IconInfoCircle, IconMail, IconMapPin, IconMessageCircle, IconMicrophone2, IconSpeakerphone, IconUser, } from '@tabler/icons-react';
import { createElement } from 'react';
import { Link } from 'react-router';
import homeBackground from '@/assets/wish/home/home-bg.png';
import homeBigStar from '@/assets/wish/home/home-big-star.svg';
import homeCake from '@/assets/wish/home/home-cake.svg';
import homePayBackground from '@/assets/wish/home/home-pay-bg.png';
import homePayLogo from '@/assets/wish/home/home-pay-logo.svg';
import homeSuho from '@/assets/wish/home/home-suho.png';
import homeSuya from '@/assets/wish/home/home-suya.png';
import likelionLogo from '@/assets/wish/likelion-logo.svg';
import makeAWishLogo from '@/assets/wish/make-a-wish-logo.svg';
import voteIcon from '@/assets/wish/material-symbols_how-to-vote-outline-rounded.svg';
import { BottomNavigation } from '@/components/wish/layout/BottomNavigation';
import { ROUTES } from '@/features/wish/shared/constants/routes';
const bottomNavigationItems = [
    { id: 'booths', label: '부스맵', to: ROUTES.BOOTHS, icon: <IconMapPin /> },
    { id: 'performances', label: '공연', to: ROUTES.PERFORMANCES, icon: <IconMicrophone2 /> },
    { id: 'letters', label: '120주년 축하편지', to: ROUTES.LETTERS, icon: <IconMail /> },
    { id: 'polls', label: '투표', to: ROUTES.POLLS, icon: <img src={voteIcon} alt=""/> },
    { id: 'bamboo', label: '대나무숲', to: ROUTES.BAMBOO, icon: <IconMessageCircle /> },
    { id: 'home', label: '홈', to: ROUTES.HOME, icon: <IconHome /> },
];
const topNavigationItems = [
    { label: '축제 소개', to: ROUTES.ABOUT, icon: IconInfoCircle },
    { label: '공지사항', to: ROUTES.NOTICES, icon: IconSpeakerphone },
    { label: '마이페이지', to: ROUTES.MY, icon: IconUser },
];
export function HomeScreen({ profileState, headingRef, onRetry }) {
    const isStudentFeePaid = profileState === 'paid';
    const backgroundImage = isStudentFeePaid ? homePayBackground : homeBackground;
    const logoImage = isStudentFeePaid ? homePayLogo : makeAWishLogo;
    return (<main className="relative h-dvh max-h-dvh overflow-hidden overscroll-none bg-black font-display text-white">
      <h1 ref={headingRef} tabIndex={-1} className="sr-only">
        2026 천보축전 메인
      </h1>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-cover bg-top bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}/>

      <img src={homeBigStar} alt="" className="pointer-events-none absolute top-[17.5%] -left-[35.1%] z-10 w-[147.6%] max-w-none max-[400px]:top-[16%] max-[400px]:w-[138%]"/>

      <img src={homeCake} alt="" className="pointer-events-none absolute top-[43.9%] left-1/2 z-20 w-[98%] max-w-none -translate-x-1/2 max-[400px]:top-[45%] max-[400px]:w-[90%]"/>

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30">
        <div className="absolute inset-x-0 top-0 h-[36.7%] bg-gradient-to-b from-black/95 to-black/0"/>
        <div className="absolute top-0 bottom-0 left-0 w-[23.4%] bg-gradient-to-r from-black/85 to-black/0"/>
        <div className="absolute top-0 right-0 bottom-0 w-[23.4%] bg-gradient-to-l from-black/85 to-black/0"/>
      </div>

      {isStudentFeePaid && (<div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40">
          <div className="absolute top-[60.8%] left-[3.3%] w-[19%] home-character-float max-[400px]:top-[61.8%] max-[400px]:w-[17%]">
            <img src={homeSuya} alt="" className="w-full rotate-[14.84deg] drop-shadow-[0_0_9px_#35fff5]"/>
          </div>
          <div className="absolute top-[69.8%] right-3.5 w-[22%] home-character-float home-character-float-delayed max-[400px]:top-[70.8%] max-[400px]:w-[20%]">
            <img src={homeSuho} alt="" className="w-full rotate-[9.29deg] drop-shadow-[0_0_9px_#35fff5]"/>
          </div>
        </div>)}

      <div className="relative z-50 grid h-full grid-rows-[auto_1fr_auto_auto] px-3 pt-[max(14px,env(safe-area-inset-top))] pb-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex h-[52px] items-stretch text-purple [text-shadow:0_0_4px_rgb(0_0_0/0.25)] max-[400px]:h-11">
            <span className="text-[27px] leading-[0.9] font-semibold tracking-[0.23em] max-[400px]:text-[23px]">
              20
              <br />
              26
            </span>
            <span className="ml-1 flex h-[52px] flex-col justify-between text-[11px] leading-none tracking-[0.23em] max-[400px]:h-11 max-[400px]:text-[9.5px]">
              <span>SAHMYOOK</span>
              <span>UNIVERSITY</span>
              <span>FESTIVAL</span>
            </span>
          </div>

          <nav aria-label="보조 메뉴" className="flex items-center gap-1">
            {topNavigationItems.map(({ label, to, icon: Icon }) => (<Link key={label} to={to} aria-label={label} className="grid size-11 place-items-center rounded-full text-white drop-shadow-[0_0_3px_#092978] max-[400px]:size-10">
                {createElement(Icon, { size: label === '공지사항' ? 28 : 25, stroke: 1.8, 'aria-hidden': true, className: 'max-[400px]:scale-90' })}
              </Link>))}
          </nav>
        </div>

        <div className="flex min-h-0 flex-col items-center pt-[clamp(32px,6.2dvh,58px)] max-[400px]:pt-[clamp(24px,5dvh,42px)]">
          <p className="whitespace-nowrap text-[#adaeff] [text-shadow:0_0_4px_#00eaff] max-[400px]:scale-90">
            <span className="text-sm font-light">삼육대학교 개교 </span>
            <span className={[
            'text-xl font-light',
            isStudentFeePaid ? 'text-[#F879FF]' : 'text-[#adaeff]',
        ].join(' ')}>
              120{' '}
            </span>
            <span className="text-sm font-light">주년 기념 천보축전</span>
          </p>

          <img src={logoImage} alt="Make A Wish" 
    /* 글로우는 SVG 필터에서 뺐다. 내부 필터는 비트맵으로 구워져 iOS에서 깨진다.
       납부자용 로고도 viewBox와 필터 값이 같아 같은 값을 쓴다. */
    className="mt-[clamp(30px,4.6dvh,48px)] w-[90%] max-w-[432px] [filter:drop-shadow(0_0_15.8px_rgb(0_234_255/0.8))] max-[400px]:mt-[clamp(22px,3.8dvh,34px)] max-[400px]:w-[83%]"/>
        </div>

        <div className="mb-[clamp(8px,2.5dvh,22px)] grid grid-cols-[44px_fit-content(100%)_44px] items-center justify-between max-[400px]:mb-2 max-[400px]:grid-cols-[40px_fit-content(100%)_40px]">
          <Link to={ROUTES.ABOUT} aria-label="만든 사람들" className="grid size-11 place-items-center rounded-full max-[400px]:size-10">
            <img src={likelionLogo} alt="멋쟁이사자처럼" className="size-[41px] drop-shadow-[0_2px_6px_rgb(0_0_0/0.45)] max-[400px]:size-9"/>
          </Link>

          <p className="text-base font-light whitespace-nowrap text-[#adaeff] [text-shadow:0_0_4px_#00eaff] max-[400px]:text-sm">
            2026.10.06(TUE)
          </p>

          <span aria-hidden="true" className="size-11 max-[400px]:size-10"/>
        </div>

        <BottomNavigation items={bottomNavigationItems} activeId="home" variant={isStudentFeePaid ? 'paid' : 'guest'} className="mb-[max(26px,calc(env(safe-area-inset-bottom)+26px))] shrink-0 max-[400px]:h-16 max-[400px]:w-full max-[400px]:max-w-[340px]"/>
      </div>

      {profileState === 'loading' && (<div role="status" aria-label="로그인 정보를 확인하고 있습니다" className="absolute inset-0 z-[60] grid place-items-center bg-black/55 px-6 font-body backdrop-blur-sm">
          <span aria-hidden="true" className="size-9 animate-spin rounded-full border-2 border-white/30 border-t-main-01"/>
        </div>)}

      {profileState === 'error' && (<div role="alert" className="absolute inset-0 z-[60] grid place-items-center bg-black/55 px-6 font-body text-sm backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <p>로그인 정보를 확인하지 못했습니다.</p>
            {onRetry && (<button type="button" onClick={onRetry} className="min-h-11 rounded-full border border-white/50 px-5 py-2 font-medium">
                다시 시도
              </button>)}
          </div>
        </div>)}

      {profileState !== 'loading' && profileState !== 'error' && (<p className="sr-only" aria-live="polite">
          {profileState === 'paid'
                ? '학생회비 납부자용 메인 화면입니다.'
                : profileState === 'unpaid'
                    ? '학생회비 미납부자용 메인 화면입니다.'
                    : '게스트용 메인 화면입니다.'}
        </p>)}
    </main>);
}
