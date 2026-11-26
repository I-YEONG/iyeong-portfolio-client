import { Outlet, ScrollRestoration } from 'react-router';
import { useAnalytics } from '@/features/wish/shared/hooks/useAnalytics';
/** 모든 페이지를 최대 480px의 반응형 프레임 안에 렌더링한다. */
export function RootLayout() {
    // 백엔드 요구사항: 페이지 방문·이탈과 접속 heartbeat를 남긴다.
    useAnalytics();
    return (<div className="relative mx-auto min-h-dvh w-full max-w-mobile">
      <Outlet />
      <ScrollRestoration />
    </div>);
}
