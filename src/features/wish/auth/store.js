import { create } from 'zustand';
export const useAuthStore = create(() => ({
    status: 'initializing',
    sessionVersion: 0,
    pendingWelcomeSession: null,
}));
