import { skipToken, useQuery } from '@tanstack/react-query';
import { useAuthSession } from '@/features/wish/auth';
import { getPerformance, getPerformances } from '../api/getPerformances';
export const performanceKeys = {
    all: ['performances'],
    detail: (id) => [...performanceKeys.all, 'detail', id],
};
/*
 * 세션 확인(토큰 갱신)이 끝나기 전에 요청하면, 로그인 여부가 정해지는 순간
 * authScoped 쿼리가 취소·삭제되면서 새로 고침 뒤 '불러오는 중'에 멈춘다.
 * 그래서 세션이 정해진 뒤에 부른다.
 */
export function usePerformance(id) {
    const { isInitializing } = useAuthSession();
    return useQuery({
        queryKey: performanceKeys.detail(id ?? 0),
        queryFn: id === null ? skipToken : ({ signal }) => getPerformance(id, signal),
        enabled: !isInitializing,
        meta: { authScoped: true },
    });
}
export function usePerformances({ refetchInterval } = {}) {
    const { isInitializing } = useAuthSession();
    return useQuery({
        queryKey: performanceKeys.all,
        queryFn: ({ signal }) => getPerformances(signal),
        enabled: !isInitializing,
        refetchInterval,
        meta: { authScoped: true },
    });
}
