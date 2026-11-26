import { apiClient } from '@/features/wish/shared/lib/api-client';
import { getSessionId } from './session';
/** 접속 heartbeat. 서버가 TTL로 지우므로 주기만 맞추면 된다. */
export function sendHeartbeat(route) {
    void apiClient
        .post('/api/presence/heartbeat', { sessionId: getSessionId(), route }, { authMode: 'optional' })
        .catch(() => undefined);
}
