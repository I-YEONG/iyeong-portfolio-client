import { apiClient } from '@/features/wish/shared/lib/api-client';
/**
 * 이메일 변경은 세 단계다. 세 요청 모두 같은 이메일을 보낸다.
 * 1) 인증번호 발송 → 2) 인증번호 확인 → 3) 변경 적용
 */
export async function sendEmailCode(email) {
    await apiClient.post('/api/users/me/email/verification', { email });
}
export async function confirmEmailCode(email, code) {
    await apiClient.post('/api/users/me/email/verification/confirm', { email, code });
}
export async function changeEmail(email) {
    await apiClient.patch('/api/users/me/email', { email });
}
