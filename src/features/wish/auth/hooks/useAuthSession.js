import { useQueryClient } from '@tanstack/react-query';
import { initializeSession } from '../session';
import { useAuthStore } from '../store';
export function useAuthSession() {
    const client = useQueryClient();
    const status = useAuthStore((state) => state.status);
    const sessionVersion = useAuthStore((state) => state.sessionVersion);
    return {
        status,
        sessionVersion,
        isAuthenticated: status === 'authenticated',
        isInitializing: status === 'initializing',
        retrySession: () => initializeSession(client),
    };
}
