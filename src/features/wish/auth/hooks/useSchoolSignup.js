import { useEffect, useState, useSyncExternalStore } from 'react';
import { SchoolSignupController } from '../schoolSignupController';
import { browserDraftStorage } from '../signupDraft';
export function useSchoolSignup(result) {
    const [controller] = useState(() => new SchoolSignupController(browserDraftStorage(), Date.now, result));
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
