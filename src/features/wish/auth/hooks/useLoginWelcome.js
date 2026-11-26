import { resolveLoginWelcome } from '../loginWelcome';
import { dismissLoginWelcome } from '../session';
import { useAuthStore } from '../store';
import { useSessionMe } from './useMe';
/** /me 캐시를 공유하며 미리보기나 자동 세션 복원으로 초대장을 만들지 않는다. */
export function useLoginWelcome(enabled = true) {
    const { status, sessionVersion, pendingWelcomeSession } = useAuthStore();
    const profile = useSessionMe(enabled);
    const invitation = enabled
        ? resolveLoginWelcome({
            status,
            sessionVersion,
            pendingWelcomeSession,
            profileSessionVersion: profile.sessionVersion,
            isSuccess: profile.query.isSuccess,
            profile: profile.query.data,
        })
        : null;
    return { invitation, dismiss: dismissLoginWelcome };
}
