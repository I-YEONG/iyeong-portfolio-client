import { useEffect, useId, useRef, useState } from 'react';
import { IconHome, IconChevronsLeft, IconChevronsRight, IconMail, IconMapPin, IconMessageCircle, IconMicrophone2, } from '@tabler/icons-react';
import lineupOpenBackground from '@/assets/wish/lineup/lineup-open-bg.png';
import timetableBackground from '@/assets/wish/lineup/timetable-bg.png';
import makeAWishLogo from '@/assets/wish/make-a-wish-logo.svg';
import voteIcon from '@/assets/wish/material-symbols_how-to-vote-outline-rounded.svg';
import { BottomNavigation } from '@/components/wish/layout/BottomNavigation';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { usePerformances } from '../hooks/usePerformances';
import { getTimetablePublishedAt, hasReleaseStarted } from '../lib/release';
import { TimetablePanel } from './TimetablePanel';
import { TimetableReleaseDialog } from './TimetableReleaseDialog';
// imageScale은 회전된 별 끝까지 사진을 채우는 여유 배율이다.
const artistStarSlots = [
    {
        position: 'first',
        imageScale: 1.12,
        imagePosition: '55% 0%',
        imageOffsetY: 6,
        color: '#4bbcff',
        className: 'top-[18%] -left-[4%] w-[76%]',
        labelLeft: '48.5%',
        labelRotation: 0,
    },
    {
        position: 'second',
        imageScale: 1.16,
        imageOffsetY: 0,
        imagePosition: '50% 35%',
        color: '#ff82d5',
        className: 'top-[35%] -right-[13%] w-[76%]',
        labelLeft: '52.5%',
        labelRotation: -37,
    },
    {
        position: 'third',
        imageScale: 1.08,
        imagePosition: '50% 5%',
        imageOffsetY: 0,
        color: '#ffe7a8',
        className: 'top-[48%] -left-[4%] w-[76%]',
        labelLeft: '48.5%',
        labelRotation: 11,
    },
    {
        position: 'fourth',
        imageScale: 1.08,
        imageOffsetY: 0,
        imagePosition: '50% 50%',
        color: '#7fff94',
        className: 'top-[64.5%] -right-[12%] w-[76%]',
        labelLeft: '48.5%',
        labelRotation: -8,
    },
    {
        position: 'fifth',
        imageScale: 1.06,
        imageOffsetY: 0,
        imagePosition: '50% 15%',
        color: '#d86cff',
        className: 'top-[76%] -left-[20%] w-[76%]',
        labelLeft: '48.5%',
        labelRotation: 8,
    },
];
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
function getPerformanceStartTime(performance) {
    if (!performance.startsAt) {
        return Number.POSITIVE_INFINITY;
    }
    const startTime = Date.parse(performance.startsAt);
    return Number.isNaN(startTime) ? Number.POSITIVE_INFINITY : startTime;
}
function getLineupPerformers(performances) {
    const sortedPerformances = (performances ?? []).toSorted((first, second) => getPerformanceStartTime(first) - getPerformanceStartTime(second));
    return [
        ...sortedPerformances.filter(({ category }) => category === 'CELEBRITY'),
        ...sortedPerformances.filter(({ category }) => category === 'MC'),
    ].slice(0, artistStarSlots.length);
}
function ArtistStarFrame({ rotation }) {
    return (<svg aria-hidden="true" viewBox="0 0 316 314" className="pointer-events-none absolute inset-0 z-0 size-full" style={{ filter: 'drop-shadow(0 0 10px currentColor)', transform: `rotate(${rotation}deg)` }}>
      <path d="M217.105 94.3102L287.816 119.776C289.361 120.321 290.757 121.218 291.895 122.396C293.032 123.574 293.88 125 294.371 126.563C294.861 128.125 294.982 129.78 294.722 131.397C294.462 133.014 293.829 134.548 292.874 135.878L247.18 195.695C244.661 199.027 243.238 203.059 243.109 207.234L240.223 282.529C240.165 284.176 239.722 285.786 238.929 287.231C238.137 288.676 237.017 289.915 235.659 290.848C234.301 291.782 232.744 292.385 231.111 292.608C229.478 292.832 227.816 292.669 226.257 292.134L155.189 267.223C151.248 265.823 146.969 265.683 142.945 266.823L70.6802 287.663C69.0922 288.115 67.4203 288.187 65.7991 287.875C64.1779 287.563 62.6528 286.874 61.3463 285.865C60.0397 284.855 58.9883 283.553 58.2767 282.063C57.5651 280.574 57.213 278.938 57.249 277.287L59.0126 202.079C59.0288 197.902 57.7475 193.823 55.3459 190.405L13.195 128.018C12.2824 126.649 11.7026 125.087 11.5016 123.454C11.3006 121.822 11.4841 120.165 12.0375 118.616C12.5909 117.067 13.4988 115.669 14.6888 114.534C15.8787 113.399 17.3177 112.557 18.8908 112.077L90.9284 90.5115C94.948 89.3396 98.4936 86.9257 101.057 83.6153L147.728 24.3757C148.758 23.0929 150.072 22.0669 151.566 21.3779C153.06 20.6889 154.694 20.3556 156.338 20.405C157.983 20.4543 159.593 20.8847 161.043 21.6621C162.493 22.4394 163.743 23.5427 164.694 24.885L207.494 86.8031C209.866 90.2186 213.217 92.8358 217.105 94.3102Z" fill="currentColor"/>
    </svg>);
}
function ArtistStarLoadingFrame({ slot }) {
    return (<div className={`absolute z-[1] ${slot.className}`} aria-hidden="true">
      <div className="relative aspect-[316/314] w-full" style={{ color: slot.color }}>
        <ArtistStarFrame rotation={-slot.labelRotation}/>
      </div>
    </div>);
}
function ArtistStar({ performer, slot }) {
    const clipPathId = useId().replace(/:/g, '');
    const gradientId = useId().replace(/:/g, '');
    const starRotation = -slot.labelRotation;
    const starRadians = (starRotation * Math.PI) / 180;
    const textShadow = `0 1px 4px rgb(0 0 0 / 0.85), 0 0 5px ${slot.color}, 0 0 10px ${slot.color}`;
    const memberName = performer.memberNames[0];
    return (<article aria-label={`${performer.teamName ?? '연예인'} 라인업`} className={`absolute z-[1] ${slot.className}`}>
      <div className="relative aspect-[316/314] w-full" style={{ color: slot.color }}>
        <div className="pointer-events-none absolute z-20 aspect-[248/238] w-[78.5%] -translate-x-1/2 -translate-y-1/2" style={{
            clipPath: `url(#${clipPathId})`,
            left: `${50 - 1.5 * Math.cos(starRadians)}%`,
            top: `${50 - 1.5 * (316 / 314) * Math.sin(starRadians)}%`,
        }}>
          {performer.imageUrl && (<img src={performer.imageUrl} alt="" decoding="async" className="absolute inset-0 size-full object-cover" style={{
                objectPosition: slot.imagePosition,
                transform: `translateY(${slot.imageOffsetY}%) scale(${slot.imageScale})`,
            }}/>)}
          <svg aria-hidden="true" viewBox="0 0 248 238" className="absolute inset-0 size-full overflow-visible">
            <defs>
              <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                <path transform={`scale(${1 / 248} ${1 / 238}) rotate(${starRotation} 124 119)`} d="M179.514 64.5065L241.229 86.7325C242.576 87.208 243.795 87.9908 244.788 89.0189C245.781 90.0469 246.521 91.2921 246.949 92.6557C247.377 94.0192 247.482 95.4638 247.256 96.875C247.029 98.2861 246.477 99.6251 245.643 100.786L205.763 152.992C203.564 155.9 202.322 159.419 202.209 163.063L199.691 228.779C199.64 230.216 199.253 231.621 198.561 232.882C197.87 234.143 196.892 235.224 195.707 236.039C194.522 236.854 193.163 237.381 191.738 237.575C190.313 237.77 188.862 237.629 187.501 237.162L125.475 215.42C122.036 214.198 118.301 214.076 114.789 215.07L51.7184 233.26C50.3324 233.654 48.8733 233.717 47.4583 233.444C46.0434 233.172 44.7123 232.571 43.572 231.69C42.4317 230.809 41.514 229.672 40.893 228.372C40.2719 227.072 39.9646 225.644 39.996 224.204L41.5353 158.564C41.5494 154.919 40.4312 151.358 38.3351 148.376L1.54697 93.9256C0.750505 92.7313 0.244425 91.3675 0.0690075 89.9428C-0.10641 88.518 0.0537352 87.0719 0.536722 85.7201C1.01971 84.3683 1.81216 83.1483 2.8507 82.1573C3.88924 81.1663 5.14515 80.4318 6.51809 80.0126L69.3904 61.1911C72.8986 60.1683 75.9932 58.0615 78.2306 55.1723L118.964 3.46972C119.863 2.35011 121.01 1.45466 122.313 0.853306C123.617 0.251952 125.043 -0.0389089 126.478 0.00415058C127.913 0.0472101 129.319 0.422887 130.585 1.10133C131.85 1.77977 132.941 2.74272 133.771 3.91422L171.125 57.9546C173.196 60.9355 176.12 63.2197 179.514 64.5065Z"/>
              </clipPath>
              <linearGradient id={gradientId} x1="124" x2="124" y1="83" y2="238" gradientUnits="userSpaceOnUse">
                <stop stopColor="black" stopOpacity="0"/>
                <stop offset="1" stopColor="black"/>
              </linearGradient>
            </defs>
            {!performer.imageUrl && (<rect x="-124" y="-119" width="496" height="476" fill="#535353"/>)}
            <rect x="-124" y="-119" width="496" height="476" fill={`url(#${gradientId})`}/>
          </svg>
        </div>

        {(performer.teamName || memberName) && (<div className="pointer-events-none absolute inset-0 z-30" style={{ transform: `rotate(${starRotation}deg)` }}>
            <div className="pointer-events-none absolute top-[62%] z-30 w-[54%] text-center text-white" style={{
                left: slot.labelLeft,
                textShadow,
                transform: `translateX(-50%) rotate(${slot.labelRotation}deg)`,
            }}>
              {performer.teamName && (<p className="font-display text-[20px] leading-none font-medium whitespace-nowrap">
                  {performer.teamName}
                </p>)}
              {memberName && (<p className="mt-1 font-body text-[13px] leading-[1.1] font-medium whitespace-nowrap">
                  {memberName}
                </p>)}
            </div>
          </div>)}

        <ArtistStarFrame rotation={-slot.labelRotation}/>
      </div>
    </article>);
}
/** 공개 후 라인업과 타임테이블 사이를 전환하는 화면이다. */
export function PerformanceReleased({ forceTimetableReleased = false, }) {
    const { data: performances, isPending } = usePerformances();
    const [activeView, setActiveView] = useState('lineup');
    const [isSwitchButtonVisible, setIsSwitchButtonVisible] = useState(true);
    const fadeInTimerRef = useRef(null);
    const switchButtonRef = useRef(null);
    const swipeStartRef = useRef(null);
    const isLineup = activeView === 'lineup';
    const nextView = isLineup ? 'timetable' : 'lineup';
    const nextLabel = isLineup ? 'Time Table' : 'LINE UP';
    const lineupHeight = 'max(100cqh, calc(min(100cqw, 480px) * 1934 / 393))';
    const timetableMinHeight = 'max(100cqh, calc(min(100cqw, 480px) * 1224 / 393))';
    const celebrityPerformers = getLineupPerformers(performances);
    const timetableReleaseAt = getTimetablePublishedAt(performances ?? []);
    const isTimetableReleased = forceTimetableReleased || (!!timetableReleaseAt && hasReleaseStarted(timetableReleaseAt));
    useEffect(() => {
        return () => {
            if (fadeInTimerRef.current !== null) {
                window.clearTimeout(fadeInTimerRef.current);
            }
        };
    }, []);
    const handleSwitchView = () => {
        swipeStartRef.current = null;
        if (!isSwitchButtonVisible) {
            return;
        }
        if (fadeInTimerRef.current !== null) {
            window.clearTimeout(fadeInTimerRef.current);
        }
        setIsSwitchButtonVisible(false);
        setActiveView(nextView);
        fadeInTimerRef.current = window.setTimeout(() => {
            setIsSwitchButtonVisible(true);
        }, 500);
    };
    const handleSwipeStart = (event) => {
        swipeStartRef.current = null;
        if (event.pointerType !== 'touch' ||
            !event.isPrimary ||
            !isSwitchButtonVisible ||
            !(event.target instanceof Element) ||
            !event.currentTarget.contains(event.target) ||
            event.target.closest('button, a, input, select, textarea, [role="dialog"]')) {
            return;
        }
        swipeStartRef.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
        };
    };
    const handleSwipeMove = (event) => {
        const start = swipeStartRef.current;
        if (!start || start.pointerId !== event.pointerId)
            return;
        const distanceX = Math.abs(event.clientX - start.x);
        const distanceY = Math.abs(event.clientY - start.y);
        if (distanceY > 10 && distanceY > distanceX) {
            swipeStartRef.current = null;
        }
    };
    const handleSwipeEnd = (event) => {
        const start = swipeStartRef.current;
        swipeStartRef.current = null;
        if (!start || start.pointerId !== event.pointerId)
            return;
        const distanceX = event.clientX - start.x;
        const distanceY = event.clientY - start.y;
        if (Math.abs(distanceX) < 60 || Math.abs(distanceX) < Math.abs(distanceY) * 1.5)
            return;
        if ((isLineup && distanceX < 0) || (!isLineup && distanceX > 0)) {
            handleSwitchView();
        }
    };
    const handleCloseReleaseDialog = () => {
        if (fadeInTimerRef.current !== null) {
            window.clearTimeout(fadeInTimerRef.current);
        }
        setActiveView('lineup');
        setIsSwitchButtonVisible(true);
        window.requestAnimationFrame(() => switchButtonRef.current?.focus({ preventScroll: true }));
    };
    return (<main className="relative isolate min-h-dvh overflow-x-hidden bg-black">
      <h1 className="sr-only">연예인 공개</h1>

      <div onPointerDown={handleSwipeStart} onPointerMove={handleSwipeMove} onPointerUp={handleSwipeEnd} onPointerCancel={() => {
            swipeStartRef.current = null;
        }} className={[
            'relative min-h-dvh w-[200%] touch-pan-y touch-pinch-zoom overflow-hidden transition-transform duration-500 ease-out motion-reduce:transition-none',
            activeView === 'lineup' ? 'translate-x-0' : '-translate-x-1/2',
        ].join(' ')} style={{ height: isLineup ? lineupHeight : undefined }}>
        <section id="lineup-panel" aria-hidden={activeView !== 'lineup'} inert={activeView !== 'lineup'} className="absolute top-0 left-0 w-1/2 overflow-hidden bg-[length:100%_auto] bg-top bg-no-repeat" style={{ height: lineupHeight, backgroundImage: `url(${lineupOpenBackground})` }}>
          {isPending
            ? artistStarSlots.map((slot) => (<ArtistStarLoadingFrame key={slot.position} slot={slot}/>))
            : celebrityPerformers.map((performer, index) => (<ArtistStar key={performer.id ?? performer.teamName ?? index} performer={performer} slot={artistStarSlots[index]}/>))}
        </section>
        <section id="timetable-panel" aria-hidden={activeView !== 'timetable'} inert={activeView !== 'timetable'} className="relative ml-auto w-1/2 bg-[length:100%_auto] bg-top bg-no-repeat pt-[364px] pb-[calc(122px+env(safe-area-inset-bottom))] max-[480px]:pt-[320px]" style={{ minHeight: timetableMinHeight, backgroundImage: `url(${timetableBackground})` }}>
          {isTimetableReleased && (<TimetablePanel performances={performances} isPending={isPending}/>)}
        </section>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-[96px] max-[480px]:pt-[64px] max-[390px]:pt-[42px]">
        <img src={makeAWishLogo} alt="" className="w-[154px]"/>

        <div className="pointer-events-auto relative -mt-2 h-[72px] w-full max-[480px]:-mt-4">
          <button ref={switchButtonRef} type="button" aria-controls={`${nextView}-panel`} aria-label={`${nextLabel} 보기`} disabled={!isSwitchButtonVisible} onClick={handleSwitchView} className={[
            'absolute -top-1 flex min-h-11 min-w-20 flex-col text-white hover:opacity-100 focus-visible:z-10 disabled:pointer-events-none motion-reduce:translate-x-0 motion-reduce:transition-none',
            isLineup ? 'right-5 items-end text-right' : 'left-5 items-start text-left',
            isSwitchButtonVisible
                ? 'translate-x-0 opacity-90 transition-[opacity,transform] duration-[360ms] ease-out'
                : ['opacity-0 transition-none', isLineup ? '-translate-x-2' : 'translate-x-2'].join(' '),
        ].join(' ')}>
            {isLineup ? (<IconChevronsRight size={30} stroke={2.3}/>) : (<IconChevronsLeft size={30} stroke={2.3}/>)}
            <span className="mt-1 font-display text-[18px] font-medium whitespace-nowrap text-white">
              {nextLabel}
            </span>
          </button>
        </div>
      </div>

      <BottomNavigation items={navigationItems} activeId="performances" className="fixed right-0 bottom-[calc(26px+env(safe-area-inset-bottom))] left-0 z-10"/>
      {!isLineup && !isTimetableReleased && (<TimetableReleaseDialog releaseAt={timetableReleaseAt} onClose={handleCloseReleaseDialog}/>)}
    </main>);
}
