import { useMemo, useState } from 'react';
import { useAuthSession } from '@/features/wish/auth';
import { useBooths } from '@/features/wish/booths';
import { buildStampBoard } from '../lib/board';
import { useMyStamps } from './useMyStamps';
/** 적립 내역과 검증된 부스 목록을 합쳐, 현재 계정에서 마지막으로 확인한 판을 보존한다. */
export function useStampBoard() {
    const { isAuthenticated, sessionVersion } = useAuthSession();
    const stamps = useMyStamps();
    const stampData = stamps.data;
    const needsBooths = isAuthenticated && Boolean(stampData?.stamps.length);
    const booths = useBooths(needsBooths);
    const boothData = booths.data;
    const usesPlaceholderBooths = booths.isPlaceholderData;
    const result = useMemo(() => {
        if (!isAuthenticated || !stampData)
            return null;
        if (stampData.stamps.length === 0)
            return buildStampBoard([], []);
        // 기기에 남은 목록은 분류가 오래되거나 빠져 있을 수 있어 적립 판정에 쓰지 않는다.
        if (!boothData || usesPlaceholderBooths)
            return null;
        return buildStampBoard(stampData.stamps, boothData);
    }, [isAuthenticated, stampData, boothData, usesPlaceholderBooths]);
    const currentSlots = result?.status === 'ready' ? result.slots : null;
    const [snapshot, setSnapshot] = useState({ sessionVersion, slots: null });
    // 서로 다른 응답을 조합하는 동안에도 직전 판을 유지하되, 계정 경계를 넘겨 보여주지 않는다.
    if (snapshot.sessionVersion !== sessionVersion) {
        setSnapshot({ sessionVersion, slots: currentSlots });
    }
    else if (currentSlots && currentSlots !== snapshot.slots) {
        setSnapshot({ sessionVersion, slots: currentSlots });
    }
    const slots = currentSlots ?? (snapshot.sessionVersion === sessionVersion ? snapshot.slots : null);
    let error = null;
    if (stamps.error)
        error = 'stamps';
    else if (needsBooths && booths.error)
        error = 'booths';
    else if (result?.status === 'unresolved' && !booths.isFetching)
        error = 'classification';
    const isLoading = isAuthenticated &&
        !error &&
        (stamps.isPending ||
            (needsBooths &&
                (booths.isPending || usesPlaceholderBooths || result?.status === 'unresolved')));
    async function retry() {
        await Promise.all([stamps.refetch(), ...(needsBooths ? [booths.refetch()] : [])]);
    }
    return {
        slots,
        error,
        isLoading,
        isRefreshing: stamps.isFetching || (needsBooths && booths.isFetching),
        retry,
    };
}
