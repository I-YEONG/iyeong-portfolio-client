/** 성공한 현재 세션의 프로필만 사용한다. 이름과 납부 값은 런타임에서도 확인한다. */
export function resolveLoginWelcome({ status, sessionVersion, pendingWelcomeSession, profileSessionVersion, isSuccess, profile, }) {
    if (status !== 'authenticated' ||
        pendingWelcomeSession !== sessionVersion ||
        profileSessionVersion !== sessionVersion ||
        !isSuccess ||
        !profile ||
        typeof profile !== 'object' ||
        Array.isArray(profile)) {
        return null;
    }
    const name = typeof profile.name === 'string' ? profile.name.trim() : '';
    return {
        sessionVersion,
        name: name || '회원',
        suffix: '님',
        isPaid: profile.studentFeePaid === true,
    };
}
