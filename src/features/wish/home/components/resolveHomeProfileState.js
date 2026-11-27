export function resolveHomeProfileState({ authSession, meQuery, }) {
    if (authSession.status === 'unavailable')
        return 'error';
    if (authSession.status === 'initializing')
        return 'loading';
    if (!authSession.isAuthenticated)
        return 'guest';
    if (meQuery.isPending || (meQuery.isError && meQuery.isFetching))
        return 'loading';
    if (meQuery.isError)
        return 'error';
    return meQuery.data?.studentFeePaid === true ? 'paid' : 'unpaid';
}
