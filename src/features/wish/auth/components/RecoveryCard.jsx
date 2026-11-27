import { useLayoutEffect, useRef } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import closeIcon from '../assets/close.svg';
import loginLogo from '../assets/login-logo.svg';
import { AuthFeedback } from './AuthFeedback';
import styles from './recovery.module.css';
export function RecoveryCard({ controller, state, onClose, }) {
    const card = useRef(null);
    const { mode, step, pending, fieldErrors } = state;
    useLayoutEffect(() => {
        const target = step === 'entry'
            ? mode === 'reset'
                ? 'loginId'
                : 'email'
            : step === 'password'
                ? 'newPassword'
                : 'title';
        card.current?.querySelector(`#recovery-${target}`)?.focus({ preventScroll: true });
    }, [mode, step]);
    function focusInvalid() {
        const errors = controller.getSnapshot().fieldErrors;
        const field = ['loginId', 'email', 'code', 'newPassword'].find((name) => errors[name]);
        if (field)
            card.current?.querySelector(`#recovery-${field}`)?.focus();
    }
    function submit(event) {
        event.preventDefault();
        if (step === 'password')
            void controller.reset();
        else if (mode === 'find')
            void controller.find();
        else
            controller.next();
        focusInvalid();
    }
    function describedBy(field) {
        return ([
            fieldErrors[field] ? `recovery-error-${field}` : '',
            state.feedback ? 'recovery-feedback' : '',
            field === 'newPassword' ? 'recovery-password-hint' : '',
        ]
            .filter(Boolean)
            .join(' ') || undefined);
    }
    function input(field, placeholder) {
        return (<input id={`recovery-${field}`} name={`recovery-${field}`} type={field === 'newPassword' ? 'password' : field === 'email' ? 'email' : 'text'} value={state[field]} onChange={(event) => controller.change(field, event.target.value)} placeholder={placeholder} maxLength={field === 'code' ? 6 : field === 'loginId' ? 100 : field === 'newPassword' ? 20 : 254} inputMode={field === 'code' ? 'numeric' : undefined} autoComplete={field === 'newPassword' ? 'new-password' : 'off'} autoCapitalize="none" spellCheck={false} required disabled={pending === 'reset'} aria-invalid={Boolean(fieldErrors[field])} aria-describedby={describedBy(field)} className={styles.input}/>);
    }
    const feedback = Object.entries(fieldErrors)
        .filter(([, message]) => message)
        .map(([field, message]) => ({ id: `recovery-error-${field}`, text: message, tone: 'error' }));
    if (state.feedback)
        feedback.push({ id: 'recovery-feedback', ...state.feedback });
    if (state.submitSeconds > 0)
        feedback.push({
            id: 'recovery-submit-limit',
            text: `${state.submitSeconds}초 후 다시 확인할 수 있습니다.`,
            tone: 'info',
        });
    return (<>
      <div ref={card} data-auth-card="recovery" data-recovery-step={step} data-recovery-mode={mode} className={styles.card}>
        <button type="button" onClick={onClose} aria-label="계정 복구 닫기" className={styles.close}>
          <img src={closeIcon} alt="" width={38} height={38}/>
        </button>
        <img src={loginLogo} alt="" width={107} height={77} className={styles.logo}/>
        <div className={styles.heading}>
          <span />
          <h1 id="recovery-title" tabIndex={-1}>
            {mode === 'find' ? '아이디 찾기' : '비밀번호 재설정'}
          </h1>
          <span />
        </div>
        {step === 'entry' && (<form className={styles.entryForm} noValidate onSubmit={submit} aria-busy={Boolean(pending)}>
            <div className={styles.rows}>
              {mode === 'reset' && (<div className={styles.row}>
                  <label htmlFor="recovery-loginId">아이디</label>
                  {input('loginId', '아이디 입력')}
                </div>)}
              <div className={styles.row}>
                <label htmlFor="recovery-email">E- mail</label>
                <div className={styles.emailControl}>
                  {input('email', '이메일 입력')}
                  <button type="button" className={styles.send} disabled={pending === 'send' || state.resendSeconds > 0} aria-label={state.resendSeconds > 0
                ? `인증번호 재전송 ${state.resendSeconds}초 후 가능`
                : state.sent
                    ? '인증번호 재전송'
                    : '인증번호 전송'} onClick={() => {
                void controller.send();
                focusInvalid();
            }}>
                    {pending === 'send'
                ? '발송 중'
                : state.resendSeconds > 0
                    ? `${state.resendSeconds}초`
                    : state.sent
                        ? '재전송'
                        : '전송'}
                  </button>
                </div>
              </div>
              <div className={styles.row}>
                <label htmlFor="recovery-code">
                  E- mail
                  <br />
                  인증 번호
                </label>
                {input('code', '인증번호 입력')}
              </div>
            </div>
            <button type="submit" className={styles.primary} disabled={Boolean(pending) || (mode === 'find' && state.submitSeconds > 0)}>
              {mode === 'find' ? (pending === 'find' ? '확인 중…' : '아이디 찾기') : '다음으로'}
              {mode === 'reset' && <IconChevronRight size={24} aria-hidden/>}
            </button>
          </form>)}
        {step === 'result' && (<div className={styles.result}>
            <p>회원님의 아이디는</p>
            <p className={styles.foundId}>{state.foundLoginId}</p>
            <p className={styles.resultSuffix}>입니다.</p>
            <button type="button" className={styles.primary} onClick={onClose}>
              로그인
            </button>
          </div>)}
        {step === 'password' && (<form className={styles.passwordForm} noValidate onSubmit={submit} aria-busy={pending === 'reset'}>
            <label className={styles.passwordLabel} htmlFor="recovery-newPassword">
              새로운 비밀번호 설정
            </label>
            {input('newPassword', '새 비밀번호 입력')}
            <p id="recovery-password-hint" className={styles.hint}>
              *8-20자 영문 대소문자, 숫자, 특수문자 포함
            </p>
            <button type="submit" className={styles.primary} disabled={pending === 'reset' || state.submitSeconds > 0}>
              {pending === 'reset' ? '변경 중…' : '비밀번호 재설정'}
            </button>
          </form>)}
        {step === 'complete' && (<div className={styles.complete}>
            <p>
              <strong>새로운 비밀번호 설정</strong>이 완료되었습니다.
            </p>
            <button type="button" className={styles.primary} onClick={onClose}>
              로그인
            </button>
          </div>)}
        {step === 'uncertain' && (<div className={styles.uncertain}>
            <p>
              비밀번호 변경 결과를
              <br />
              확인할 수 없습니다.
            </p>
            <button type="button" className={styles.primary} onClick={onClose}>
              새 비밀번호로 로그인
            </button>
            <button type="button" className={styles.restart} onClick={controller.restart}>
              처음부터 다시
            </button>
          </div>)}
      </div>
      <AuthFeedback items={feedback}>
        {step === 'password' && (<button type="button" className={styles.back} onClick={controller.back} disabled={pending === 'reset'}>
            아이디·이메일·인증번호 수정 / 재전송
          </button>)}
      </AuthFeedback>
    </>);
}
