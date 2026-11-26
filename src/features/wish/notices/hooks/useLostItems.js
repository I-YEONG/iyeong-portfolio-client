import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getLostItem, getLostItems } from '../api/getLostItems';
import { getNextPageParam } from '../utils';
export const lostItemKeys = {
    all: ['lost-items'],
    list: (size = 100) => [...lostItemKeys.all, 'list', size],
    detail: (id) => [...lostItemKeys.all, 'detail', id],
};
export function useLostItems(size = 100) {
    return useInfiniteQuery({
        queryKey: lostItemKeys.list(size),
        queryFn: ({ pageParam }) => getLostItems({ page: Number(pageParam), size }),
        initialPageParam: 0,
        getNextPageParam,
    });
}
export function useLostItem(id) {
    return useQuery({
        queryKey: lostItemKeys.detail(id),
        queryFn: () => getLostItem(id),
        enabled: Number.isInteger(id) && id > 0,
    });
}
