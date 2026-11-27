import { useEffect, useReducer } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBambooMessages } from '../api/getBambooMessages';
const PAGE_SIZE = 50;
const LIVE_PAGE_SIZE = 200;
const POLLING_INTERVAL = 3_000;
const INITIAL_BEFORE = '9223372036854775807';
export const initialMessageState = {
    messages: [],
    cursor: null,
    hasOlderMessages: true,
    latestSequenceById: new Map(),
};
function getLatestCursor(currentCursor, incomingCursor) {
    if (typeof currentCursor !== 'number')
        return incomingCursor ?? null;
    if (typeof incomingCursor !== 'number')
        return currentCursor;
    return Math.max(currentCursor, incomingCursor);
}
function mergeMessageChanges(currentMessages, currentSequences, incomingMessages) {
    const messagesById = new Map(currentMessages.flatMap((message) => message.id === undefined ? [] : [[message.id, message]]));
    const latestSequenceById = new Map(currentSequences);
    incomingMessages.forEach((message) => {
        if (message.id === undefined)
            return;
        const latestSequence = latestSequenceById.get(message.id);
        const sequence = message.seq ?? 0;
        if (latestSequence !== undefined && latestSequence > sequence)
            return;
        latestSequenceById.set(message.id, sequence);
        messagesById.set(message.id, message);
    });
    return {
        messages: [...messagesById.values()].sort((left, right) => (left.id ?? 0) - (right.id ?? 0)),
        latestSequenceById,
    };
}
export function bambooMessageReducer(state, action) {
    switch (action.type) {
        case 'reset':
            return initialMessageState;
        case 'initial': {
            const messages = action.stream.messages ?? [];
            const merged = mergeMessageChanges(state.messages, state.latestSequenceById, messages);
            return {
                messages: merged.messages,
                cursor: getLatestCursor(state.cursor, action.stream.cursor),
                hasOlderMessages: messages.length === PAGE_SIZE,
                latestSequenceById: merged.latestSequenceById,
            };
        }
        case 'updates': {
            const messages = action.stream.messages ?? [];
            const merged = mergeMessageChanges(state.messages, state.latestSequenceById, messages);
            return {
                ...state,
                messages: merged.messages,
                cursor: getLatestCursor(state.cursor, action.stream.cursor),
                latestSequenceById: merged.latestSequenceById,
            };
        }
        case 'older': {
            const messages = action.stream.messages ?? [];
            const merged = mergeMessageChanges(state.messages, state.latestSequenceById, messages);
            return {
                ...state,
                messages: merged.messages,
                hasOlderMessages: messages.length === PAGE_SIZE,
                latestSequenceById: merged.latestSequenceById,
            };
        }
        case 'append': {
            const merged = mergeMessageChanges(state.messages, state.latestSequenceById, [action.message]);
            return {
                ...state,
                messages: merged.messages,
                latestSequenceById: merged.latestSequenceById,
            };
        }
    }
}
/** 최초 목록, 과거 메시지와 폴링 수신을 하나의 시간순 목록으로 관리한다. */
export function useBambooMessages(enabled, sessionVersion) {
    const [state, dispatch] = useReducer(bambooMessageReducer, initialMessageState);
    const initial = useQuery({
        queryKey: ['bamboo', 'messages', sessionVersion, 'initial'],
        queryFn: ({ signal }) => getBambooMessages({ before: INITIAL_BEFORE, size: PAGE_SIZE }, signal),
        enabled,
        retry: false,
        meta: { authScoped: true },
    });
    useEffect(() => {
        if (!enabled) {
            dispatch({ type: 'reset' });
            return;
        }
        if (!initial.data)
            return;
        dispatch({ type: 'initial', stream: initial.data });
    }, [enabled, initial.data]);
    const updates = useQuery({
        queryKey: ['bamboo', 'messages', sessionVersion, 'after', state.cursor],
        queryFn: ({ signal }) => getBambooMessages({ after: state.cursor ?? undefined, size: LIVE_PAGE_SIZE }, signal),
        enabled: enabled && state.cursor !== null,
        refetchInterval: POLLING_INTERVAL,
        refetchIntervalInBackground: false,
        retry: false,
        meta: { authScoped: true },
    });
    useEffect(() => {
        if (!updates.data)
            return;
        dispatch({ type: 'updates', stream: updates.data });
    }, [updates.data]);
    const older = useMutation({
        mutationFn: (before) => getBambooMessages({ before, size: PAGE_SIZE }),
        retry: false,
    });
    async function loadOlderMessages() {
        const oldestId = state.messages[0]?.id;
        if (older.isPending || !state.hasOlderMessages || oldestId === undefined)
            return false;
        try {
            const page = await older.mutateAsync(oldestId);
            const olderMessages = page.messages ?? [];
            dispatch({ type: 'older', stream: page });
            return olderMessages.length > 0;
        }
        catch {
            return false;
        }
    }
    function appendMessage(message) {
        dispatch({ type: 'append', message });
    }
    return {
        messages: state.messages,
        appendMessage,
        hasOlderMessages: state.hasOlderMessages,
        loadOlderMessages,
        isLoadingOlderMessages: older.isPending,
        isLoadingInitialMessages: initial.isPending,
        initialError: initial.error,
        refetchInitialMessages: initial.refetch,
    };
}
