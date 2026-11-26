import { IconX } from '@tabler/icons-react';
import { useEffect, useId, useRef } from 'react';
import { openWishDialog } from '@/components/wish/feedback/openWishDialog';
import { createPortal } from 'react-dom';
export function SponsorDetailDialog({ sponsor, onClose }) {
    const dialogRef = useRef(null);
    const titleId = useId();
    useEffect(() => {
        const dialog = dialogRef.current;
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        const closeDialog = openWishDialog(dialog);
        document.body.style.overflow = 'hidden';
        return () => {
            closeDialog();
            document.body.style.overflow = previousOverflow;
            if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
                previousFocus.focus({ preventScroll: true });
            }
        };
    }, []);
    return createPortal(<dialog ref={dialogRef} aria-labelledby={titleId} onCancel={(event) => {
            event.preventDefault();
            onClose();
        }} onClick={(event) => {
            if (event.target !== event.currentTarget)
                return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left ||
                event.clientX > bounds.right ||
                event.clientY < bounds.top ||
                event.clientY > bounds.bottom) {
                onClose();
            }
        }} className="m-auto max-h-[calc(100dvh_-_48px_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))] w-[calc(100%-56px)] max-w-[336px] overflow-hidden rounded-[8px] border-0 bg-white p-0 shadow-xl backdrop:bg-black/10 backdrop:backdrop-blur-[5px]">
      <div className="flex max-h-[calc(100dvh_-_48px_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))] flex-col">
        <div className="relative shrink-0 py-4 pr-14 pl-5">
          <h2 id={titleId} className="text-right font-display text-[16px] font-semibold break-words text-[#2a315b]">
            {sponsor.name}
          </h2>
          <button type="button" aria-label="협찬사 상세 정보 닫기" onClick={onClose} className="absolute top-1.5 right-1.5 grid size-11 place-items-center text-[#2a315b] focus-visible:outline-2 focus-visible:outline-main-02">
            <IconX size={24} stroke={1.5}/>
          </button>
        </div>
        <div className="min-h-0 overflow-y-auto overscroll-y-contain pb-5">
          {sponsor.imageUrl ? (<img src={sponsor.imageUrl} alt="" className="mx-[10px] h-[196px] w-[calc(100%-20px)] object-contain"/>) : null}
          <div className="px-[10px] pt-[6px]">
            {sponsor.boothName ? (<p className="font-body text-[14px] break-words text-[#7385a1]">
                <strong className="font-display font-semibold text-[#2a315b]">부스</strong>{' '}
                {sponsor.boothName}
              </p>) : null}
            <p className="mt-2 font-body text-[14px] leading-[1.55] break-words whitespace-pre-wrap text-[#7385a1]">
              {sponsor.description || '협찬사 소개가 준비 중입니다.'}
            </p>
          </div>
        </div>
      </div>
    </dialog>, document.querySelector('.wish-screen'));
}
