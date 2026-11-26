import { useEffect, useState } from 'react';
import { getBoothsReleaseDelay, isBoothsReleased } from '../lib/release';
/** setTimeout이 한 번에 기다릴 수 있는 최대 시간(약 24.8일). 넘으면 바로 실행돼 버린다. */
const MAX_TIMEOUT = 2 ** 31 - 1;
/** 개발 서버에서만 `?preview=pending|released`로 공개 전후 화면을 볼 수 있다. */
function getPreview() {
    if (!import.meta.env.DEV)
        return null;
    const preview = new URLSearchParams(window.location.search).get('preview');
    return preview === 'pending' || preview === 'released' ? preview : null;
}
/** 공개 전 화면을 띄워 둔 채 공개 시각이 지나면 새로 고치지 않아도 부스맵으로 넘어간다. */
export function useBoothsRelease() {
    const [preview] = useState(getPreview);
    const [released, setReleased] = useState(() => isBoothsReleased());
    useEffect(() => {
        if (released)
            return;
        const timer = window.setTimeout(() => setReleased(isBoothsReleased()), Math.min(getBoothsReleaseDelay(), MAX_TIMEOUT));
        return () => window.clearTimeout(timer);
    }, [released]);
    return preview ? preview === 'released' : released;
}
