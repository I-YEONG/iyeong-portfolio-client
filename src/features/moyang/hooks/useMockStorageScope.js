import { useSyncExternalStore } from 'react';
import { getMockStorageScope } from '@/features/moyang/lib/mock-storage';
const subscribe = (onChange) => {
    window.addEventListener('storage', onChange);
    return () => window.removeEventListener('storage', onChange);
};
export const useMockStorageScope = () => useSyncExternalStore(subscribe, getMockStorageScope);
