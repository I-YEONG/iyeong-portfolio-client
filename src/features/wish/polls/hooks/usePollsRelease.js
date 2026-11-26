import { useEffect, useState } from 'react';
import { getPollsReleaseDelay, isPollsReleased } from '../lib/release';
const MAX_TIMEOUT = 2 ** 31 - 1;
/** 타이머 일시 정지와 탭 복귀를 모두 고려해 현재 시각으로 공개 여부를 다시 계산한다. */
export function usePollsRelease() {
    const [released, setReleased] = useState(isPollsReleased);
    const [tick, setTick] = useState(0);
    useEffect(() => {
        if (released)
            return;
        const check = () => {
            if (isPollsReleased())
                setReleased(true);
            else
                setTick((value) => value + 1);
        };
        const timer = window.setTimeout(check, Math.min(getPollsReleaseDelay(), MAX_TIMEOUT));
        window.addEventListener('focus', check);
        document.addEventListener('visibilitychange', check);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('focus', check);
            document.removeEventListener('visibilitychange', check);
        };
    }, [released, tick]);
    return released;
}
