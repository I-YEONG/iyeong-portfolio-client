import { useMutation } from '@tanstack/react-query';
import { reportBambooMessage } from '../api/reportBambooMessage';
/** 신고는 사용자 의도가 담긴 mutation이므로 실패해도 자동 재시도하지 않는다. */
export function useReportBambooMessage() {
    return useMutation({
        mutationFn: ({ messageId, reason }) => reportBambooMessage(messageId, { reason }),
        retry: false,
    });
}
