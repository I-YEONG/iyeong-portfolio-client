import { apiClient } from '@/features/wish/shared/lib/api-client';
import { normalizeBooth, normalizeBoothDetail, } from '../types';
export async function getBooths(signal) {
    const { data } = await apiClient.get('/api/booths', { signal });
    return data.map(normalizeBooth);
}
export async function getBooth(id, signal) {
    const { data } = await apiClient.get(`/api/booths/${id}`, { signal });
    return normalizeBoothDetail(data);
}
