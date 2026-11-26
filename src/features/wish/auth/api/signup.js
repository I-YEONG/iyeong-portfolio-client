import { ApiError, apiClient } from '@/features/wish/shared/lib/api-client';
const config = (signal) => ({ authMode: 'none', signal });
const parameterNames = {
    'login-id': 'loginId',
    email: 'email',
    'student-no': 'studentNo',
    phone: 'phone',
};
export async function checkAvailability(kind, value, signal) {
    const { data } = await apiClient.get(`/api/auth/check/${kind}`, {
        ...config(signal),
        params: { [parameterNames[kind]]: value },
    });
    if (!data ||
        typeof data !== 'object' ||
        !('available' in data) ||
        typeof data.available !== 'boolean') {
        throw new ApiError(502, 'INVALID_AVAILABILITY', '중복 여부를 확인하지 못했습니다. 다시 확인해 주세요.');
    }
    return data.available;
}
export async function sendSignupEmail(email, signal) {
    await apiClient.post('/api/auth/signup/email/send', { email }, config(signal));
}
export async function verifySignupEmail(email, code, signal) {
    await apiClient.post('/api/auth/signup/email/verify', { email, code }, config(signal));
}
export async function signup(values, signal) {
    const { data, status } = await apiClient.post('/api/auth/signup', values, config(signal));
    if (status !== 200 ||
        !data ||
        typeof data !== 'object' ||
        !('userUuid' in data) ||
        typeof data.userUuid !== 'string' ||
        !data.userUuid.trim()) {
        throw new ApiError(502, 'INVALID_SIGNUP_RESPONSE', '가입 결과를 확인하지 못했습니다.');
    }
}
