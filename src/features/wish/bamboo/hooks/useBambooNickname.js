import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authToken } from '@/features/wish/shared/lib/auth-token';
import { claimBambooNickname, suggestBambooNickname } from '../api/nickname';
export function useBambooNickname() {
    const client = useQueryClient();
    const suggest = useMutation({
        mutationFn: suggestBambooNickname,
        retry: false,
    });
    const claim = useMutation({
        mutationFn: async (nickname) => {
            const sessionVersion = authToken.getSessionVersion();
            const savedNickname = await claimBambooNickname({ nickname });
            if (sessionVersion !== authToken.getSessionVersion()) {
                throw new Error('로그인 상태가 변경되었습니다.');
            }
            return savedNickname;
        },
        retry: false,
        onSuccess: (nickname) => {
            const sessionVersion = authToken.getSessionVersion();
            client.setQueryData(['bamboo', 'room', sessionVersion], (room) => room ? { ...room, nickname } : room);
            void client.invalidateQueries({ queryKey: ['bamboo', 'room', sessionVersion] });
        },
    });
    return { suggest, claim };
}
