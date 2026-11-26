import { apiClient } from '@/features/wish/shared/lib/api-client';
export async function suggestBambooNickname() {
    const { data } = await apiClient.get('/api/bamboo/nickname/suggest');
    if (!data.nickname?.trim())
        throw new Error('닉네임 추천 응답이 비어 있습니다.');
    return data.nickname;
}
export async function claimBambooNickname(request) {
    const { data } = await apiClient.post('/api/bamboo/nickname', request);
    if (!data.nickname?.trim())
        throw new Error('닉네임 저장 응답을 확인하지 못했습니다.');
    return data.nickname;
}
