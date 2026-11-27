import { apiClient } from '@/features/wish/shared/lib/api-client';
import { normalizeLostItem } from '../types';
export async function getLostItems({ page = 0, size = 100 } = {}) {
    const { data } = await apiClient.get('/api/lost-items', {
        params: { page, size, sort: 'NEWEST' },
    });
    const items = (data.items ?? []).map(normalizeLostItem);
    return {
        items,
        page: data.page ?? page,
        size: data.size ?? size,
        totalElements: data.totalElements ?? items.length,
        totalPages: data.totalPages ?? 0,
    };
}
export async function getLostItem(id) {
    const { data } = await apiClient.get(`/api/lost-items/${id}`);
    return normalizeLostItem(data);
}
