import { useEffect, useId, useRef } from 'react';
import styles from './login.module.css';
import { openWishDialog } from '@/components/wish/feedback/openWishDialog';
export function AuthDialog({ title, children, onClose, onConfirm, confirmLabel, returnFocusRef, }) {
    const ref = useRef(null);
    const outsidePointer = useRef(null);
    const titleId = useId();
    const descriptionId = useId();
    useEffect(() => {
        const dialog = ref.current;
        const previousFocus = document.activeElement;
        const returnFocus = returnFocusRef?.current ?? previousFocus;
        const closeDialog = openWishDialog(dialog);
        return () => {
            closeDialog();
            if (returnFocus instanceof HTMLElement && returnFocus.isConnected)
                returnFocus.focus();
        };
    }, [returnFocusRef]);
    return (<dialog ref={ref} className={styles.dialog} aria-labelledby={titleId} aria-describedby={descriptionId} onKeyDown={(event) => {
            if (event.key === 'Escape')
                event.stopPropagation();
            if (event.key !== 'Tab')
                return;
            const buttons = ref.current.querySelectorAll('button:not(:disabled)');
            const first = buttons[0];
            const last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }} onCancel={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onClose();
        }} onPointerDown={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const outside = event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom;
            outsidePointer.current = outside && event.button === 0 ? event.pointerId : null;
        }} onPointerUp={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const outside = event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom;
            const close = outside && outsidePointer.current === event.pointerId;
            outsidePointer.current = null;
            event.stopPropagation();
            if (close)
                onClose();
        }} onPointerCancel={() => {
            outsidePointer.current = null;
        }}>
      <h2 id={titleId} className="text-lg font-semibold">
        {title}
      </h2>
      <div id={descriptionId} className="mt-3 font-body text-sm leading-relaxed text-purple">
        {children}
      </div>
      <div className="mt-6 flex gap-2">
        <button autoFocus type="button" onClick={onClose} className="min-h-11 flex-1 rounded-full border border-gray-02 px-4 text-sm text-purple">
          {onConfirm ? '취소' : '확인'}
        </button>
        {onConfirm && (<button type="button" onClick={onConfirm} className="min-h-11 flex-1 rounded-full bg-blue px-4 text-sm font-medium text-white">
            {confirmLabel}
          </button>)}
      </div>
    </dialog>);
}
