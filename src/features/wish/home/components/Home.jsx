import { useRef } from 'react';
import { useAuthSession, useLoginWelcome, useMe } from '@/features/wish/auth';
import { HomeScreen } from './HomeScreen';
import { LoginWelcome } from './LoginWelcome';
import { resolveHomeProfileState } from './resolveHomeProfileState';
function getPreviewProfileState() {
    if (!import.meta.env.DEV)
        return null;
    const preview = new URLSearchParams(window.location.search).get('preview');
    return preview === 'guest' || preview === 'paid' || preview === 'unpaid' ? preview : null;
}
/**
 * 납부자: /home?preview=paid
 * 미납부자: /home?preview=unpaid
 * 게스트: /home?preview=guest
 */
export function Home() {
    const previewProfileState = getPreviewProfileState();
    const homeHeading = useRef(null);
    const authSession = useAuthSession();
    const meQuery = useMe(previewProfileState === null && authSession.isAuthenticated);
    const welcome = useLoginWelcome(previewProfileState === null);
    const profileState = previewProfileState ?? resolveHomeProfileState({ authSession, meQuery });
    const handleRetry = () => {
        if (authSession.status === 'unavailable') {
            void authSession.retrySession();
            return;
        }
        void meQuery.refetch();
    };
    return (<>
      <div inert={welcome.invitation !== null}>
        <HomeScreen headingRef={homeHeading} profileState={profileState} onRetry={handleRetry}/>
      </div>
      {welcome.invitation && (<LoginWelcome key={welcome.invitation.sessionVersion} invitation={welcome.invitation} onDismiss={welcome.dismiss} returnFocusRef={homeHeading}/>)}
    </>);
}
