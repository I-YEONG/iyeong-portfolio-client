import { isCancel } from 'axios';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { authToken } from '@/features/wish/shared/lib/auth-token';
import { findRecoveryId, resetRecoveryPassword, sendRecoveryEmail } from './api/recovery';
import { endSession } from './session';
import { useAuthStore } from './store';
import { validateRecoveryCode, validateRecoveryEmail, validateRecoveryId, validateRecoveryPassword, } from './recoveryValidation';
const fresh = (mode) => ({
    mode,
    step: 'entry',
    loginId: '',
    email: '',
    code: '',
    newPassword: '',
    foundLoginId: '',
    sent: false,
    pending: null,
    fieldErrors: {},
    feedback: null,
    resendSeconds: 0,
    submitSeconds: 0,
});
export const recoverySendNotice = '입력한 정보와 일치하는 계정이 있다면 인증번호를 발송했습니다.';
export const recoveryUncertainNotice = '비밀번호가 변경되었을 수 있습니다. 새 비밀번호로 로그인해 보세요. 로그인할 수 없다면 처음부터 다시 인증번호를 받아 재설정해 주세요.';
export function recoveryErrorMessage(error) {
    if (!(error instanceof ApiError))
        return '요청을 처리하지 못했습니다. 연결을 확인하고 다시 시도해 주세요.';
    switch (error.code) {
        case 'ACCOUNT_RECOVERY_FAILED':
        case 'SSO_INVALID_REQUEST':
            return '입력 정보 또는 인증번호가 올바르지 않거나 만료되었습니다. 확인하거나 새 인증번호를 받아 주세요.';
        case 'INVALID_REQUEST':
        case 'LOGIN_ID_REQUIRED':
            return '입력 정보를 확인해 주세요. 아이디·이메일·인증번호와 비밀번호의 입력 형식을 확인할 수 있습니다.';
        case 'EMAIL_SEND_COOLDOWN':
            return error.retryAfterSeconds === null
                ? '인증번호 발송 대기 중입니다. 잠시 후 직접 재전송해 주세요.'
                : '인증번호 발송 대기 중입니다. 표시된 시간이 지난 뒤 직접 재전송해 주세요.';
        case 'RATE_LIMIT_EXCEEDED':
            return '이메일 또는 접속 주소의 시간당 발송 한도를 초과했습니다. 충분한 시간이 지난 뒤 다시 시도해 주세요.';
        case 'RECOVERY_ATTEMPTS_EXCEEDED':
        case 'TOO_MANY_REQUESTS':
            return '인증 시도 횟수가 많습니다. 잠시 후 다시 시도해 주세요.';
        case 'SSO_UNAVAILABLE':
            return '인증 서버에 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.';
        case 'SSO_BAD_GATEWAY':
            return '인증 서버에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
        case 'INVALID_FIND_ID_RESPONSE':
            return '아이디 응답을 확인하지 못했습니다. 다시 확인하거나 새 인증번호를 받아 주세요.';
        case 'INVALID_RECOVERY_RESPONSE':
            return '발송 결과를 확인하지 못했습니다. 이메일을 확인하거나 잠시 후 다시 시도해 주세요.';
        default:
            return error.status === 429
                ? '요청이 일시적으로 제한되었습니다. 잠시 후 다시 시도해 주세요.'
                : '요청을 처리하지 못했습니다. 연결을 확인하고 다시 시도해 주세요.';
    }
}
/** 비밀 값과 결과는 이 로그인 화면 인스턴스 안에만 둔다. Query mutation/Storage를 사용하지 않는다. */
export class RecoveryController {
    state = fresh(null);
    listeners = new Set();
    deadlines = new Map();
    request = null;
    generation = 0;
    active = false;
    unsubscribe;
    cleaningSession = false;
    client;
    now;
    constructor(client, now = Date.now) {
        this.client = client;
        this.now = now;
    }
    getSnapshot = () => this.state;
    subscribe = (listener) => {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    };
    update(values) {
        this.state = { ...this.state, ...values };
        this.listeners.forEach((listener) => listener());
    }
    activate() {
        this.active = true;
        let session = authToken.getSessionVersion();
        this.unsubscribe?.();
        this.unsubscribe = useAuthStore.subscribe(() => {
            const current = authToken.getSessionVersion();
            if (session === current)
                return;
            session = current;
            if (!this.cleaningSession)
                this.close();
        });
    }
    invalidate() {
        this.generation += 1;
        this.request?.controller.abort();
        this.request = null;
    }
    open(mode) {
        if (!this.active)
            return;
        this.invalidate();
        this.update(fresh(mode));
    }
    close = () => {
        this.invalidate();
        this.update(fresh(null));
    };
    dispose() {
        this.active = false;
        this.unsubscribe?.();
        this.unsubscribe = undefined;
        this.close();
        this.deadlines.clear();
    }
    key(action, email = this.state.email) {
        return `${action}:${email.trim().toLowerCase()}`;
    }
    remaining(key) {
        return Math.max(0, Math.ceil(((this.deadlines.get(key) ?? 0) - this.now()) / 1000));
    }
    limit(action, seconds) {
        this.deadlines.set(this.key(action), this.now() + Math.min(seconds * 1000, Number.MAX_SAFE_INTEGER - this.now()));
    }
    tick = () => {
        if (!this.state.mode)
            return;
        const resendSeconds = this.remaining(this.key('send'));
        const submitSeconds = this.remaining(this.key(this.state.mode));
        if (resendSeconds !== this.state.resendSeconds || submitSeconds !== this.state.submitSeconds)
            this.update({ resendSeconds, submitSeconds });
    };
    change(field, value) {
        if (!this.active || !this.state.mode || !['entry', 'password'].includes(this.state.step))
            return;
        this.invalidate();
        const identity = field === 'loginId' || field === 'email';
        this.update({
            [field]: value,
            pending: null,
            foundLoginId: '',
            feedback: null,
            fieldErrors: {},
            ...(identity ? { code: '', newPassword: '', sent: false, step: 'entry' } : {}),
            ...(field === 'code' ? { newPassword: '', step: 'entry' } : {}),
        });
        this.tick();
    }
    validate(withCode, withPassword = false) {
        const fieldErrors = {};
        const { mode, loginId, email, code, newPassword } = this.state;
        if (mode === 'reset')
            fieldErrors.loginId = validateRecoveryId(loginId);
        fieldErrors.email = validateRecoveryEmail(email);
        if (withCode)
            fieldErrors.code = validateRecoveryCode(code);
        if (withPassword)
            fieldErrors.newPassword = validateRecoveryPassword(newPassword);
        this.update({ fieldErrors, feedback: null });
        return !Object.values(fieldErrors).some(Boolean);
    }
    inputs() {
        const { mode, step, loginId, email, code, newPassword } = this.state;
        return JSON.stringify([mode, step, loginId, email, code, newPassword]);
    }
    begin(action) {
        const request = {
            controller: new AbortController(),
            generation: this.generation,
            session: authToken.getSessionVersion(),
            inputs: this.inputs(),
        };
        this.request = request;
        this.update({ pending: action, feedback: null });
        return request;
    }
    current(request) {
        return (this.active &&
            this.request === request &&
            !request.controller.signal.aborted &&
            request.generation === this.generation &&
            request.session === authToken.getSessionVersion() &&
            request.inputs === this.inputs());
    }
    finish(request) {
        if (this.request !== request)
            return;
        this.request = null;
        this.update({ pending: null });
    }
    fail(error, action) {
        if (error instanceof ApiError && error.status === 429 && error.retryAfterSeconds !== null)
            this.limit(action, error.retryAfterSeconds);
        this.update({ feedback: { text: recoveryErrorMessage(error), tone: 'error' } });
        this.tick();
    }
    async send() {
        if (!this.active ||
            !this.state.mode ||
            this.state.step !== 'entry' ||
            this.state.pending === 'send' ||
            this.remaining(this.key('send')) > 0)
            return;
        if (!this.validate(false))
            return;
        this.invalidate();
        this.update({ code: '', newPassword: '', foundLoginId: '', sent: false, pending: null });
        const request = this.begin('send');
        const { email, loginId, mode } = this.state;
        try {
            await sendRecoveryEmail(mode === 'find'
                ? { email, purpose: 'FIND_ID' }
                : { email, loginId, purpose: 'RESET_PASSWORD' }, request.controller.signal);
            if (!this.current(request))
                return;
            this.limit('send', 60);
            this.update({ sent: true, feedback: { text: recoverySendNotice, tone: 'success' } });
            this.tick();
        }
        catch (error) {
            if (this.current(request) && !isCancel(error))
                this.fail(error, 'send');
        }
        finally {
            this.finish(request);
        }
    }
    next() {
        if (!this.active ||
            this.state.mode !== 'reset' ||
            this.state.step !== 'entry' ||
            this.state.pending ||
            !this.validate(true))
            return false;
        this.invalidate();
        this.update({ step: 'password', newPassword: '', feedback: null, fieldErrors: {} });
        return true;
    }
    back = () => {
        if (!this.active || this.state.mode !== 'reset' || this.state.step !== 'password')
            return;
        this.invalidate();
        this.update({ step: 'entry', newPassword: '', pending: null, feedback: null, fieldErrors: {} });
        this.tick();
    };
    restart = () => {
        if (this.state.mode)
            this.open(this.state.mode);
    };
    async find() {
        if (!this.active ||
            this.state.mode !== 'find' ||
            this.state.step !== 'entry' ||
            this.state.pending ||
            this.remaining(this.key('find')) > 0 ||
            !this.validate(true))
            return;
        const request = this.begin('find');
        try {
            const foundLoginId = await findRecoveryId(this.state.email, this.state.code, request.controller.signal);
            if (!this.current(request))
                return;
            this.invalidate();
            this.update({ ...fresh('find'), step: 'result', foundLoginId });
        }
        catch (error) {
            if (this.current(request) && !isCancel(error))
                this.fail(error, 'find');
        }
        finally {
            this.finish(request);
        }
    }
    async reset() {
        if (!this.active ||
            this.state.mode !== 'reset' ||
            this.state.step !== 'password' ||
            this.state.pending ||
            this.remaining(this.key('reset')) > 0 ||
            !this.validate(true, true))
            return;
        const request = this.begin('reset');
        const { loginId, email, code, newPassword } = this.state;
        try {
            await resetRecoveryPassword({ loginId, email, code, newPassword }, request.controller.signal);
            if (!this.current(request))
                return;
            this.invalidate();
            // 백엔드가 쿠키를 지운 확정 응답에 한해서, 요청 당시의 세션만 정리한다.
            this.cleaningSession = true;
            try {
                endSession(this.client);
            }
            finally {
                this.cleaningSession = false;
            }
            this.update({ ...fresh('reset'), step: 'complete' });
        }
        catch (error) {
            if (!this.current(request) || isCancel(error))
                return;
            if (!(error instanceof ApiError) ||
                error.status === 0 ||
                error.status >= 500 ||
                ![400, 401, 403, 409, 422, 429].includes(error.status)) {
                this.invalidate();
                this.update({
                    ...fresh('reset'),
                    step: 'uncertain',
                    feedback: {
                        text: `${recoveryErrorMessage(error)} ${recoveryUncertainNotice}`,
                        tone: 'error',
                    },
                });
            }
            else
                this.fail(error, 'reset');
        }
        finally {
            this.finish(request);
        }
    }
}
