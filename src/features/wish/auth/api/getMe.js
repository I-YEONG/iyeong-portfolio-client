import { apiClient } from '@/features/wish/shared/lib/api-client';
export async function getMe(signal) {
    const { data } = await apiClient.get('/api/users/me', { signal });
    return data;
}
