export function resolveMyPageState({ hasProfile, isInitializing, isAuthenticated, isProfilePending, hasOpenDialog, }) {
    if (hasProfile)
        return 'ready';
    if (isInitializing || (isAuthenticated && isProfilePending))
        return 'loading';
    // 인증된 세션에서 조회만 실패한 경우까지 로그인으로 보내면,
    // LoginScreen이 다시 홈으로 돌려보내서 오류와 재시도가 통째로 사라진다.
    if (isAuthenticated)
        return 'load-failed';
    if (hasOpenDialog)
        return 'load-failed';
    return 'redirect-login';
}
