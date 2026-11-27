import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PendingRelease } from '@/components/wish/PendingRelease';
import { getLettersReleaseDelay, hasLettersReleased, LETTERS_RELEASE_AT } from '../lib/release';
import { LettersScreen } from './LettersScreen';
const MAX_TIMEOUT = 2 ** 31 - 1;
function isReleasedPreview(searchParams) {
    return import.meta.env.DEV && searchParams.get('preview') === 'released';
}
/** 공개 시각 또는 개발용 ?preview=released에서 축하편지 서비스를 보여 준다. */
export function LettersPreReveal() {
    const [searchParams] = useSearchParams();
    const [released, setReleased] = useState(() => hasLettersReleased());
    const previewReleased = isReleasedPreview(searchParams);
    useEffect(() => {
        if (released)
            return;
        let timer;
        let disposed = false;
        const scheduleReleaseCheck = () => {
            timer = window.setTimeout(() => {
                if (disposed)
                    return;
                if (hasLettersReleased()) {
                    setReleased(true);
                    return;
                }
                scheduleReleaseCheck();
            }, Math.min(getLettersReleaseDelay(), MAX_TIMEOUT));
        };
        scheduleReleaseCheck();
        return () => {
            disposed = true;
            if (timer !== undefined)
                window.clearTimeout(timer);
        };
    }, [released]);
    if (previewReleased || released)
        return <LettersScreen />;
    return (<PendingRelease title="축하편지" message="축하편지 서비스는" releaseAt={LETTERS_RELEASE_AT} activeNavigationId="letters"/>);
}
