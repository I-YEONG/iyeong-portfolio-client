import { apiClient } from '@/features/wish/shared/lib/api-client';
import { readAccessToken } from './readAccessToken';
export async function login(values, signal) {
    const { data } = await apiClient.post('/api/auth/login', values, {
        authMode: 'none',
        signal,
    });
    return readAccessToken(data);
}
