import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authToken } from '@/features/wish/shared/lib/auth-token';
import { deleteAccount, deleteFestivalAccount } from '../api/deleteAccount';
import { useAuth } from '@/hooks/useAuth';
/**
 * 회원 탈퇴. 성공하면 메모리 토큰과 사용자 캐시를 모두 지운다.
 * 이동 시점은 호출 화면에서 결정한다.
 */
export function useWithdraw() {
    const client = useQueryClient();
    const { logout } = useAuth();
    return useMutation({
        mutationFn: (scope) => scope === 'festival' ? deleteFestivalAccount() : deleteAccount(),
        retry: false,
        onSuccess: () => {
            authToken.clear();
            logout();
            client.clear();
        },
    });
}
