import { formatSignupBirthDateInput, formatSignupPhoneInput } from './signupInputFormatting';
export const SIGNUP_DRAFT_KEYS = {
    SCHOOL_SSO: 'make-a-wish:school-signup-draft:v1',
    MANUAL: 'make-a-wish:manual-signup-draft:v1',
};
export const SIGNUP_DRAFT_KEY = SIGNUP_DRAFT_KEYS.SCHOOL_SSO;
export const emptySignupDraft = () => ({
    loginId: '',
    email: '',
    phone: '',
    grade: '',
    enrollment: '',
    birthDate: '',
});
export function browserDraftStorage() {
    try {
        return typeof window === 'undefined' ? undefined : window.sessionStorage;
    }
    catch {
        return undefined;
    }
}
function pickDraft(value) {
    const draft = emptySignupDraft();
    if (!value || typeof value !== 'object')
        return draft;
    for (const key of ['loginId', 'email', 'phone', 'grade', 'birthDate']) {
        if (key in value && typeof value[key] === 'string') {
            draft[key] = String(value[key]).slice(0, 300);
        }
    }
    if ('enrollment' in value && (value.enrollment === 'ENROLLED' || value.enrollment === 'LEAVE')) {
        draft.enrollment = value.enrollment;
    }
    return draft;
}
const keyFor = (mode = 'SCHOOL_SSO') => SIGNUP_DRAFT_KEYS[mode];
export function readSignupDraft(storage, mode = 'SCHOOL_SSO') {
    try {
        const draft = pickDraft(JSON.parse(storage?.getItem(keyFor(mode)) ?? 'null'));
        // 이전 입력 초안도 화면의 숫자 서식과 실제 검증값이 일치하도록 복원한다.
        return {
            ...draft,
            phone: formatSignupPhoneInput(draft.phone).replaceAll('-', ''),
            birthDate: formatSignupBirthDateInput(draft.birthDate).replaceAll('.', '-'),
        };
    }
    catch {
        return emptySignupDraft();
    }
}
export function saveSignupDraft(draft, storage, mode = 'SCHOOL_SSO') {
    // 화이트리스트만 직렬화한다. 호출자가 비밀번호나 학교 프로필을 섞어도 저장하지 않는다.
    try {
        storage?.setItem(keyFor(mode), JSON.stringify(pickDraft(draft)));
    }
    catch {
        /* 저장소가 차단돼도 메모리에서 가입은 계속할 수 있다. */
    }
}
export function clearSignupDraft(storage, mode = 'SCHOOL_SSO') {
    try {
        storage?.removeItem(keyFor(mode));
    }
    catch {
        /* 브라우저 저장소 접근 제한 */
    }
}
