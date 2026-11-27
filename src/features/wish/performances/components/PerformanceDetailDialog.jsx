import { IconX } from '@tabler/icons-react';
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import { usePerformance } from '../hooks/usePerformances';
const focusableSelector = 'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]';
function formatTimeRange(startsAt, endsAt) {
    const formatter = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Seoul',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    });
    const format = (value) => {
        if (!value || Number.isNaN(new Date(value).getTime()))
            return '--:--';
        return formatter.format(new Date(value));
    };
    return `${format(startsAt)} - ${format(endsAt)}`;
}
export function PerformanceDetailDialog({ performanceId, onClose }) {
    const { data: performance, isError, isPending } = usePerformance(performanceId);
    const title = performance?.teamName ?? '공연 상세 정보';
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);
    useEffect(() => {
        const previousFocus = document.activeElement;
        const dialog = dialogRef.current;
        closeButtonRef.current?.focus({ preventScroll: true });
        const keepFocusInDialog = (event) => {
            if (dialog && event.target instanceof Node && !dialog.contains(event.target)) {
                closeButtonRef.current?.focus({ preventScroll: true });
            }
        };
        document.addEventListener('focusin', keepFocusInDialog);
        return () => {
            document.removeEventListener('focusin', keepFocusInDialog);
            if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
                previousFocus.focus({ preventScroll: true });
            }
        };
    }, []);
    return createPortal(<div className="fixed inset-0 z-50 flex items-center justify-center px-7">
      <button type="button" aria-label="공연 상세 정보 닫기" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-black/10 backdrop-blur-[5px]"/>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} onKeyDown={(event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }
            if (event.key !== 'Tab')
                return;
            const focusableElements = Array.from(dialogRef.current?.querySelectorAll(focusableSelector) ?? []);
            const first = focusableElements[0];
            const last = focusableElements.at(-1);
            if (!first || !last)
                return;
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
            else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }} className="relative z-10 flex max-h-[calc(100dvh_-_48px_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))] w-full max-w-[336px] flex-col overflow-hidden rounded-[8px] bg-white shadow-xl">
        <div className="relative shrink-0 py-4 pr-14 pl-5">
          <h2 id="performance-detail-title" className="text-right font-display text-[16px] font-semibold break-words text-[#2a315b]">
            {performance?.category === 'INDIVIDUAL' ? '(개인) ' : ''}
            {title}
          </h2>
          <button ref={closeButtonRef} type="button" aria-label="닫기" onClick={onClose} className="absolute top-2 right-2 z-10 grid size-10 place-items-center text-[#2a315b]">
            <IconX size={24} stroke={1.5}/>
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-y-contain pb-5">
          {isPending ? (<div className="grid place-items-center py-12" role="status">
              <span aria-label="공연 정보를 불러오고 있습니다" className="size-8 animate-spin rounded-full border-2 border-[#7385a1]/30 border-t-[#2a315b]"/>
            </div>) : isError || !performance ? (<div className="grid place-items-center px-8 py-12 text-center font-body text-sm text-[#7385a1]">
              공연 정보를 불러오지 못했습니다.
            </div>) : (<>
              {performance.imageUrl ? (<img src={performance.imageUrl} alt="" className="mx-[10px] h-[196px] w-[calc(100%-20px)] object-cover object-top"/>) : (<div className="mx-[10px] h-[196px] w-[calc(100%-20px)] bg-[#d9e1eb]"/>)}
              <div className="px-[10px] pt-[6px]">
                <p className="font-body text-[14px] text-[#7385a1]">
                  <strong className="font-display font-semibold text-[#2a315b]">공연 시간</strong>{' '}
                  {formatTimeRange(performance.startsAt, performance.endsAt)}
                </p>
                <p className="mt-2 font-body text-[14px] leading-[1.55] break-words whitespace-pre-wrap text-[#7385a1]">
                  {performance.description || '공연팀 소개가 준비 중입니다.'}
                </p>
              </div>
            </>)}
        </div>
      </section>
    </div>, document.body);
}
