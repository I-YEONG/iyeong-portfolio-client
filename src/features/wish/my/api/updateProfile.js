import { apiClient } from '@/features/wish/shared/lib/api-client';
/**
 * 개인정보 수정. 보낸 필드만 바뀌고 생략한 필드는 유지된다.
 * 응답이 갱신된 내 정보라 호출부에서 캐시를 교체한다.
 */
export async function updateProfile(body) {
    const { data } = await apiClient.patch('/api/users/me/profile', body);
    return data;
}
