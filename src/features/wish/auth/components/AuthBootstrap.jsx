import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useMe } from '../hooks/useMe';
import { initializeSession, subscribeToSession } from '../session';
export function AuthBootstrap() {
    const client = useQueryClient();
    useMe();
    useEffect(() => {
        const unsubscribe = subscribeToSession(client);
        void initializeSession(client);
        // StrictMode의 setup/cleanup에서도 진행 중 refresh는 공유한다.
        return unsubscribe;
    }, [client]);
    return null;
}
