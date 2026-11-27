import { queryOptions, skipToken, useQuery } from '@tanstack/react-query';
import { useAuthSession } from '@/features/wish/auth';
import { getMyStamps } from '../api/getMyStamps';
export const myStampKeys = {
    all: ['stamps'],
    me: (sessionVersion) => ['stamps', 'me', sessionVersion],
};
/** 화면이 보일 때만 갱신하며 실패하면 자동 요청을 멈추고 마지막 성공 결과를 유지한다. */
export function myStampsQueryOptions(enabled, sessionVersion) {
    return queryOptions({
        queryKey: myStampKeys.me(sessionVersion),
        queryFn: enabled ? ({ signal }) => getMyStamps(signal) : skipToken,
        retry: false,
        staleTime: 0,
        refetchOnMount: 'always',
        refetchOnWindowFocus: 'always',
        refetchInterval: (query) => (query.state.status === 'success' ? 10_000 : false),
        refetchIntervalInBackground: false,
        meta: { authScoped: true },
    });
}
export function useMyStamps(enabled = true) {
    const { isAuthenticated, sessionVersion } = useAuthSession();
    return useQuery(myStampsQueryOptions(enabled && isAuthenticated, sessionVersion));
}
