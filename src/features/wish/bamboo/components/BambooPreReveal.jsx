import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { PendingRelease } from '@/components/wish/PendingRelease';
import { BAMBOO_RELEASE_AT, hasBambooReleased } from '../lib/release';
import { BambooEntry } from './BambooEntry';
import { getBambooPreview } from '../lib/preview';
/** 공개 시각 전에는 안내 화면을, 이후에는 대나무숲 화면을 표시한다. */
export function BambooPreReveal() {
    const [now, setNow] = useState(Date.now);
    const [searchParams] = useSearchParams();
    const preview = getBambooPreview(searchParams);
    const isReleased = preview !== null || hasBambooReleased(now);
    useEffect(() => {
        if (isReleased)
            return;
        const delay = Date.parse(BAMBOO_RELEASE_AT) - Date.now();
        const timer = window.setTimeout(() => setNow(Date.now()), delay);
        return () => window.clearTimeout(timer);
    }, [isReleased]);
    if (isReleased)
        return <BambooEntry preview={preview}/>;
    return (<PendingRelease title="대나무숲" message="대나무숲 서비스는" releaseAt={BAMBOO_RELEASE_AT} activeNavigationId="bamboo"/>);
}
