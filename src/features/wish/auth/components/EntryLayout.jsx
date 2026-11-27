import { useEffect, useRef, useSyncExternalStore } from 'react';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import organizerLogo from '../assets/organizer-logo.svg';
import backgroundLogo from '../assets/background-logo.svg';
import { entryHistory, entryIntro } from '../entryLifecycle';
import { useAuthSession } from '../hooks/useAuthSession';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { AuthSessionNotice } from './AuthSessionNotice';
import { LoginBackground } from './LoginBackground';
import styles from './entry.module.css';
/** 첫화면은 이 레이아웃에서 한 번 렌더링하고 인증 라우트만 그 위에 교체한다. */
export function EntryLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthSession();
    const reducedMotion = useReducedMotion();
    const intro = useSyncExternalStore(entryIntro.subscribe, entryIntro.getSnapshot, entryIntro.getSnapshot);
    const overlay = location.pathname.replace(/\/+$/, '') !== ROUTES.LANDING;
    const entryButton = useRef(null);
    const wasOverlay = useRef(overlay);
    useEffect(() => {
        entryIntro.enter(overlay ? '/login' : '/', reducedMotion);
        if (wasOverlay.current && !overlay)
            entryButton.current?.focus({ preventScroll: true });
        wasOverlay.current = overlay;
    }, [location.pathname, overlay, reducedMotion]);
    if (isAuthenticated && !overlay)
        return <Navigate to={ROUTES.HOME} replace/>;
    return (<div className={styles.layout} data-entry-layout>
      <div className={overlay ? styles.coveredLanding : undefined} inert={overlay} aria-hidden={overlay || undefined}>
        <main className={styles.landing} data-entry-landing data-intro-phase={intro.phase}>
          <LoginBackground phase={intro.phase} generation={intro.generation}/>
          <button type="button" aria-label="멋사 로고 — 인트로 다시 재생" className={styles.organizer} onClick={() => entryIntro.restart(reducedMotion)}>
            <img src={organizerLogo} alt="LIKELION at SYU 14th" width={133} height={29}/>
          </button>
          <p className={styles.anniversary}>
            삼육대학교 개교 <span>120</span> 주년 기념 천보축전
          </p>
          <h1 className={styles.brand}>
            <img src={backgroundLogo} alt="Make A Wish" width={356} height={256} 
    /* 글로우는 SVG 필터에서 뺐다. 내부 필터는 비트맵으로 구워져 iOS에서 깨진다. */
    className="[filter:drop-shadow(0_0_15px_rgb(0_234_255/0.8))]"/>
          </h1>
          <p className={styles.date}>
            <time dateTime="2026-10-06">2026.10.06(TUE)</time>
          </p>
          <div className={styles.actions}>
            <button ref={entryButton} type="button" className={styles.entryButton} onClick={() => {
            entryIntro.finish();
            navigate(ROUTES.LOGIN, { state: entryHistory.open(window.history.state?.idx) });
        }}>
              로그인 / 회원가입
            </button>
            <Link to={ROUTES.HOME} className={styles.guest} onClick={entryIntro.finish}>
              게스트 입장
            </Link>
          </div>
          <footer className={styles.terms}>
            <a href="https://festa.syu-likelion.org/terms/privacy" target="_blank" rel="noopener noreferrer">
              개인정보 처리방침
            </a>
            <a href="https://festa.syu-likelion.org/terms/service" target="_blank" rel="noopener noreferrer">
              이용약관
            </a>
          </footer>
          <div className={styles.sessionNotice}>
            <AuthSessionNotice />
          </div>
        </main>
      </div>
      {overlay && <div className={styles.backdrop} aria-hidden="true"/>}
      <Outlet />
    </div>);
}
