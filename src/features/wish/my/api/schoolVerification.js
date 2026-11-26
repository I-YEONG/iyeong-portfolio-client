import { apiClient } from '@/features/wish/shared/lib/api-client';
/** 학교·회원 학과 불일치 조회 (GET /api/users/me/school-verification/department) */
export async function getDepartmentMismatch() {
    const { data } = await apiClient.get('/api/users/me/school-verification/department');
    return data;
}
/**
 * 학교 학과로 변경 후 학생 인증
 * (POST /api/users/me/school-verification/department/confirm)
 *
 * 회원 학과를 학적정보로 맞추고 학생 인증까지 끝낸 내 정보를 돌려준다.
 */
export async function confirmDepartment() {
    const { data } = await apiClient.post('/api/users/me/school-verification/department/confirm');
    return data;
}
/**
 * 가입 후 학생 인증 시작 (POST /api/users/me/school-verification/authorize)
 *
 * 학교 SSO 인증 URL을 돌려준다. 학교 로그인과 code/state 검증은
 * 백엔드·학교가 담당하므로 AJAX로 따라가지 않고 브라우저를 그쪽으로 보낸다.
 */
export async function authorizeSchool() {
    const { data } = await apiClient.post('/api/users/me/school-verification/authorize');
    return data.authorizeUrl;
}
