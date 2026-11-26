import { apiClient } from '@/features/wish/shared/lib/api-client';
/** 찜 등록/해제. 응답 본문은 쓰지 않고 성공 여부만 본다. */
export async function setBoothFavorite(id, favorited) {
    const path = `/api/booths/${id}/favorite`;
    if (favorited)
        await apiClient.post(path);
    else
        await apiClient.delete(path);
}
