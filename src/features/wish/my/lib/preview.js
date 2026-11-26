/** Figma 시안과 같은 값. 로그인 없이 화면을 확인할 때만 쓴다. */
const PREVIEW_PROFILE = {
    name: '구교승',
    studentNo: '2024100920',
    department: '컴퓨터공학부',
    grade: '3',
    enrollment: '재학',
    phone: '010-4444-4444',
    studentFeePaid: true,
};
/**
 * 개발 환경 전용 미리보기. (Home 화면과 같은 방식)
 * 인증 완료: /my?preview=verified · 인증 미완료: /my?preview=unverified
 */
export function getPreviewProfile() {
    if (!import.meta.env.DEV)
        return null;
    const preview = new URLSearchParams(window.location.search).get('preview');
    if (preview === 'verified')
        return { ...PREVIEW_PROFILE, schoolVerified: true };
    if (preview === 'unverified')
        return { ...PREVIEW_PROFILE, schoolVerified: false };
    return null;
}
/** 미리보기로 열 수 있는 팝업 목록 */
const PREVIEW_DIALOGS = [
    'withdraw',
    'withdrawDone',
    'logoutDone',
    'profileEdit',
    'accountEdit',
    'qr',
    'studentVerify',
    'departmentMismatch',
    'verifyUnavailable',
    'verifyPending',
    'studentVerifyDone',
    'profileDone',
    'passwordChanged',
];
/** 개발 환경 전용. /my?preview=verified&dialog=withdraw 처럼 팝업을 바로 연다. */
export function getPreviewDialog() {
    if (!import.meta.env.DEV)
        return null;
    const dialog = new URLSearchParams(window.location.search).get('dialog');
    const found = PREVIEW_DIALOGS.find((name) => name === dialog);
    return found ?? null;
}
/** 개발 환경 전용. 학과 불일치 팝업을 API 없이 확인할 때 쓰는 값. */
export function getPreviewMismatch() {
    if (!import.meta.env.DEV)
        return null;
    if (new URLSearchParams(window.location.search).get('dialog') !== 'departmentMismatch')
        return null;
    return { currentDepartment: '동물자원과학과', schoolDepartment: '아트앤디자인학과' };
}
