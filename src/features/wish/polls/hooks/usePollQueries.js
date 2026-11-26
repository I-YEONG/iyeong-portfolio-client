import { skipToken, useQuery } from '@tanstack/react-query';
import { useAuthSession, useMe } from '@/features/wish/auth';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { getPoll, getPollResults, getPolls } from '../api/pollsApi';
export const pollKeys = {
    all: ['polls'],
    session: (version) => [...pollKeys.all, version],
    list: (version) => [...pollKeys.session(version), 'list'],
    detail: (version, id) => [...pollKeys.session(version), 'detail', id],
    submissions: (version, id) => [...pollKeys.session(version), 'submissions', id],
    results: (version, id) => [...pollKeys.session(version), 'results', id],
};
export function usePollGate() {
    const session = useAuthSession();
    const me = useMe(session.isAuthenticated);
    const profileError = me.error;
    const stage = session.status === 'initializing' || session.status === 'unavailable'
        ? 'waiting'
        : session.status === 'anonymous' ||
            (profileError instanceof ApiError && profileError.status === 401)
            ? 'login'
            : profileError instanceof ApiError &&
                profileError.status === 403 &&
                profileError.code === 'SCHOOL_VERIFICATION_REQUIRED'
                ? 'verify'
                : me.isPending
                    ? 'waiting'
                    : me.isError
                        ? 'error'
                        : me.data?.schoolVerified === true
                            ? 'ready'
                            : 'verify';
    return {
        stage,
        sessionVersion: session.sessionVersion,
        retry: () => {
            if (session.status === 'unavailable')
                void session.retrySession();
            else
                void me.refetch();
        },
    };
}
export function usePolls(version, enabled) {
    return useQuery({
        queryKey: pollKeys.list(version),
        queryFn: enabled ? ({ signal }) => getPolls(signal) : skipToken,
        meta: { authScoped: true },
    });
}
export function usePoll(id, version, enabled) {
    return useQuery({
        queryKey: pollKeys.detail(version, id ?? 0),
        queryFn: enabled && id !== null ? ({ signal }) => getPoll(id, signal) : skipToken,
        meta: { authScoped: true },
    });
}
export function usePollResults(id, version, enabled) {
    return useQuery({
        queryKey: pollKeys.results(version, id ?? 0),
        queryFn: enabled && id !== null ? ({ signal }) => getPollResults(id, signal) : skipToken,
        meta: { authScoped: true },
    });
}
