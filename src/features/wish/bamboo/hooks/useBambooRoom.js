import { skipToken, useQuery } from '@tanstack/react-query';
import { getBambooRoom } from '../api/getBambooRoom';
export function useBambooRoom(enabled, sessionVersion) {
    return useQuery({
        queryKey: ['bamboo', 'room', sessionVersion],
        queryFn: enabled ? ({ signal }) => getBambooRoom(signal) : skipToken,
        retry: false,
        staleTime: 0,
        refetchOnMount: 'always',
        meta: { authScoped: true },
    });
}
