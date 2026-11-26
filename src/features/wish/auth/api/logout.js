import { ApiError, apiClient } from '@/features/wish/shared/lib/api-client';
export async function logout() {
    const { status } = await apiClient.post('/api/auth/logout');
    if (status !== 204) {
        throw new ApiError(status, 'INVALID_LOGOUT_RESPONSE', '로그아웃 완료를 확인하지 못했습니다.');
    }
}
