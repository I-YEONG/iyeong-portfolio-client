import { apiClient } from '@/features/wish/shared/lib/api-client';
import { normalizeNotice } from '../types';
export async function getNotices({ page = 0, size = 100, bannerOnly } = {}) {
    const { data } = await apiClient.get('/api/notices', {
        params: { page, size, sort: 'NEWEST', bannerOnly },
    });
    const items = (data.items ?? []).map(normalizeNotice);
    return {
        items,
        page: data.page ?? page,
        size: data.size ?? size,
        totalElements: data.totalElements ?? items.length,
        totalPages: data.totalPages ?? 0,
    };
}
export async function getNoticeBanner() {
    const page = await getNotices({ page: 0, size: 20, bannerOnly: true });
    return page.items.find((notice) => notice.banner) ?? null;
}
export async function getNotice(id) {
    const { data } = await apiClient.get(`/api/notices/${id}`);
    return normalizeNotice(data);
}
