import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { issueQrToken } from '../api/qrToken';
/** 만료 몇 초 전에 미리 새 토큰을 받아둘지 */
const REFRESH_BEFORE_SECONDS = 5;
/**
 * QR 토큰 발급과 남은 시간 계산.
 *
 * 토큰은 60초짜리라 만료 5초 전에 스스로 갱신하고, 화면을 닫으면
 * 캐시에 남지 않도록 gcTime을 0으로 둔다.
 */
export function useQrToken(enabled) {
    const query = useQuery({
        queryKey: ['my', 'qr-token'],
        queryFn: issueQrToken,
        enabled,
        retry: false,
        gcTime: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
    });
    const { data, refetch } = query;
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    useEffect(() => {
        if (!data)
            return;
        const expiresAt = new Date(data.expiresAt).getTime();
        const tick = () => setRemainingSeconds(Math.max(0, Math.round((expiresAt - Date.now()) / 1000)));
        tick();
        const timer = setInterval(tick, 1000);
        const renew = setTimeout(() => void refetch(), Math.max(0, expiresAt - Date.now() - REFRESH_BEFORE_SECONDS * 1000));
        return () => {
            clearInterval(timer);
            clearTimeout(renew);
        };
    }, [data, refetch]);
    return {
        token: data?.token ?? null,
        remainingSeconds,
        isPending: query.isPending,
        isError: query.isError,
        refresh: () => void refetch(),
    };
}
