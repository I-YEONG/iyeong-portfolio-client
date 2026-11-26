import { apiClient } from '@/features/wish/shared/lib/api-client';
export async function getBambooRoom(signal) {
    const { data } = await apiClient.get('/api/bamboo', { signal });
    return data;
}
