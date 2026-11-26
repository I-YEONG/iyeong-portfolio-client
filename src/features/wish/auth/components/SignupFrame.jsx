import { useEffect, useRef } from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import closeIcon from '../assets/close.svg';
import loginLogo from '../assets/login-logo.svg';
import styles from './entry.module.css';
const titles = {
    profile: '본인인증',
    account: '회원 가입',
    optional: '선택 정보',
    terms: '개인정보 처리 방침 및 약관 동의',
};
export function SignupFrame({ step, children, feedback, onClose, busy, manual = false, }) {
    const title = useRef(null);
    useEffect(() => {
        title.current?.focus();
    }, [step]);
    return (<main className={`${styles.authFrame} ${styles.signupFrame}`} data-auth-frame="signup">
      <div className={styles.authBoundary}>
        <section aria-labelledby="signup-title" data-auth-card="signup" data-step={step} className={`${styles.authCard} ${styles.signupCard}`}>
          <button type="button" aria-label="회원가입 취소" onClick={onClose} disabled={busy} className="absolute top-1 right-1 flex size-11 items-center justify-center rounded disabled:opacity-40">
            <img src={closeIcon} alt="" width={38} height={38}/>
          </button>
          <img src={loginLogo} alt="" width={107} height={77} className={styles.authLogo}/>
          <div className={styles.signupHeading}>
            <span />
            <h1 ref={title} tabIndex={-1} id="signup-title">
              {manual && step === 'profile' ? '회원 가입' : titles[step]}
            </h1>
            <span />
          </div>
          {children}
        </section>
        {feedback}
      </div>
    </main>);
}
export function SignupProgress({ step }) {
    const index = ['profile', 'account', 'optional', 'terms'].indexOf(step);
    return (<div className={styles.signupProgress} aria-label={`회원가입 4단계 중 ${index + 1}단계`}>
      {[0, 1, 2, 3].map((item) => (<span key={item} aria-hidden data-active={item === index}/>))}
    </div>);
}
export function SignupActions({ previous, disabled, pending, final = false, }) {
    return (<div className={styles.signupActions}>
      <button type="button" onClick={previous} disabled={pending} className={styles.previousButton}>
        <IconChevronLeft size={24} aria-hidden/>
        <span>이전</span>
      </button>
      <button type="submit" disabled={disabled || pending} className={styles.nextButton}>
        <span>{pending ? '처리 중…' : final ? '동의합니다' : '다음'}</span>
        {!final && <IconChevronRight size={24} aria-hidden/>}
      </button>
    </div>);
}
export function SignupField({ id, label, children, hint, }) {
    return (<div className={styles.signupField}>
      <div className={styles.signupFieldRow}>
        <label htmlFor={id}>{label}</label>
        <div className={styles.signupFieldControl}>{children}</div>
      </div>
      {hint && (<div id={`${id}-hint`} className={styles.signupHint}>
          {hint}
        </div>)}
    </div>);
}
