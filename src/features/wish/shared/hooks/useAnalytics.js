import { useEffect, useRef } from 'react';
import { useLocation, useMatches } from 'react-router';
import { flushEvents, sendHeartbeat, trackEvent } from '@/features/wish/shared/lib/analytics';
import { eventTypeForRoute, toRoutePattern } from '@/features/wish/shared/lib/analytics/route';
/** 접속 heartbeat 주기 */
const HEARTBEAT_INTERVAL_MS = 60_000;
/**
 * 페이지 방문·이탈 수집과 접속 heartbeat.
 *
 * 라우터 안에서 한 번만 마운트한다. RootLayout에서 쓰므로 params는
 * useParams가 아니라 실제로 매칭된 마지막 라우트에서 가져온다.
 * 수집 실패는 화면에 영향을 주지 않는다.
 */
export function useAnalytics() {
    const { pathname } = useLocation();
    const matches = useMatches();
    const params = (matches.at(-1)?.params ?? {});
    const route = toRoutePattern(pathname, params);
    const targetId = params.id;
    /** 이탈 이벤트의 체류 시간 계산용 */
    const enteredAt = useRef(0);
    useEffect(() => {
        enteredAt.current = Date.now();
        trackEvent(eventTypeForRoute(route), { route, targetId });
        return () => {
            trackEvent('PAGE_LEAVE', { route, targetId, durationMs: Date.now() - enteredAt.current });
        };
    }, [route, targetId]);
    useEffect(() => {
        sendHeartbeat(route);
        const timer = setInterval(() => sendHeartbeat(route), HEARTBEAT_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [route]);
    /* 탭을 닫거나 숨길 때 모아둔 이벤트를 흘려보낸다. */
    useEffect(() => {
        const flush = () => flushEvents(true);
        const flushWhenHidden = () => {
            if (document.visibilityState === 'hidden')
                flush();
        };
        window.addEventListener('pagehide', flush);
        document.addEventListener('visibilitychange', flushWhenHidden);
        return () => {
            window.removeEventListener('pagehide', flush);
            document.removeEventListener('visibilitychange', flushWhenHidden);
        };
    }, []);
}
