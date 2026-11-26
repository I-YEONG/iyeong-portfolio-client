import { ApiError } from '@/features/wish/shared/lib/api-client';
export function getLoginErrorMessage(error) {
    if (!(error instanceof ApiError))
        return '로그인하지 못했습니다. 다시 시도해 주세요.';
    if (error.code === 'ACCOUNT_REACTIVATION_CONFLICT') {
        return '계정 정보가 충돌하여 복구할 수 없습니다. 관리자에게 문의해 주세요.';
    }
    if (error.status === 401)
        return '아이디 또는 비밀번호를 확인해 주세요.';
    if (error.status === 0)
        return '네트워크 연결을 확인한 뒤 다시 시도해 주세요.';
    if (error.status === 429)
        return '요청이 많습니다. 잠시 후 다시 시도해 주세요.';
    if (error.status >= 500)
        return '서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.';
    if (error.code === 'SCHOOL_VERIFICATION_REQUIRED')
        return '학생 인증이 필요한 기능입니다.';
    if (error.status === 403)
        return '로그인이 제한된 계정입니다. 관리자에게 문의해 주세요.';
    return error.message;
}
