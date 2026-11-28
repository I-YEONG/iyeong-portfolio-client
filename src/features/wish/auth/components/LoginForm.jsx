import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuthSession } from '../hooks/useAuthSession';
import { useLogin } from '../hooks/useLogin';
import { AccountReactivationDialog } from './AccountReactivationDialog';
import { AuthSessionNotice } from './AuthSessionNotice';
import { AuthFeedback } from './AuthFeedback';
export function LoginForm({ signal, feedbackTarget, }) {
    const { isInitializing } = useAuthSession();
    const [values, setValues] = useState({ loginId: '', password: '' });
    const [fieldErrors, setFieldErrors] = useState({});
    const [reactivationRequired, setReactivationRequired] = useState(false);
    const idInput = useRef(null);
    const passwordInput = useRef(null);
    const submitButton = useRef(null);
    const login = useLogin(signal);
    const isDisabled = isInitializing || login.isPending || reactivationRequired;
    function updateField(field, value) {
        setValues((previous) => ({ ...previous, [field]: value }));
        setFieldErrors((previous) => ({ ...previous, [field]: undefined }));
        setReactivationRequired(false);
        login.resetError();
    }
    async function sendLogin(reactivate = false) {
        const result = await login.submit({ ...values, reactivate });
        if (result === 'reactivation-required')
            setReactivationRequired(true);
        if (result === 'success')
            setValues({ loginId: '', password: '' });
    }
    function handleSubmit(event) {
        event.preventDefault();
        if (isDisabled)
            return;
        void sendLogin();
    }
    const inputClassName = 'h-[50px] w-full min-w-0 rounded border border-gray-01 bg-white px-3 text-sm text-black placeholder:text-gray-01 disabled:bg-gray-01/20 aria-invalid:border-red aria-invalid:text-red';
    const feedback = [];
    if (fieldErrors.loginId)
        feedback.push({ id: 'login-id-error', text: fieldErrors.loginId, tone: 'error' });
    if (fieldErrors.password)
        feedback.push({ id: 'login-password-error', text: fieldErrors.password, tone: 'error' });
    if (login.error)
        feedback.push({ id: 'login-request-error', text: login.error, tone: 'error' });
    if (isInitializing)
        feedback.push({
            id: 'login-initializing',
            text: '로그인 상태를 확인하고 있습니다…',
            tone: 'info',
        });
    return (<>
      {feedbackTarget &&
            createPortal(<>
            <AuthFeedback items={feedback}/>
            <AuthSessionNotice disabled={isDisabled} exterior/>
          </>, feedbackTarget)}
      <form noValidate onSubmit={handleSubmit} aria-busy={login.isPending} className="mt-4">
        <div>
          <label className="sr-only" htmlFor="login-id">
            아이디
          </label>
          <input ref={idInput} id="login-id" name="username" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} maxLength={100} value={values.loginId} onChange={(event) => updateField('loginId', event.target.value)} placeholder="아이디를 입력하세요." disabled={isDisabled} aria-invalid={Boolean(fieldErrors.loginId)} aria-describedby={[
            fieldErrors.loginId ? 'login-id-error' : '',
            login.error ? 'login-request-error' : '',
        ]
            .filter(Boolean)
            .join(' ') || undefined} className={inputClassName}/>
        </div>
        <div className="mt-[15px]">
          <label className="sr-only" htmlFor="login-password">
            비밀번호
          </label>
          <input ref={passwordInput} id="login-password" name="password" type="password" autoComplete="current-password" maxLength={128} value={values.password} onChange={(event) => updateField('password', event.target.value)} placeholder="비밀번호를 입력하세요." disabled={isDisabled} aria-invalid={Boolean(fieldErrors.password)} aria-describedby={[
            fieldErrors.password ? 'login-password-error' : '',
            login.error ? 'login-request-error' : '',
        ]
            .filter(Boolean)
            .join(' ') || undefined} className={inputClassName}/>
        </div>
        <button ref={submitButton} type="submit" disabled={isDisabled} className="mx-0.5 mt-6 h-[50px] w-[calc(100%-4px)] rounded-full bg-blue text-base font-medium text-white disabled:cursor-wait disabled:opacity-60">
          {login.isPending ? '로그인 중…' : '로그인'}
        </button>
        <span role="status" className="sr-only">
          {login.isPending ? '로그인 요청을 처리하고 있습니다.' : ''}
        </span>
      </form>
      {reactivationRequired && (<AccountReactivationDialog returnFocusRef={submitButton} onCancel={() => setReactivationRequired(false)} onConfirm={() => {
                setReactivationRequired(false);
                void sendLogin(true);
            }}/>)}
    </>);
}
