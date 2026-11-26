import { ApiError } from '@/features/wish/shared/lib/api-client';
export function readAccessToken(data) {
    if (data &&
        typeof data === 'object' &&
        'accessToken' in data &&
        typeof data.accessToken === 'string' &&
        data.accessToken.trim()) {
        return data.accessToken;
    }
    throw new ApiError(200, 'INVALID_TOKEN_RESPONSE', '로그인 응답을 확인하지 못했습니다. 다시 시도해 주세요.');
}
