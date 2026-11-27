import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authToken } from '@/features/wish/shared/lib/auth-token';
import { changePassword } from '../api/changePassword';
import { useAuth } from '@/hooks/useAuth';
/**
 * 비밀번호 변경. 성공하면 서버가 Refresh 쿠키를 만료시키므로
 * 메모리 토큰과 사용자 캐시를 지운다. 이동은 호출 화면에서 한다.
 */
export function useChangePassword() {
    const client = useQueryClient();
    const { logout } = useAuth();
    return useMutation({
        mutationFn: ({ currentPassword, newPassword, }) => changePassword(currentPassword, newPassword),
        retry: false,
        onSuccess: () => {
            authToken.clear();
            logout();
            client.clear();
        },
    });
}
