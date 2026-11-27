import { apiClient } from '@/features/wish/shared/lib/api-client';
/**
 * 축제 서비스 이용 정보만 삭제한다. SSO 계정은 유지된다.
 * 성공은 204이며 서버가 Festa Refresh 쿠키를 제거한다.
 */
export async function deleteFestivalAccount() {
    await apiClient.delete('/api/users/me/festival');
}
/** 축제 이용 정보 삭제와 함께 SSO 계정까지 탈퇴한다. 성공은 204. */
export async function deleteAccount() {
    await apiClient.delete('/api/users/me');
}
