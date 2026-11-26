import { useMutation } from '@tanstack/react-query';
import { authToken } from '@/features/wish/shared/lib/auth-token';
import { createBambooMessage } from '../api/createBambooMessage';
/** 대나무숲 메시지는 한 번만 전송한다. 실패 시 자동 재시도하지 않는다. */
export function useCreateBambooMessage() {
    return useMutation({
        mutationFn: async (content) => {
            const sessionVersion = authToken.getSessionVersion();
            const message = await createBambooMessage({ content });
            if (sessionVersion !== authToken.getSessionVersion()) {
                throw new Error('로그인 상태가 변경되었습니다.');
            }
            return message;
        },
        retry: false,
    });
}
