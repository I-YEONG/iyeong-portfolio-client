import { ApiError, apiClient } from '@/features/wish/shared/lib/api-client';
const config = (signal) => ({ authMode: 'none', signal });
/** MessageResponse.message는 선택 필드이며 객체 응답 자체는 확인한다. */
function isMessageResponse(data) {
    return (data !== null &&
        typeof data === 'object' &&
        !Array.isArray(data) &&
        (!('message' in data) || typeof data.message === 'string'));
}
export async function sendRecoveryEmail(values, signal) {
    const payload = {
        email: values.email.trim(),
        purpose: values.purpose,
        ...(values.purpose === 'RESET_PASSWORD' ? { loginId: values.loginId } : {}),
    };
    const { data, status } = await apiClient.post('/api/auth/email/send', payload, config(signal));
    if (status !== 200 || !isMessageResponse(data))
        throw new ApiError(502, 'INVALID_RECOVERY_RESPONSE', '발송 결과를 확인하지 못했습니다.');
}
export async function findRecoveryId(email, code, signal) {
    const { data, status } = await apiClient.post('/api/auth/email/find-id/verify', { email: email.trim(), code }, config(signal));
    if (status !== 200 ||
        !data ||
        typeof data !== 'object' ||
        Array.isArray(data) ||
        !('loginId' in data) ||
        typeof data.loginId !== 'string' ||
        !data.loginId.trim())
        throw new ApiError(502, 'INVALID_FIND_ID_RESPONSE', '아이디를 확인하지 못했습니다. 다시 확인해 주세요.');
    return data.loginId;
}
export async function resetRecoveryPassword(values, signal) {
    const { data, status } = await apiClient.post('/api/auth/email/reset-password/verify', {
        loginId: values.loginId,
        email: values.email.trim(),
        code: values.code,
        newPassword: values.newPassword,
    }, config(signal));
    if (status !== 200 || !isMessageResponse(data))
        throw new ApiError(502, 'INVALID_RESET_RESPONSE', '비밀번호 변경 결과를 확인하지 못했습니다.');
}
