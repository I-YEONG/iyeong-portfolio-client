/** 각 변경은 선택 사항이지만 시작한 변경에 필요한 입력은 모두 받아야 한다. */
export function validateAccountEdit(values) {
    const email = values.email.trim();
    const code = values.code.trim();
    if (code && !email)
        return '변경할 이메일을 입력해 주세요.';
    if (email && !code)
        return '이메일 인증번호를 입력해 주세요.';
    if (values.newPassword && !values.currentPassword)
        return '현재 비밀번호를 입력해 주세요.';
    if (values.currentPassword && !values.newPassword)
        return '새 비밀번호를 입력해 주세요.';
    return null;
}
export function emailRetryAt(retryAfterSeconds, now) {
    return retryAfterSeconds !== null && Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
        ? now + retryAfterSeconds * 1000
        : null;
}
export function emailRetrySeconds(retryAt, now) {
    return retryAt !== null && retryAt > now ? Math.ceil((retryAt - now) / 1000) : null;
}
