import { skipToken, useQuery } from '@tanstack/react-query';
import { getMe } from '../api/getMe';
import { authKeys } from '../queryKeys';
import { useAuthStore } from '../store';
/**
 * 내 정보 조회.
 *
 * enabled는 호출부에서 조회를 잠시 끌 때 쓴다. (예: 홈 화면의 미리보기 모드)
 */
export function useMe(enabled = true) {
    return useSessionMe(enabled).query;
}
/** 내부 소비자가 프로필과 해당 query key의 세션 버전을 함께 읽는다. */
export function useSessionMe(enabled = true) {
    const { status, sessionVersion } = useAuthStore();
    const query = useQuery({
        queryKey: authKeys.me(sessionVersion),
        queryFn: enabled && status === 'authenticated' ? ({ signal }) => getMe(signal) : skipToken,
        staleTime: 60_000,
        meta: { authScoped: true },
    });
    return { query, sessionVersion };
}
