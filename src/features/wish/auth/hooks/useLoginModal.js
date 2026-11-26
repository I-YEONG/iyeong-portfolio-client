import { useEffect, useLayoutEffect, useRef, useState, } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { entryHistory } from '../entryLifecycle';
import { useReducedMotion } from './useReducedMotion';
const focusable = 'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]';
export function useLoginModal() {
    const card = useRef(null);
    const pointer = useRef(null);
    const [lifetime] = useState(() => new AbortController());
    const [closing, setClosing] = useState(false);
    const reducedMotion = useReducedMotion();
    const location = useLocation();
    const navigate = useNavigate();
    useLayoutEffect(() => {
        card.current?.querySelector('#login-title')?.focus({ preventScroll: true });
        const keepFocus = (event) => {
            if (document.querySelector('dialog[open]') ||
                !card.current ||
                !(event.target instanceof Node))
                return;
            if (!card.current.contains(event.target))
                card.current.querySelector(focusable)?.focus();
        };
        document.addEventListener('focusin', keepFocus);
        return () => document.removeEventListener('focusin', keepFocus);
    }, []);
    useEffect(() => {
        if (!closing)
            return;
        const timer = window.setTimeout(() => {
            if (entryHistory.canReturn(location.state, window.history.state?.idx))
                navigate(-1);
            else
                navigate(ROUTES.LANDING, { replace: true });
        }, reducedMotion ? 0 : 220);
        return () => window.clearTimeout(timer);
    }, [closing, location.key, location.state, navigate, reducedMotion]);
    function close() {
        if (closing || document.querySelector('dialog[open]'))
            return;
        // 닫기 전환 중에도 진행 중 로그인이 세션을 만들지 못하도록 즉시 취소한다.
        lifetime.abort();
        setClosing(true);
    }
    function onKeyDown(event) {
        if (document.querySelector('dialog[open]'))
            return;
        if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            close();
        }
        else if (event.key === 'Tab') {
            const items = Array.from(card.current?.querySelectorAll(focusable) ?? []);
            const first = items[0];
            const last = items.at(-1);
            if (!first || !last) {
                event.preventDefault();
                return;
            }
            if (event.shiftKey &&
                (document.activeElement === first || !items.includes(document.activeElement))) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    }
    return {
        card,
        closing,
        close,
        signal: lifetime.signal,
        onKeyDown,
        onPointerDown(event) {
            pointer.current =
                event.target === event.currentTarget && event.button === 0 ? event.pointerId : null;
        },
        onPointerUp(event) {
            const outside = pointer.current === event.pointerId && event.target === event.currentTarget;
            pointer.current = null;
            if (outside)
                close();
        },
        onPointerCancel() {
            pointer.current = null;
        },
    };
}
