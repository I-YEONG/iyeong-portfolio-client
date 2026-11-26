import { apiClient } from '@/features/wish/shared/lib/api-client';
/**
 * 내 QR 토큰 발급 (POST /api/qr/tokens)
 *
 * 토큰은 사용자를 식별하는 값이라 화면에 그리기만 하고
 * 저장하거나 로그로 남기지 않는다.
 */
export async function issueQrToken() {
    const { data } = await apiClient.post('/api/qr/tokens');
    return data;
}
