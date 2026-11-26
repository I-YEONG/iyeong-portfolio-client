import { queryOptions, skipToken, useMutation, useQuery, useQueryClient, } from '@tanstack/react-query';
import { useAuthSession } from '@/features/wish/auth';
import { setBoothFavorite } from '../api/favoriteBooth';
import { getBooth, getBooths } from '../api/getBooths';
import { readCachedBooths, writeCachedBooths } from '../lib/boothCache';
export const boothKeys = {
    all: ['booths'],
    detail: (id) => [...boothKeys.all, 'detail', id],
};
/** 부스 정보는 거의 바뀌지 않아, 상세를 보고 돌아올 때마다 다시 받지 않는다. */
const BOOTHS_STALE_TIME = 60_000;
const boothListQuery = queryOptions({
    queryKey: boothKeys.all,
    queryFn: async ({ signal }) => {
        const booths = await getBooths(signal);
        writeCachedBooths(booths);
        return booths;
    },
    staleTime: BOOTHS_STALE_TIME,
    meta: { authScoped: true },
});
/** 로딩 중 렌더마다 저장소를 다시 읽지 않도록 페이지를 연 뒤 한 번만 읽는다. */
let placeholderBooths = null;
function getPlaceholderBooths() {
    if (placeholderBooths === null)
        placeholderBooths = readCachedBooths();
    return placeholderBooths;
}
/**
 * 부스맵으로 이동을 시작할 때 목록 요청도 같이 시작한다. (routes/booth.ts)
 * 페이지 코드를 받는 동안 데이터도 받아 두어 화면이 뜨자마자 쓸 수 있게 한다.
 * 세션 확인과 겹쳐 취소되더라도 화면이 뜬 뒤 useBooths가 다시 받으므로 기다리지 않는다.
 */
export function prefetchBooths(client) {
    void client.prefetchQuery(boothListQuery);
}
/*
 * 세션 확인(토큰 갱신)이 끝나기 전에 요청하면, 비로그인으로 판정되는 순간
 * authScoped 쿼리가 취소·삭제되면서 목록이 '불러오는 중'에 멈춘다.
 * 북마크 여부도 로그인 상태에 따라 달라지므로 세션이 정해진 뒤에 부른다.
 *
 * 기다리는 동안에는 기기에 남겨 둔 지난 목록을 먼저 보여 준다. (isPlaceholderData)
 */
export function useBooths(enabled = true) {
    const { isInitializing } = useAuthSession();
    return useQuery({
        ...boothListQuery,
        enabled: enabled && !isInitializing,
        placeholderData: getPlaceholderBooths,
    });
}
export function useBooth(id) {
    const { isInitializing } = useAuthSession();
    return useQuery({
        queryKey: boothKeys.detail(id ?? 0),
        queryFn: id === null ? skipToken : ({ signal }) => getBooth(id, signal),
        enabled: !isInitializing,
        meta: { authScoped: true },
    });
}
/** 북마크 상태를 바꾸면서 북마크 수도 같이 한 칸 옮긴다. 이미 같은 상태면 그대로 둔다. */
function withFavorite(booth, favorited) {
    if (booth.favorited === favorited)
        return booth;
    const favoriteCount = booth.favoriteCount === null ? null : Math.max(0, booth.favoriteCount + (favorited ? 1 : -1));
    return { ...booth, favorited, favoriteCount };
}
/**
 * 북마크는 누른 즉시 반영하고 실패하면 되돌린다.
 * 목록과 상세가 같은 값을 보여야 해서 두 캐시를 함께 고친다.
 */
export function useToggleBoothFavorite() {
    const queryClient = useQueryClient();
    const writeCaches = ({ id, favorited }) => {
        queryClient.setQueryData(boothKeys.all, (booths) => booths?.map((booth) => (booth.id === id ? withFavorite(booth, favorited) : booth)));
        queryClient.setQueryData(boothKeys.detail(id), (booth) => booth === undefined ? booth : withFavorite(booth, favorited));
    };
    return useMutation({
        mutationFn: ({ id, favorited }) => setBoothFavorite(id, favorited),
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: boothKeys.all });
            writeCaches(variables);
            return variables;
        },
        onError: (_error, variables) => {
            writeCaches({ ...variables, favorited: !variables.favorited });
        },
        onSettled: () => {
            void queryClient.invalidateQueries({ queryKey: boothKeys.all });
        },
    });
}
