import { apiClient } from '@/features/wish/shared/lib/api-client';
export async function createBambooMessage(request) {
    const { data } = await apiClient.post('/api/bamboo/messages', request);
    return data;
}
