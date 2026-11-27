import { QueryClient } from '@tanstack/react-query';
import { ApiError } from './api-client';
// 백엔드 재시도 기준: 네트워크 오류, 429, 502, 503만 자동 재시도. 4xx는 재시도 금지.
const RETRYABLE_STATUS = new Set([0, 429, 502, 503]);
const MAX_RETRY = 2;
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => error instanceof ApiError && RETRYABLE_STATUS.has(error.status) && failureCount < MAX_RETRY,
        },
        mutations: {
            retry: false,
        },
    },
});
