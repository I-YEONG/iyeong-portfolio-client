import { apiClient } from '@/features/wish/shared/lib/api-client';
import { normalizePerformance } from '../types';
export async function getPerformances(signal) {
    const { data } = await apiClient.get('/api/performances', { signal });
    return data.map(normalizePerformance);
}
export async function getPerformance(id, signal) {
    const { data } = await apiClient.get(`/api/performances/${id}`, { signal });
    return normalizePerformance(data);
}
