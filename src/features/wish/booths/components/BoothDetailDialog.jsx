import { IconX } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { toThumbnailUrl } from '../lib/thumbnail';
import { useBooth } from '../hooks/useBooths';
const THUMBNAIL_WIDTH = 672;
/** 공연·협찬사 상세와 같은 규격으로 부스의 사진과 소개를 보여 준다. */
export function BoothDetailDialog({ boothId, onClose }) {
    const { data: booth, isError, isPending } = useBooth(boothId);
    const title = '부스 상세 정보';
    const dialogRef = useRef(null);
    const closeButtonRef = useRef(null);
    useEffect(() => {
        const previousFocus = document.activeElement;
        closeButtonRef.current?.focus({ preventScroll: true });
        return () => {
            if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
                previousFocus.focus({ preventScroll: true });
            }
        };
    }, []);
    return createPortal(<div className="fixed inset-0 z-[1000] flex items-center justify-center px-7">
      <button type="button" aria-label="부스 상세 정보 닫기" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-black/10 backdrop-blur-[5px]"/>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-label={title} onKeyDown={(event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
        }} className="relative z-10 flex max-h-[calc(100dvh_-_48px_-_env(safe-area-inset-top)_-_env(safe-area-inset-bottom))] w-full max-w-[336px] flex-col overflow-hidden rounded-[8px] bg-white shadow-xl">
        <div className="relative shrink-0 py-4 pr-14 pl-5">
          <h2 className="text-right font-display text-[16px] font-semibold break-words text-[#2a315b]">
            {title}
          </h2>
          <button ref={closeButtonRef} type="button" aria-label="닫기" onClick={onClose} className="absolute top-2 right-2 z-10 grid size-10 place-items-center text-[#2a315b]">
            <IconX size={24} stroke={1.5}/>
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto overscroll-y-contain pb-5">
          {isPending ? (<div className="grid place-items-center py-12" role="status">
              <span aria-label="부스 정보를 불러오고 있습니다" className="size-8 animate-spin rounded-full border-2 border-[#7385a1]/30 border-t-[#2a315b]"/>
            </div>) : isError || !booth ? (<div className="grid place-items-center px-8 py-12 text-center font-body text-sm text-[#7385a1]">
              부스 정보를 불러오지 못했습니다.
            </div>) : (<>
              {booth.imageUrl ? (<img src={toThumbnailUrl(booth.imageUrl, THUMBNAIL_WIDTH)} alt="" className="mx-[10px] h-[196px] w-[calc(100%-20px)] object-contain" onError={(event) => {
                    const original = booth.imageUrl;
                    if (original && event.currentTarget.src !== original) {
                        event.currentTarget.src = original;
                    }
                }}/>) : (<div className="mx-[10px] h-[196px] w-[calc(100%-20px)] bg-gray-01"/>)}
              <div className="px-[10px] pt-[6px]">
                <p className="font-body text-[14px] break-words text-[#7385a1]">
                  <strong className="font-display font-semibold text-[#2a315b]">
                    {booth.name ?? '이름 미정'}
                  </strong>{' '}
                  {booth.operator ?? ''}
                </p>
                <p className="mt-2 font-body text-[14px] leading-[1.55] break-words whitespace-pre-wrap text-[#7385a1]">
                  {booth.description || '부스 소개가 준비 중입니다.'}
                </p>
              </div>
            </>)}
        </div>
      </section>
    </div>, document.body);
}
