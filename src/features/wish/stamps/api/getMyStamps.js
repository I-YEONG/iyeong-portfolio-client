import { ApiError, apiClient } from '@/features/wish/shared/lib/api-client';
const INSTANT_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
function invalidResponse() {
    throw new ApiError(200, 'INVALID_STAMP_RESPONSE', '스탬프 정보를 확인하지 못했습니다. 다시 시도해 주세요.');
}
function isRecord(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function readStamp(value) {
    if (!isRecord(value) ||
        typeof value.boothId !== 'number' ||
        !Number.isSafeInteger(value.boothId) ||
        value.boothId <= 0 ||
        typeof value.boothName !== 'string' ||
        !value.boothName.trim() ||
        typeof value.grantedAt !== 'string' ||
        !INSTANT_PATTERN.test(value.grantedAt) ||
        !Number.isFinite(Date.parse(value.grantedAt)) ||
        (value.operator != null && typeof value.operator !== 'string')) {
        return invalidResponse();
    }
    return {
        boothId: value.boothId,
        boothName: value.boothName.trim(),
        operator: typeof value.operator === 'string' ? value.operator.trim() || null : null,
        grantedAt: value.grantedAt,
    };
}
/** 누락된 응답이나 중복 지급 내역을 정상적인 빈 스탬프판으로 표시하지 않는다. */
function readBoard(value) {
    if (!isRecord(value) ||
        typeof value.participated !== 'boolean' ||
        typeof value.stampCount !== 'number' ||
        !Number.isSafeInteger(value.stampCount) ||
        value.stampCount < 0 ||
        !Array.isArray(value.stamps) ||
        value.stampCount !== value.stamps.length) {
        return invalidResponse();
    }
    const stamps = value.stamps.map(readStamp);
    if (new Set(stamps.map((stamp) => stamp.boothId)).size !== stamps.length) {
        return invalidResponse();
    }
    return { participated: value.participated, stampCount: value.stampCount, stamps };
}
export async function getMyStamps(signal) {
    const { data } = await apiClient.get('/api/users/me/stamps', { signal });
    return readBoard(data);
}
