import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { changeEmail, confirmEmailCode, sendEmailCode } from '../api/email';
import { emailRetryAt, emailRetrySeconds } from '../lib/accountEdit';
/**
 * 이메일 변경 3단계.
 *
 * 재전송 제한은 서버가 `EMAIL_SEND_COOLDOWN`과 `retryAfterSeconds`로 알려주므로
 * 응답 시각부터 남은 시간을 계산하고 기한이 지나면 오류와 제한을 해제한다.
 */
export function useEmailChange() {
    const client = useQueryClient();
    const [retryAt, setRetryAt] = useState(null);
    const [now, setNow] = useState(0);
    const send = useMutation({
        mutationFn: sendEmailCode,
        retry: false,
        onMutate: () => setRetryAt(null),
        onError: (error) => {
            const receivedAt = Date.now();
            setNow(receivedAt);
            setRetryAt(error instanceof ApiError && error.code === 'EMAIL_SEND_COOLDOWN'
                ? emailRetryAt(error.retryAfterSeconds, receivedAt)
                : null);
        },
    });
    const confirm = useMutation({
        mutationFn: ({ email, code }) => confirmEmailCode(email, code),
        retry: false,
    });
    const apply = useMutation({
        mutationFn: changeEmail,
        retry: false,
        onSuccess: () => {
            void client.invalidateQueries({ queryKey: ['auth'] });
        },
    });
    const resetSend = send.reset;
    useEffect(() => {
        if (retryAt === null)
            return;
        const timer = window.setInterval(() => {
            const currentTime = Date.now();
            setNow(currentTime);
            if (currentTime >= retryAt) {
                setRetryAt(null);
                resetSend();
            }
        }, 250);
        return () => window.clearInterval(timer);
    }, [retryAt, resetSend]);
    const reset = () => {
        setRetryAt(null);
        send.reset();
        confirm.reset();
        apply.reset();
    };
    const cooldownSeconds = emailRetrySeconds(retryAt, now);
    return { send, confirm, apply, cooldownSeconds, reset };
}
