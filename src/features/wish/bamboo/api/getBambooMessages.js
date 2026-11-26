import { apiClient } from '@/features/wish/shared/lib/api-client';
export async function getBambooMessages(query, signal) {
    const { data } = await apiClient.get('/api/bamboo/messages', {
        params: query,
        signal,
    });
    return data;
}
