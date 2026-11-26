import { apiClient } from '@/features/wish/shared/lib/api-client';
import { normalizeBirthdayMessage, } from '../types';
/** 생일축하 쪽지 목록. page는 API 계약에 따라 0부터 시작한다. */
export async function getBirthdayMessages({ page = 0, size = 20, sort = 'LATEST' } = {}, signal) {
    const { data } = await apiClient.get('/api/birthday-messages', { params: { page, size, sort }, signal });
    const items = (data.items ?? []).map(normalizeBirthdayMessage);
    return {
        items,
        page: data.page ?? page,
        size: data.size ?? size,
        totalElements: data.totalElements ?? items.length,
        totalPages: data.totalPages ?? 0,
    };
}
export async function getBirthdayMessage(id, signal) {
    const { data } = await apiClient.get(`/api/birthday-messages/${id}`, { signal });
    return normalizeBirthdayMessage(data);
}
export async function getMyBirthdayMessage(signal) {
    const { data } = await apiClient.get('/api/birthday-messages/me', { signal });
    return {
        written: data.written,
        message: data.message ? normalizeBirthdayMessage(data.message) : null,
    };
}
export async function createBirthdayMessage(request) {
    const { data } = await apiClient.post('/api/birthday-messages', request);
    return normalizeBirthdayMessage(data);
}
export async function deleteBirthdayMessage(id) {
    await apiClient.delete(`/api/birthday-messages/${id}`);
}
export async function setBirthdayMessageHeart(id, hearted) {
    const { data } = hearted
        ? await apiClient.put(`/api/birthday-messages/${id}/heart`)
        : await apiClient.delete(`/api/birthday-messages/${id}/heart`);
    return {
        messageId: data.messageId ?? id,
        heartCount: data.heartCount ?? 0,
        heartedByMe: data.heartedByMe ?? hearted,
    };
}
