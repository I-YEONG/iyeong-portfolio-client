import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getNotice, getNoticeBanner, getNotices } from '../api/getNotices';
import { getNextPageParam } from '../utils';
export const noticeKeys = {
    all: ['notices'],
    list: (size = 100) => [...noticeKeys.all, 'list', size],
    banner: () => [...noticeKeys.all, 'banner'],
    detail: (id) => [...noticeKeys.all, 'detail', id],
};
export function useNotices(size = 100) {
    return useInfiniteQuery({
        queryKey: noticeKeys.list(size),
        queryFn: ({ pageParam }) => getNotices({ page: Number(pageParam), size }),
        initialPageParam: 0,
        getNextPageParam,
    });
}
export function useNoticeBanner() {
    return useQuery({
        queryKey: noticeKeys.banner(),
        queryFn: getNoticeBanner,
    });
}
export function useNotice(id) {
    return useQuery({
        queryKey: noticeKeys.detail(id),
        queryFn: () => getNotice(id),
        enabled: Number.isInteger(id) && id > 0,
    });
}
