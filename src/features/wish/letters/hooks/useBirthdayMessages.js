import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBirthdayMessage, deleteBirthdayMessage, getBirthdayMessage, getBirthdayMessages, getMyBirthdayMessage, setBirthdayMessageHeart, } from '../api/birthdayMessages';
import { getBirthdayMessageRetryDelay, shouldRetryBirthdayMessageQuery, } from '../api/birthdayMessageError';
export const birthdayMessageKeys = {
    all: ['birthday-messages'],
    list: (sort, page, size) => [...birthdayMessageKeys.all, 'list', sort, page, size],
    detail: (id) => [...birthdayMessageKeys.all, 'detail', id],
    mine: () => [...birthdayMessageKeys.all, 'mine'],
};
const birthdayMessageListKey = [...birthdayMessageKeys.all, 'list'];
const BIRTHDAY_MESSAGE_LIST_STALE_TIME = 60_000;
const BIRTHDAY_MESSAGE_LIST_GC_TIME = 10 * 60_000;
/** 공개 쪽지를 백엔드의 0부터 시작하는 페이지 번호 단위로 불러온다. */
export function useBirthdayMessages(sort = 'LATEST', page = 0, size = 20, enabled = true) {
    return useQuery({
        queryKey: birthdayMessageKeys.list(sort, page, size),
        queryFn: ({ signal }) => getBirthdayMessages({ page, size, sort }, signal),
        enabled,
        retry: shouldRetryBirthdayMessageQuery,
        retryDelay: getBirthdayMessageRetryDelay,
        staleTime: BIRTHDAY_MESSAGE_LIST_STALE_TIME,
        gcTime: BIRTHDAY_MESSAGE_LIST_GC_TIME,
        meta: { authScoped: true },
    });
}
export function useBirthdayMessage(id) {
    return useQuery({
        queryKey: birthdayMessageKeys.detail(id),
        queryFn: ({ signal }) => getBirthdayMessage(id, signal),
        enabled: Number.isInteger(id) && id > 0,
        retry: shouldRetryBirthdayMessageQuery,
        retryDelay: getBirthdayMessageRetryDelay,
        meta: { authScoped: true },
    });
}
export function useMyBirthdayMessage(enabled) {
    return useQuery({
        queryKey: birthdayMessageKeys.mine(),
        queryFn: ({ signal }) => getMyBirthdayMessage(signal),
        enabled,
        retry: shouldRetryBirthdayMessageQuery,
        retryDelay: getBirthdayMessageRetryDelay,
        meta: { authScoped: true },
    });
}
export function useCreateBirthdayMessage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (request) => createBirthdayMessage(request),
        retry: false,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: birthdayMessageKeys.all });
        },
    });
}
export function useDeleteBirthdayMessage() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => deleteBirthdayMessage(id),
        retry: false,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: birthdayMessageKeys.all });
        },
    });
}
export function useSetBirthdayMessageHeart() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, hearted }) => setBirthdayMessageHeart(id, hearted),
        retry: false,
        onSuccess: (heart, { id }) => {
            queryClient.setQueryData(birthdayMessageKeys.detail(id), (message) => message
                ? {
                    ...message,
                    heartCount: heart.heartCount,
                    heartedByMe: heart.heartedByMe,
                }
                : message);
            queryClient.setQueriesData({ queryKey: birthdayMessageListKey }, (page) => page
                ? {
                    ...page,
                    items: page.items.map((message) => message.id === id
                        ? {
                            ...message,
                            heartCount: heart.heartCount,
                            heartedByMe: heart.heartedByMe,
                        }
                        : message),
                }
                : page);
            void queryClient.invalidateQueries({ queryKey: birthdayMessageKeys.all });
        },
    });
}
