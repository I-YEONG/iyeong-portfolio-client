import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import closeIcon from '../assets/close.svg';
import loginLogo from '../assets/login-logo.svg';
import schoolMark from '../assets/school-mark.svg';
import signupEnter from '../assets/signup-enter.svg';
import { useAuthSession } from '../hooks/useAuthSession';
import { useSchoolAuthorization } from '../hooks/useSchoolAuthorization';
import { useLoginModal } from '../hooks/useLoginModal';
import { useRecovery } from '../hooks/useRecovery';
import { AuthFeedback } from './AuthFeedback';
import { LoginForm } from './LoginForm';
import { RecoveryCard } from './RecoveryCard';
import styles from './entry.module.css';
import recoveryStyles from './recovery.module.css';
export function LoginScreen() {
    const { isAuthenticated } = useAuthSession();
    const location = useLocation();
    const navigate = useNavigate();
    const authorization = useSchoolAuthorization();
    const { card: cardRef, closing, close, signal, onKeyDown, onPointerDown, onPointerUp, onPointerCancel, } = useLoginModal();
    const recovery = useRecovery();
    const recoveryMode = recovery.state.mode;
    const [loginLifetime, setLoginLifetime] = useState(() => new AbortController());
    const loginSignal = useMemo(() => AbortSignal.any([signal, loginLifetime.signal]), [signal, loginLifetime]);
    const findTrigger = useRef(null);
    const resetTrigger = useRef(null);
    const returnToTrigger = useRef(null);
    useLayoutEffect(() => {
        if (!recoveryMode && returnToTrigger.current) {
            ;
            (returnToTrigger.current === 'find' ? findTrigger : resetTrigger).current?.focus({
                preventScroll: true,
            });
            returnToTrigger.current = null;
        }
    }, [recoveryMode]);
    function openRecovery(mode) {
        // 렌더링/cleanup을 기다리지 않고 이전 로그인 응답의 세션 생성을 차단한다.
        loginLifetime.abort();
        returnToTrigger.current = mode;
        setNotice(null);
        recovery.controller.open(mode);
        setLoginLifetime(new AbortController());
    }
    function closeRecovery() {
        recovery.controller.close();
    }
    const [feedbackTarget, setFeedbackTarget] = useState(null);
    const [notice, setNotice] = useState(() => location.state?.signupComplete === true
        ? {
            id: 'login-notice',
            text: '회원가입이 완료되었습니다. 설정한 축제 사이트 아이디와 비밀번호로 로그인해 주세요.',
            tone: 'success',
        }
        : null);
    if (isAuthenticated)
        return <Navigate to={ROUTES.HOME} replace/>;
    return (<main className={`${styles.authFrame} ${recoveryMode ? recoveryStyles.frame : styles.loginFrame} ${closing ? styles.closing : ''}`} data-auth-frame="login" onPointerDown={recoveryMode ? undefined : onPointerDown} onPointerUp={recoveryMode ? undefined : onPointerUp} onPointerCancel={onPointerCancel}>
      <section ref={cardRef} role="dialog" aria-modal="true" aria-labelledby={recoveryMode ? 'recovery-title' : 'login-title'} onKeyDown={(event) => {
            if (recoveryMode && event.key === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                closeRecovery();
            }
            else
                onKeyDown(event);
        }} inert={closing} className={`${styles.authBoundary} ${styles.loginCard}`}>
        {recoveryMode ? (<RecoveryCard controller={recovery.controller} state={recovery.state} onClose={closeRecovery}/>) : (<>
            <div data-auth-card="login" className={`${styles.authCard} px-[18px] pt-[19px] pb-[23px] text-black`}>
              <h1 id="login-title" tabIndex={-1} className="sr-only">
                Make A Wish 로그인
              </h1>
              <button type="button" onClick={close} aria-label="로그인 닫기" className="absolute top-1 right-1 flex size-11 items-center justify-center rounded">
                <img src={closeIcon} alt="" width={38} height={38}/>
              </button>
              <img src={loginLogo} alt="" width={107} height={77} 
        /* 글로우는 SVG 필터에서 뺐다. 내부 필터는 비트맵으로 구워져 iOS에서 깨진다. */
        className="mx-auto block h-[77px] w-[107px] [filter:drop-shadow(0_0_4px_rgb(45_125_200))]"/>
              <LoginForm signal={loginSignal} feedbackTarget={feedbackTarget}/>
              <div className="mt-4 flex min-h-8 flex-wrap items-center justify-center gap-x-6 text-sm font-medium text-gray-04">
                <button ref={findTrigger} type="button" onClick={() => openRecovery('find')} className="min-h-8 underline underline-offset-2">
                  아이디 찾기
                </button>
                <button ref={resetTrigger} type="button" onClick={() => openRecovery('reset')} className="min-h-8 underline underline-offset-2">
                  비밀번호 재설정
                </button>
              </div>
              <div className="mt-5 flex h-[23px] items-center gap-2 text-sm text-gray-04">
                <span className="h-px flex-1 bg-gray-01"/>
                <span>회원가입</span>
                <span className="h-px flex-1 bg-gray-01"/>
              </div>
              <div className="-mx-px mt-5 grid grid-cols-[minmax(0,1.825fr)_minmax(0,1fr)] gap-2.5 text-white">
                <button type="button" onClick={authorization.start} disabled={authorization.isStarting} aria-busy={authorization.isStarting} className="relative h-28 overflow-hidden rounded bg-linear-to-b from-[#2d5d80] to-blue p-2.5 text-left">
                  <img src={schoolMark} alt="" width={171} height={171} className="pointer-events-none absolute top-[3px] left-[41px] size-[171px] max-w-none"/>
                  <span className="relative block h-full text-shadow-[0_0_4px_#00000073]">
                    <span className="whitespace-nowrap">
                      <span className="text-[clamp(17px,5.6vw,22px)] font-semibold">SU-Wings</span>{' '}
                      <span className="text-sm">에서</span>
                    </span>
                    <span className="block text-[clamp(13px,4vw,16px)]">
                      {authorization.isStarting ? '학교 로그인으로 이동 중…' : '내 정보 불러오기'}
                    </span>
                  </span>
                </button>
                <Link to={ROUTES.SIGNUP} className="relative flex h-28 items-end justify-center overflow-hidden rounded bg-gray-04 px-1 pb-3 text-center text-[clamp(11px,3.56vw,14px)]">
                  <img src={signupEnter} alt="" width={55} height={53} className="absolute top-4 left-3.5 h-[53px] w-[55px]"/>
                  <span>직접 입력하기</span>
                </Link>
              </div>
              <a href="https://www.instagram.com/likelion_syu/" target="_blank" rel="noopener noreferrer" className="mx-auto mt-3 flex min-h-8 w-fit items-center text-sm font-medium text-gray-04 underline underline-offset-2">
                회원가입 및 학생인증 도우미<span className="sr-only"> (새 탭)</span>
              </a>
            </div>
            <div ref={setFeedbackTarget}/>
            {notice && (<AuthFeedback items={[
                    {
                        ...notice,
                        action: {
                            label: '안내 닫기',
                            onClick: () => {
                                setNotice(null);
                                if (location.state?.signupComplete === true)
                                    navigate(location.pathname, { replace: true, state: null });
                            },
                        },
                    },
                ]}/>)}
          </>)}
      </section>
    </main>);
}
