import { apiClient } from '@/features/wish/shared/lib/api-client';
import { readAccessToken } from './readAccessToken';
export async function refreshToken(signal) {
    const { data } = await apiClient.post('/api/auth/token/refresh', undefined, {
        authMode: 'none',
        signal,
    });
    return readAccessToken(data);
}
