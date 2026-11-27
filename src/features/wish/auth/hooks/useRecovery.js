import { useEffect, useState, useSyncExternalStore } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RecoveryController } from '../recoveryController';
export function useRecovery() {
    const client = useQueryClient();
    const [controller] = useState(() => new RecoveryController(client));
    const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot);
    useEffect(() => {
        controller.activate();
        return () => controller.dispose();
    }, [controller]);
    const running = state.mode !== null && (state.step === 'entry' || state.step === 'password');
    useEffect(() => {
        if (!running)
            return;
        const timer = window.setInterval(controller.tick, 250);
        window.addEventListener('focus', controller.tick);
        return () => {
            window.clearInterval(timer);
            window.removeEventListener('focus', controller.tick);
        };
    }, [controller, running]);
    return { controller, state };
}
