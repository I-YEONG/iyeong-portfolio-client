import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authorizeSchool, confirmDepartment, getDepartmentMismatch, } from '../api/schoolVerification';
/**
 * 학생 인증 흐름.
 *
 * 인증 버튼을 누르면 학교 SSO로 보내고, 돌아온 결과가 학과 수정을
 * 요구하면 학과를 비교해 보여준 뒤 학교 학적정보로 맞춰 인증을 끝낸다.
 */
export function useSchoolVerification() {
    const client = useQueryClient();
    const check = useMutation({
        mutationFn: getDepartmentMismatch,
        retry: false,
    });
    const confirm = useMutation({
        mutationFn: confirmDepartment,
        retry: false,
        onSuccess: () => {
            void client.invalidateQueries({ queryKey: ['auth'] });
        },
    });
    const authorize = useMutation({
        mutationFn: authorizeSchool,
        retry: false,
        onSuccess: (url) => window.location.assign(url),
    });
    return { authorize, check, confirm };
}
