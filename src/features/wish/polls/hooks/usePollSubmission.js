import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { authToken } from '@/features/wish/shared/lib/auth-token';
import { getMyPollSubmissions, submitPoll } from '../api/pollsApi';
import { findNewSubmission } from '../lib/polls';
import { pollKeys } from './usePollQueries';
/** 모달이 닫혀도 같은 세션/투표에서 불확실한 POST를 재전송하지 않도록 보존한다. */
const attempts = new Map();
const attemptKey = (version, id) => `${version}:${id}`;
export function usePollSubmission(id, version, onBlocked, onVerificationRequired) {
    const client = useQueryClient();
    const mounted = useRef(true);
    const localFlight = useRef(false);
    const key = attemptKey(version, id);
    const initial = attempts.get(key);
    const [status, setStatus] = useState(initial?.state === 'success' ? 'success' : initial ? 'unresolved' : 'idle');
    const [message, setMessage] = useState(initial?.state === 'success'
        ? '제출이 확인되었습니다.'
        : initial
            ? '이전 제출의 처리 상태를 확인해 주세요.'
            : '');
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    const live = () => mounted.current && authToken.getSessionVersion() === version;
    const show = (next, text) => {
        if (live()) {
            setStatus(next);
            setMessage(text);
        }
    };
    const refresh = () => {
        if (!live())
            return;
        void client.invalidateQueries({ queryKey: pollKeys.list(version) });
        void client.invalidateQueries({ queryKey: pollKeys.detail(version, id) });
        void client.invalidateQueries({ queryKey: pollKeys.submissions(version, id) });
        void client.invalidateQueries({ queryKey: pollKeys.results(version, id) });
    };
    const verificationError = (error) => error instanceof ApiError &&
        error.status === 403 &&
        error.code === 'SCHOOL_VERIFICATION_REQUIRED';
    const verify = async () => {
        if (localFlight.current || authToken.getSessionVersion() !== version)
            return;
        const attempt = attempts.get(key);
        if (attempt?.state === 'pending') {
            show('unresolved', '이전 제출이 아직 처리 중입니다. 잠시 후 다시 확인해 주세요.');
            return;
        }
        if (!attempt) {
            show('idle', '확인할 이전 제출이 없습니다.');
            return;
        }
        localFlight.current = true;
        show('sending', '제출 내역을 확인하는 중입니다.');
        try {
            const after = await getMyPollSubmissions(id);
            if (!live())
                return;
            if (findNewSubmission(attempt.before, after, attempt.answers) ||
                attempt.state === 'success') {
                attempt.state = 'success';
                show('success', '제출이 확인되었습니다.');
                refresh();
            }
            else {
                attempt.state = 'unresolved';
                show('unresolved', '새 제출이 확인되지 않았습니다. 직접 재시도할 수 있습니다.');
            }
        }
        catch (error) {
            if (!live())
                return;
            if (verificationError(error))
                onVerificationRequired();
            else
                show('unresolved', '제출 여부를 확인하지 못했습니다. 연결을 확인한 뒤 다시 확인해 주세요.');
        }
        finally {
            localFlight.current = false;
        }
    };
    const submit = async (answers) => {
        if (localFlight.current || attempts.has(key) || authToken.getSessionVersion() !== version)
            return;
        localFlight.current = true;
        const attempt = { state: 'pending', before: [], answers };
        attempts.set(key, attempt);
        show('sending', '제출 전 내역을 확인하는 중입니다.');
        let before;
        try {
            before = await getMyPollSubmissions(id);
            attempt.before = before;
        }
        catch (error) {
            attempts.delete(key);
            if (!live())
                return;
            if (verificationError(error))
                onVerificationRequired();
            else
                show('idle', '제출 전 내역을 확인하지 못했습니다. 다시 시도해 주세요.');
            localFlight.current = false;
            return;
        }
        if (!live()) {
            attempts.delete(key);
            localFlight.current = false;
            return;
        }
        if (before.length > 0) {
            attempt.state = 'success';
            show('blocked', '이미 참여한 투표입니다.');
            refresh();
            localFlight.current = false;
            return;
        }
        show('sending', '투표를 제출하는 중입니다.');
        try {
            await submitPoll(id, answers);
            attempt.state = 'success';
            show('success', '투표가 완료되었습니다.');
            refresh();
        }
        catch (error) {
            if (!live()) {
                attempt.state = 'unresolved';
                return;
            }
            if (verificationError(error)) {
                attempts.delete(key);
                onVerificationRequired();
            }
            else if (error instanceof ApiError &&
                error.status === 409 &&
                (error.code === 'POLL_NOT_OPEN' || error.code === 'POLL_ALREADY_SUBMITTED')) {
                attempts.delete(key);
                show('blocked', '투표 상태가 변경되었습니다. 최신 상태를 확인해 주세요.');
                onBlocked();
                refresh();
            }
            else {
                try {
                    const after = await getMyPollSubmissions(id);
                    if (!live()) {
                        attempt.state = 'unresolved';
                        return;
                    }
                    if (findNewSubmission(before, after, answers)) {
                        attempt.state = 'success';
                        show('success', '제출이 확인되었습니다.');
                        refresh();
                    }
                    else {
                        attempt.state = 'unresolved';
                        show('unresolved', '제출 여부가 확실하지 않습니다. 제출 내역을 확인한 뒤 직접 재시도해 주세요.');
                    }
                }
                catch (reconcileError) {
                    attempt.state = 'unresolved';
                    if (!live())
                        return;
                    if (verificationError(reconcileError))
                        onVerificationRequired();
                    else
                        show('unresolved', '제출 여부를 확인하지 못했습니다. 다시 확인해 주세요.');
                }
            }
        }
        finally {
            localFlight.current = false;
        }
    };
    return {
        status,
        message,
        submit,
        verify,
        reset: () => {
            if (localFlight.current || attempts.get(key)?.state !== 'unresolved')
                return;
            attempts.delete(key);
            show('idle', '');
        },
    };
}
