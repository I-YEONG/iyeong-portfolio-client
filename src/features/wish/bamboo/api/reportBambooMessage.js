import { apiClient } from '@/features/wish/shared/lib/api-client';
export async function reportBambooMessage(messageId, request) {
    await apiClient.post(`/api/bamboo/messages/${messageId}/report`, request);
}
