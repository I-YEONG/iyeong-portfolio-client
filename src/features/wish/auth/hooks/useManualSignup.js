import { useEffect, useState, useSyncExternalStore } from 'react';
import { ManualSignupController } from '../manualSignupController';
import { browserDraftStorage } from '../signupDraft';
export function useManualSignup() {
    const [controller] = useState(() => new ManualSignupController(browserDraftStorage(), Date.now));
    const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot);
    useEffect(() => {
        void controller.activate();
        const timer = window.setInterval(controller.tick, 1000);
        window.addEventListener('focus', controller.tick);
        return () => {
            window.clearInterval(timer);
            window.removeEventListener('focus', controller.tick);
            controller.dispose();
        };
    }, [controller]);
    return { controller, state };
}
