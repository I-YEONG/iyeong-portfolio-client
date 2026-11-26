import { env } from '@/features/wish/shared/constants/env';
import { ApiError, apiClient } from '@/features/wish/shared/lib/api-client';
const config = (signal) => ({ authMode: 'none', signal });
export function schoolAuthorizeUrl() {
    return `${env.apiBaseUrl.replace(/\/+$/, '')}/api/auth/school/authorize`;
}
export async function getSchoolProfile(signal) {
    const { data } = await apiClient.get('/api/auth/school/profile', config(signal));
    if (data &&
        typeof data === 'object' &&
        ['name', 'studentNo', 'department'].every((key) => key in data &&
            typeof data[key] === 'string' &&
            String(data[key]).trim().length > 0) &&
        'consentTarget' in data &&
        typeof data.consentTarget === 'string' &&
        'expiresAt' in data &&
        typeof data.expiresAt === 'string' &&
        Number.isFinite(Date.parse(data.expiresAt))) {
        return data;
    }
    throw new ApiError(502, 'INVALID_SCHOOL_PROFILE', '학적 정보를 불러오는데 실패했습니다.');
}
export async function clearSchoolProfile(signal) {
    await apiClient.delete('/api/auth/school/profile', config(signal));
}
