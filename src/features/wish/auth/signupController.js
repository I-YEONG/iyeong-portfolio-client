import { isCancel } from 'axios';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import * as signupApi from './api/signup';
import { AutomaticValidation, } from './automaticValidation';
import { clearSignupDraft, emptySignupDraft, readSignupDraft, saveSignupDraft, } from './signupDraft';
import { normalizePhone, validateOptionalInfo, validateSignupCode, validateSignupEmail, validateSignupId, validateSignupPassword, validateSignupPasswordConfirmation, } from './signupValidation';
export const failureMessage = (failure) => {
    if (!(failure instanceof ApiError))
        return '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.';
    switch (failure.code) {
        case 'NETWORK_ERROR':
            return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
        case 'EMAIL_SEND_COOLDOWN':
            return '인증번호 재전송 대기 시간이 남아 있습니다.';
        case 'RATE_LIMIT_EXCEEDED':
            return '이메일 발송 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.';
        case 'ACCOUNT_CONFLICT':
            return '이미 사용 중인 정보가 있습니다. 아이디·이메일·전화번호를 다시 확인하거나 로그인해 주세요.';
        case 'RECENTLY_WITHDRAWN_ACCOUNT':
            return '탈퇴 후 30일이 지나지 않은 계정 정보입니다. 기존 계정으로 로그인해 복구하거나 30일 후 가입해 주세요.';
        case 'SCHOOL_IDENTITY_ALREADY_LINKED':
            return '이미 가입된 학교 정보입니다. 기존 계정으로 로그인해 주세요.';
        case 'SCHOOL_SSO_VERIFICATION_REQUIRED':
            return '학교 인증이 만료되었습니다. SU-Wings에서 다시 인증해 주세요.';
        case 'INVALID_REQUEST':
        case 'SSO_INVALID_REQUEST':
            return '입력 정보를 확인해 주세요. 이메일 인증번호가 올바른지도 확인해 주세요.';
        case 'SCHOOL_SSO_NOT_CONFIGURED':
            return '현재 학교 인증을 사용할 수 없습니다. 운영자에게 문의해 주세요.';
        default:
            return failure.status === 429
                ? '요청이 많습니다. 잠시 후 다시 시도해 주세요.'
                : '요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.';
    }
};
const checkActions = {
    studentNo: 'studentNo',
    loginId: 'loginId',
    phone: 'optional',
    code: 'emailVerify',
};
const transientFailure = (failure) => !(failure instanceof ApiError) ||
    failure.status === 0 ||
    failure.status === 408 ||
    failure.status === 429 ||
    failure.status >= 500;
export class SignupController {
    state;
    listeners = new Set();
    requests = new Map();
    cooldowns = new Map();
    automatic;
    composing = new Set();
    emailGeneration = 0;
    active = true;
    storage;
    now;
    constructor({ source, storage, now = Date.now, timers, initialProfileStatus = 'ready', initialNotice = null, callbackIssue = false, }) {
        this.storage = storage;
        this.now = now;
        this.automatic = new AutomaticValidation(timers);
        this.state = {
            source,
            step: 'profile',
            draft: readSignupDraft(storage, source),
            manualAcademic: { name: '', studentNo: '', department: '', departmentOther: '' },
            password: '',
            passwordConfirmation: '',
            code: '',
            profile: null,
            profileStatus: initialProfileStatus,
            callbackIssue,
            fieldErrors: {},
            notice: initialNotice,
            noticeTone: initialNotice ? 'error' : 'info',
            pending: [],
            queued: [],
            retryFields: [],
            checkedLoginId: null,
            checkedPhone: null,
            verifiedEmail: null,
            sentEmail: null,
            checkedStudentNo: null,
            resendSeconds: 0,
            submission: 'idle',
            cancelled: false,
            suggestLogin: false,
        };
    }
    getSnapshot = () => this.state;
    subscribe = (listener) => {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    };
    patch(values) {
        this.state = { ...this.state, ...values };
        this.listeners.forEach((listener) => listener());
    }
    resetSensitive(values = {}) {
        this.patch({
            password: '',
            passwordConfirmation: '',
            code: '',
            verifiedEmail: null,
            checkedLoginId: null,
            checkedPhone: null,
            sentEmail: null,
            checkedStudentNo: null,
            retryFields: [],
            ...values,
        });
    }
    abort(action) {
        this.requests.get(action)?.abort();
        this.requests.delete(action);
        this.patch({ pending: [...this.requests.keys()] });
    }
    cancelQueued(field) {
        this.automatic.cancel(field);
        this.patch({ queued: this.automatic.fields() });
    }
    invalidateCheck(field) {
        if (field !== 'code')
            this.cancelQueued(field);
        this.abort(checkActions[field]);
        this.patch({
            retryFields: this.state.retryFields.filter((item) => item !== field),
            ...(field === 'studentNo' ? { checkedStudentNo: null } : {}),
            ...(field === 'loginId' ? { checkedLoginId: null } : {}),
            ...(field === 'phone' ? { checkedPhone: null } : {}),
            ...(field === 'code' ? { verifiedEmail: null } : {}),
        });
    }
    abortAll() {
        this.automatic.cancelAll();
        this.composing.clear();
        this.emailGeneration += 1;
        this.requests.forEach((controller) => controller.abort());
        this.requests.clear();
        this.patch({ pending: [], queued: [], retryFields: [] });
    }
    async request(action, work, success, failure = (error) => this.patch({ notice: failureMessage(error), noticeTone: 'error' })) {
        if (!this.active || this.requests.has(action))
            return false;
        const controller = new AbortController();
        this.requests.set(action, controller);
        this.patch({ pending: [...this.requests.keys()] });
        const current = () => this.active && !controller.signal.aborted && this.requests.get(action) === controller;
        let succeeded = false;
        try {
            const value = await work(controller.signal);
            if (current()) {
                success(value);
                succeeded = true;
            }
        }
        catch (error) {
            if (current() && !isCancel(error))
                failure(error);
        }
        finally {
            if (this.requests.get(action) === controller) {
                this.requests.delete(action);
                this.patch({ pending: [...this.requests.keys()] });
            }
        }
        return succeeded;
    }
    checkFailed(field, failure) {
        this.patch({
            fieldErrors: { ...this.state.fieldErrors, [field]: failureMessage(failure) },
            retryFields: [
                ...this.state.retryFields.filter((item) => item !== field),
                ...(transientFailure(failure) ? [field] : []),
            ],
        });
    }
    scheduleCheck(field) {
        this.cancelQueued(field);
        if (!this.canEdit() || this.composing.has(field))
            return;
        if (field === 'studentNo') {
            this.scheduleStudentNo();
            return;
        }
        const relevant = field === 'loginId'
            ? this.state.step === 'account' &&
                !validateSignupId(this.state.draft.loginId) &&
                this.state.checkedLoginId !== this.state.draft.loginId
            : this.state.step === 'optional' &&
                Boolean(normalizePhone(this.state.draft.phone)) &&
                !validateOptionalInfo(this.state.draft).phone &&
                this.state.checkedPhone !== normalizePhone(this.state.draft.phone);
        if (!relevant)
            return;
        this.queueCheck(field, field === 'loginId' ? this.checkLoginId : this.checkPhone);
    }
    queueCheck(field, check) {
        this.automatic.schedule(field, () => {
            this.patch({ queued: this.automatic.fields() });
            if (this.canEdit() && !this.composing.has(field))
                void check();
        });
        this.patch({ queued: this.automatic.fields() });
    }
    scheduleStudentNo() { }
    scheduleCurrentStep() {
        if (this.state.step === 'profile')
            this.scheduleCheck('studentNo');
        if (this.state.step === 'account')
            this.scheduleCheck('loginId');
        if (this.state.step === 'optional')
            this.scheduleCheck('phone');
    }
    enterStep(step) {
        this.automatic.cancelAll();
        this.composing.clear();
        this.emailGeneration += 1;
        for (const action of ['studentNo', 'loginId', 'emailSend', 'emailVerify', 'optional'])
            this.abort(action);
        this.patch({ step, queued: [], retryFields: [], notice: null, fieldErrors: {} });
        this.scheduleCurrentStep();
    }
    activate() {
        this.active = true;
        this.scheduleCurrentStep();
        return this.activateAcademic();
    }
    dispose() {
        this.active = false;
        this.abortAll();
        this.resetSensitive({ profile: null });
    }
    tick = () => {
        const seconds = Math.max(0, Math.ceil(((this.cooldowns.get(this.state.draft.email.trim()) ?? 0) - this.now()) / 1000));
        if (seconds !== this.state.resendSeconds)
            this.patch({ resendSeconds: seconds });
        this.tickAcademic();
    };
    canEdit() {
        return (this.active &&
            !this.state.cancelled &&
            !this.requests.has('submit') &&
            !this.requests.has('cancel') &&
            this.state.submission !== 'success');
    }
    workIdle() {
        return this.requests.size === 0 && this.state.queued.length === 0 && this.composing.size === 0;
    }
    accountValuesReady() {
        const { draft, password, passwordConfirmation, checkedLoginId, verifiedEmail } = this.state;
        return (!validateSignupId(draft.loginId) &&
            !validateSignupEmail(draft.email) &&
            !validateSignupPassword(password) &&
            !validateSignupPasswordConfirmation(password, passwordConfirmation) &&
            checkedLoginId === draft.loginId &&
            verifiedEmail === draft.email.trim());
    }
    isProfileReady = () => this.canEdit() && this.workIdle() && this.validAcademic();
    isAccountReady = () => this.isProfileReady() && this.accountValuesReady();
    isOptionalReady = () => {
        const phone = normalizePhone(this.state.draft.phone);
        return (this.isAccountReady() &&
            !Object.values(validateOptionalInfo(this.state.draft)).some(Boolean) &&
            (!phone || this.state.checkedPhone === phone));
    };
    setComposing = (field, composing) => {
        if (!this.canEdit())
            return;
        if (composing) {
            this.composing.add(field);
            this.invalidateCheck(field);
            this.patch({
                notice: null,
                fieldErrors: { ...this.state.fieldErrors, [field]: undefined },
            });
        }
        else {
            this.composing.delete(field);
            if (field !== 'code')
                this.scheduleCheck(field);
        }
    };
    changeDraft = (key, value) => {
        if (!this.canEdit())
            return;
        if (key === 'enrollment' && value !== '' && value !== 'ENROLLED' && value !== 'LEAVE')
            return;
        if (key === 'loginId')
            this.invalidateCheck('loginId');
        if (key === 'phone')
            this.invalidateCheck('phone');
        if (key === 'email') {
            this.emailGeneration += 1;
            this.abort('emailSend');
            this.invalidateCheck('code');
        }
        const draft = { ...this.state.draft, [key]: value };
        this.patch({
            draft,
            fieldErrors: { ...this.state.fieldErrors, [key]: undefined },
            notice: null,
            ...(key === 'email'
                ? {
                    sentEmail: null,
                    code: '',
                    fieldErrors: { ...this.state.fieldErrors, email: undefined, code: undefined },
                }
                : {}),
        });
        saveSignupDraft(draft, this.storage, this.state.source);
        if (key === 'loginId' || key === 'phone')
            this.scheduleCheck(key);
        this.tick();
    };
    changePassword = (value) => {
        if (this.canEdit())
            this.patch({
                password: value,
                fieldErrors: {
                    ...this.state.fieldErrors,
                    password: undefined,
                    passwordConfirmation: undefined,
                },
            });
    };
    changePasswordConfirmation = (value) => {
        if (this.canEdit())
            this.patch({
                passwordConfirmation: value,
                fieldErrors: { ...this.state.fieldErrors, passwordConfirmation: undefined },
            });
    };
    /** 블러 시 로컬 형식만 검사하며 중복 확인 요청과 서버 오류는 그대로 유지한다. */
    checkDraftField = (key) => {
        if (!this.canEdit())
            return;
        const error = key === 'loginId'
            ? validateSignupId(this.state.draft.loginId)
            : key === 'email'
                ? validateSignupEmail(this.state.draft.email)
                : validateOptionalInfo(this.state.draft)[key];
        if (error)
            this.patch({ fieldErrors: { ...this.state.fieldErrors, [key]: error } });
    };
    checkCode = () => {
        if (!this.canEdit() || this.composing.has('code'))
            return;
        const error = validateSignupCode(this.state.code);
        if (error)
            this.patch({ fieldErrors: { ...this.state.fieldErrors, code: error } });
    };
    checkPassword = () => {
        if (this.canEdit())
            this.patch({
                fieldErrors: {
                    ...this.state.fieldErrors,
                    password: validateSignupPassword(this.state.password),
                    passwordConfirmation: this.state.passwordConfirmation
                        ? validateSignupPasswordConfirmation(this.state.password, this.state.passwordConfirmation)
                        : this.state.fieldErrors.passwordConfirmation,
                },
            });
    };
    checkPasswordConfirmation = () => {
        if (this.canEdit())
            this.patch({
                fieldErrors: {
                    ...this.state.fieldErrors,
                    passwordConfirmation: validateSignupPasswordConfirmation(this.state.password, this.state.passwordConfirmation),
                },
            });
    };
    changeCode = (value) => {
        if (!this.canEdit())
            return;
        this.invalidateCheck('code');
        this.patch({
            code: value,
            notice: null,
            fieldErrors: { ...this.state.fieldErrors, code: undefined },
        });
    };
    confirmProfile = () => {
        if (this.state.step === 'profile' && this.isProfileReady())
            this.enterStep('account');
    };
    checkLoginId = async () => {
        if (!this.canEdit() || this.state.step !== 'account' || this.composing.has('loginId'))
            return;
        this.cancelQueued('loginId');
        if (this.requests.has('loginId'))
            return;
        const value = this.state.draft.loginId;
        if (this.state.checkedLoginId === value)
            return;
        const error = validateSignupId(value);
        this.patch({
            fieldErrors: { ...this.state.fieldErrors, loginId: error },
            retryFields: this.state.retryFields.filter((field) => field !== 'loginId'),
            notice: null,
        });
        if (error)
            return;
        await this.request('loginId', (signal) => signupApi.checkAvailability('login-id', value, signal), (available) => this.patch({
            checkedLoginId: available ? value : null,
            fieldErrors: {
                ...this.state.fieldErrors,
                loginId: available ? undefined : '이미 사용 중인 아이디입니다.',
            },
            notice: available ? '사용 가능한 아이디입니다.' : null,
            noticeTone: 'success',
        }), (failure) => this.checkFailed('loginId', failure));
    };
    sendEmail = async () => {
        if (!this.canEdit() || this.state.step !== 'account' || this.requests.has('emailSend'))
            return;
        this.tick();
        if (this.state.resendSeconds > 0)
            return;
        const email = this.state.draft.email.trim();
        const error = validateSignupEmail(email);
        this.patch({ notice: null, fieldErrors: { ...this.state.fieldErrors, email: error } });
        if (error)
            return;
        this.emailGeneration += 1;
        this.invalidateCheck('code');
        this.patch({
            sentEmail: null,
            code: '',
            fieldErrors: { ...this.state.fieldErrors, code: undefined },
        });
        const generation = this.emailGeneration;
        await this.request('emailSend', async (signal) => {
            if (!(await signupApi.checkAvailability('email', email, signal)))
                throw new ApiError(409, 'EMAIL_IN_USE', '');
            await signupApi.sendSignupEmail(email, signal);
        }, () => {
            if (generation !== this.emailGeneration)
                return;
            this.cooldowns.set(email, this.now() + 60_000);
            this.patch({
                sentEmail: email,
                verifiedEmail: null,
                code: '',
                fieldErrors: { ...this.state.fieldErrors, code: undefined },
                notice: '인증번호를 발송했습니다. 이메일을 확인해 주세요.',
                noticeTone: 'info',
            });
            this.tick();
        }, (failure) => {
            if (failure instanceof ApiError &&
                failure.status === 429 &&
                failure.retryAfterSeconds !== null) {
                this.cooldowns.set(email, this.now() + failure.retryAfterSeconds * 1000);
                this.tick();
            }
            this.patch({
                fieldErrors: {
                    ...this.state.fieldErrors,
                    email: failure instanceof ApiError && failure.code === 'EMAIL_IN_USE'
                        ? '이미 사용 중인 이메일입니다.'
                        : failureMessage(failure),
                },
            });
        });
    };
    verifyEmail = async () => {
        if (!this.canEdit() ||
            this.state.step !== 'account' ||
            this.composing.has('code') ||
            this.requests.has('emailSend') ||
            this.requests.has('emailVerify'))
            return;
        const email = this.state.draft.email.trim();
        if (this.state.verifiedEmail === email)
            return;
        const code = this.state.code;
        const error = validateSignupCode(code);
        this.patch({
            notice: null,
            fieldErrors: { ...this.state.fieldErrors, code: error },
            retryFields: this.state.retryFields.filter((field) => field !== 'code'),
        });
        if (error || this.state.sentEmail !== email)
            return;
        const generation = this.emailGeneration;
        await this.request('emailVerify', (signal) => signupApi.verifySignupEmail(email, code, signal), () => {
            if (generation !== this.emailGeneration)
                return;
            this.patch({
                verifiedEmail: email,
                code: '',
                notice: '인증번호가 확인되었습니다.',
                noticeTone: 'success',
            });
        }, (failure) => this.checkFailed('code', failure));
    };
    confirmAccount = () => {
        if (!this.canEdit() || this.state.step !== 'account' || !this.validAcademic())
            return;
        const { draft, password, passwordConfirmation, checkedLoginId, verifiedEmail } = this.state;
        const fieldErrors = {
            loginId: validateSignupId(draft.loginId) ??
                (checkedLoginId !== draft.loginId
                    ? (this.state.fieldErrors.loginId ?? '아이디 중복 확인을 완료해 주세요.')
                    : undefined),
            email: validateSignupEmail(draft.email) ??
                (verifiedEmail !== draft.email.trim() ? '이메일 인증을 완료해 주세요.' : undefined),
            password: validateSignupPassword(password),
            passwordConfirmation: validateSignupPasswordConfirmation(password, passwordConfirmation),
        };
        this.patch({ fieldErrors, notice: null });
        if (this.isAccountReady())
            this.enterStep('optional');
    };
    checkPhone = async () => {
        if (!this.canEdit() || this.state.step !== 'optional' || this.composing.has('phone'))
            return;
        this.cancelQueued('phone');
        if (this.requests.has('optional'))
            return;
        const phone = normalizePhone(this.state.draft.phone);
        if (phone && this.state.checkedPhone === phone)
            return;
        const error = validateOptionalInfo(this.state.draft).phone;
        this.patch({
            fieldErrors: { ...this.state.fieldErrors, phone: error },
            retryFields: this.state.retryFields.filter((field) => field !== 'phone'),
            notice: null,
        });
        if (!phone || error)
            return;
        await this.request('optional', (signal) => signupApi.checkAvailability('phone', phone, signal), (available) => this.patch({
            checkedPhone: available ? phone : null,
            fieldErrors: {
                ...this.state.fieldErrors,
                phone: available ? undefined : '이미 가입된 전화번호입니다.',
            },
            notice: available ? '사용 가능한 전화번호입니다.' : null,
            noticeTone: 'success',
        }), (failure) => this.checkFailed('phone', failure));
    };
    confirmOptional = () => {
        if (!this.canEdit() || this.state.step !== 'optional' || !this.validAcademic())
            return;
        const errors = validateOptionalInfo(this.state.draft);
        const phone = normalizePhone(this.state.draft.phone);
        if (phone && this.state.checkedPhone !== phone)
            errors.phone ??= this.state.fieldErrors.phone ?? '전화번호 중복 확인을 완료해 주세요.';
        this.patch({ fieldErrors: errors, notice: null });
        if (this.isOptionalReady())
            this.enterStep('terms');
    };
    previous = () => {
        if (!this.canEdit())
            return;
        const previous = {
            profile: 'profile',
            account: 'profile',
            optional: 'account',
            terms: 'optional',
        };
        this.enterStep(previous[this.state.step]);
    };
    submit = async () => {
        if (!this.canEdit() ||
            this.state.step !== 'terms' ||
            this.state.submission !== 'idle' ||
            !this.validAcademic() ||
            !this.workIdle())
            return;
        if (!this.accountValuesReady()) {
            this.enterStep('account');
            this.patch({
                notice: '계정 정보와 이메일 인증을 다시 확인해 주세요.',
                noticeTone: 'error',
            });
            return;
        }
        const errors = validateOptionalInfo(this.state.draft);
        const phone = normalizePhone(this.state.draft.phone);
        if (phone && this.state.checkedPhone !== phone)
            errors.phone ??= '전화번호 중복 확인을 완료해 주세요.';
        if (Object.values(errors).some(Boolean)) {
            this.enterStep('optional');
            this.patch({ fieldErrors: errors });
            return;
        }
        this.patch({ notice: null });
        await this.request('submit', (signal) => signupApi.signup(this.buildSignupRequest(), signal), () => {
            clearSignupDraft(this.storage, this.state.source);
            this.resetSensitive({
                submission: 'success',
                draft: emptySignupDraft(),
                manualAcademic: { name: '', studentNo: '', department: '', departmentOther: '' },
                profile: null,
            });
        }, (failure) => this.handleSubmitFailure(failure));
    };
    cancel = async () => {
        if (!this.canEdit())
            return;
        this.abortAll();
        clearSignupDraft(this.storage, this.state.source);
        this.resetSensitive({
            draft: emptySignupDraft(),
            manualAcademic: { name: '', studentNo: '', department: '', departmentOther: '' },
            notice: null,
            fieldErrors: {},
        });
        await this.cancelAcademic();
    };
    handleSubmitFailure(failure) {
        const uncertain = !(failure instanceof ApiError) || failure.status === 0 || failure.status >= 500;
        this.patch({
            submission: uncertain ? 'uncertain' : 'idle',
            suggestLogin: uncertain ||
                (failure instanceof ApiError &&
                    [
                        'ACCOUNT_CONFLICT',
                        'RECENTLY_WITHDRAWN_ACCOUNT',
                        'SCHOOL_IDENTITY_ALREADY_LINKED',
                    ].includes(failure.code)),
            notice: uncertain
                ? '가입 처리 결과를 확인하지 못했습니다. 계정이 생성되었을 수 있으니 입력한 아이디로 먼저 로그인해 주세요.'
                : failureMessage(failure),
            noticeTone: 'error',
        });
    }
}
