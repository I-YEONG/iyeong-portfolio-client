import { apiClient } from '@/features/wish/shared/lib/api-client';
/**
 * 비밀번호 변경. 성공은 204이고 서버가 Refresh 쿠키를 만료시킨다.
 * 호출부는 성공 후 토큰·캐시를 지우고 로그인 화면으로 보내야 한다.
 */
export async function changePassword(currentPassword, newPassword) {
    await apiClient.patch('/api/users/me/password', { currentPassword, newPassword });
}
