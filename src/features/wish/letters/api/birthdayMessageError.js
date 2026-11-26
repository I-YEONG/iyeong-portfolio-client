import { ApiError } from '@/features/wish/shared/lib/api-client';
const actionLabel = {
    list: '축하 편지를 불러오지 못했습니다.',
    detail: '축하 편지를 불러오지 못했습니다.',
    mine: '내 축하 편지를 불러오지 못했습니다.',
    create: '편지를 등록하지 못했습니다.',
    delete: '편지를 삭제하지 못했습니다.',
    heart: '하트를 반영하지 못했습니다.',
};
/** Swagger 공통 오류 계약과 생일축하 쪽지 도메인 코드를 사용자 안내로 변환한다. */
export function getBirthdayMessageErrorMessage(error, action) {
    if (!(error instanceof ApiError))
        return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
    switch (error.code) {
        case 'BIRTHDAY_MESSAGE_ALREADY_EXISTS':
            return '이미 생일축하 쪽지를 작성했어요. 한 사람당 하나만 작성할 수 있습니다.';
        case 'SCHOOL_VERIFICATION_REQUIRED':
            return '학생 인증을 완료한 뒤 생일축하 쪽지를 이용할 수 있어요.';
        case 'UNAUTHORIZED':
        case 'AUTH_REQUIRED':
            return '로그인이 만료되었습니다. 다시 로그인해 주세요.';
        case 'BIRTHDAY_MESSAGE_NOT_FOUND':
            return '요청한 축하 편지를 찾을 수 없습니다.';
        case 'SELF_HEART_NOT_ALLOWED':
            return '내 편지에는 하트를 누를 수 없어요.';
    }
    if (error.status === 0)
        return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
    if (error.status === 400)
        return '입력 내용을 확인해 주세요.';
    if (error.status === 403)
        return '학생 인증을 완료한 뒤 생일축하 쪽지를 이용할 수 있어요.';
    if (error.status === 404)
        return '요청한 축하 편지를 찾을 수 없습니다.';
    if (error.status === 409)
        return '현재 요청을 처리할 수 없습니다. 잠시 후 다시 확인해 주세요.';
    if (error.status === 429)
        return '요청이 많습니다. 잠시 후 다시 시도해 주세요.';
    if (error.status >= 500)
        return '서버가 일시적으로 불안정합니다. 잠시 후 다시 시도해 주세요.';
    return actionLabel[action];
}
const RETRYABLE_STATUS = new Set([0, 429, 502, 503]);
/** 공통 쿼리 재시도 정책과 동일한 일시적 오류만 재시도한다. */
export function shouldRetryBirthdayMessageQuery(failureCount, error) {
    return error instanceof ApiError && RETRYABLE_STATUS.has(error.status) && failureCount < 2;
}
/** 서버의 Retry-After를 우선하며, 없는 경우에는 짧은 지수 백오프를 적용한다. */
export function getBirthdayMessageRetryDelay(failureCount, error) {
    if (error instanceof ApiError && error.retryAfterSeconds !== null) {
        return error.retryAfterSeconds * 1_000;
    }
    return Math.min(1_000 * 2 ** failureCount, 30_000);
}
