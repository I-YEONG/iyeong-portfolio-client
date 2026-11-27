import { CanceledError, isCancel } from 'axios';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { authToken } from '@/features/wish/shared/lib/auth-token';
import { logout } from './api/logout';
import { refreshToken } from './api/refreshToken';
import { authKeys } from './queryKeys';
import { useAuthStore } from './store';
let initialization;
let logoutRequest;
function setStatus(status) {
    const sessionVersion = authToken.getSessionVersion();
    useAuthStore.setState((state) => ({
        status,
        sessionVersion,
        pendingWelcomeSession: status === 'authenticated' && state.pendingWelcomeSession === sessionVersion
            ? state.pendingWelcomeSession
            : null,
    }));
}
function clearUserQueries(client) {
    const filters = {
        predicate: (query) => query.queryKey[0] === authKeys.all[0] || query.meta?.authScoped === true,
    };
    // cancelQueries는 AbortSignal을 전달하고, removeQueries는 이전 사용자 데이터도 제거한다.
    void client.cancelQueries(filters);
    client.removeQueries(filters);
}
function cancelInitialization() {
    initialization?.controller.abort();
    initialization = undefined;
}
export function startSession(client, token) {
    cancelInitialization();
    useAuthStore.setState({ pendingWelcomeSession: null });
    clearUserQueries(client);
    authToken.startSession(token);
    setStatus('authenticated');
}
/** 명시적 로그인 응답의 마지막 수명 검사 뒤에만 새 세션의 초대장을 예약한다. */
export function completeExplicitLogin(client, token, signal, expectedSessionVersion) {
    if (signal.aborted || expectedSessionVersion !== authToken.getSessionVersion())
        return false;
    startSession(client, token);
    useAuthStore.setState({ pendingWelcomeSession: authToken.getSessionVersion() });
    return true;
}
export function dismissLoginWelcome(sessionVersion) {
    const state = useAuthStore.getState();
    if (state.status === 'authenticated' &&
        sessionVersion === authToken.getSessionVersion() &&
        state.pendingWelcomeSession === sessionVersion) {
        useAuthStore.setState({ pendingWelcomeSession: null });
    }
}
export function endSession(client) {
    cancelInitialization();
    authToken.clear();
    clearUserQueries(client);
    // 초기 토큰도 null이었다면 구독 알림이 없으므로 직접 완료한다.
    setStatus('anonymous');
}
export function subscribeToSession(client) {
    return authToken.subscribe((token) => {
        if (token) {
            // 응답 헤더에 의한 토큰 회전은 /me 캐시를 버리지 않는다.
            setStatus('authenticated');
        }
        else {
            cancelInitialization();
            clearUserQueries(client);
            setStatus('anonymous');
        }
    });
}
export function initializeSession(client) {
    if (initialization)
        return initialization.promise;
    const { status } = useAuthStore.getState();
    if (status === 'authenticated' || status === 'anonymous')
        return Promise.resolve();
    setStatus('initializing');
    const version = authToken.getSessionVersion();
    const controller = new AbortController();
    const promise = refreshToken(controller.signal)
        .then((token) => {
        if (!controller.signal.aborted && version === authToken.getSessionVersion()) {
            startSession(client, token);
        }
    })
        .catch((error) => {
        if (isCancel(error) ||
            controller.signal.aborted ||
            version !== authToken.getSessionVersion()) {
            return;
        }
        if (error instanceof ApiError && error.status === 401)
            endSession(client);
        else
            setStatus('unavailable');
    })
        .finally(() => {
        if (initialization?.controller === controller)
            initialization = undefined;
    });
    initialization = { controller, promise };
    return promise;
}
export function logoutSession(client) {
    const version = authToken.getSessionVersion();
    if (logoutRequest?.version === version)
        return logoutRequest.promise;
    if (useAuthStore.getState().status !== 'authenticated') {
        return Promise.reject(new ApiError(401, 'AUTH_REQUIRED', '로그인이 필요합니다.'));
    }
    // 서버가 Refresh 쿠키를 폐기할 때까지 Bearer/로컬 세션을 유지한다.
    const promise = logout()
        .then(() => {
        if (version !== authToken.getSessionVersion())
            throw new CanceledError();
        endSession(client);
    })
        .finally(() => {
        if (logoutRequest?.promise === promise)
            logoutRequest = undefined;
    });
    logoutRequest = { version, promise };
    return promise;
}
