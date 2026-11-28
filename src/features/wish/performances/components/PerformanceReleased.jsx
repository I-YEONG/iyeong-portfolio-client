import { useEffect, useRef, useState } from 'react';
import { IconHome, IconChevronsLeft, IconChevronsRight, IconMail, IconMapPin, IconMessageCircle, IconMicrophone2, } from '@tabler/icons-react';
import lineupOpenBackground from '@/assets/wish/lineup/lineup-image.png';
import timetableBackground from '@/assets/wish/lineup/timetable-bg.png';
import makeAWishLogo from '@/assets/wish/make-a-wish-logo.svg';
import voteIcon from '@/assets/wish/material-symbols_how-to-vote-outline-rounded.svg';
import { BottomNavigation } from '@/components/wish/layout/BottomNavigation';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { usePerformances } from '../hooks/usePerformances';
import { getTimetablePublishedAt, hasReleaseStarted } from '../lib/release';
import { TimetablePanel } from './TimetablePanel';
import { TimetableReleaseDialog } from './TimetableReleaseDialog';
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
