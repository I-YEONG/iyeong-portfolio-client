import { PendingRelease } from '@/components/wish/PendingRelease';
import { hasReleaseStarted, getEarliestPublishedAt } from '../lib/release';
import { usePerformances } from '../hooks/usePerformances';
import { PerformanceReleased } from './PerformanceReleased';
function getPreviewState() {
    if (!import.meta.env.DEV)
        return null;
    const preview = new URLSearchParams(window.location.search).get('preview');
    return preview === 'pending' || preview === 'released' ? preview : null;
}
/** 공연팀과 타임테이블 공개 전 안내 화면이다. */
export function PerformancePreReveal() {
    const previewState = getPreviewState();
    const { data: performances, isError, isPending, refetch, } = usePerformances({
        refetchInterval: 60_000,
    });
    if (previewState === 'released') {
        return <PerformanceReleased forceTimetableReleased/>;
    }
    if (isPending) {
        return (<main className="grid min-h-dvh place-items-center bg-black" role="status">
        <span aria-label="공연 공개 일시를 불러오고 있습니다" className="size-9 animate-spin rounded-full border-2 border-white/30 border-t-main-01"/>
      </main>);
    }
    if (isError) {
        return (<main className="grid min-h-dvh place-items-center bg-black px-6 text-center font-body text-sm text-white">
        <div className="flex flex-col items-center gap-4">
          <p>공연 정보를 불러오지 못했습니다.</p>
          <button type="button" onClick={() => void refetch()} className="min-h-11 rounded-full border border-white/50 px-5 py-2 font-medium">
            다시 시도
          </button>
        </div>
      </main>);
    }
    const releaseAt = performances ? getEarliestPublishedAt(performances) : undefined;
    if (!releaseAt) {
        return (<PendingRelease title="연예인 공개" message="LINE UP은" releaseMessage="공개 준비 중입니다." activeNavigationId="performances"/>);
    }
    if (previewState === 'pending' || !hasReleaseStarted(releaseAt)) {
        return (<PendingRelease title="연예인 공개" message="LINE UP은" releaseAt={releaseAt} activeNavigationId="performances"/>);
    }
    return <PerformanceReleased />;
}
