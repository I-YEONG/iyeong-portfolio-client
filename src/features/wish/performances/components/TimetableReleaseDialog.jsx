import { useEffect, useId, useRef } from 'react';
import { formatReleaseAt } from '@/features/wish/shared/lib/format-release-at';
import { openWishDialog } from '@/components/wish/feedback/openWishDialog';
export function TimetableReleaseDialog({ releaseAt, onClose }) {
    const dialogRef = useRef(null);
    const titleId = useId();
    const descriptionId = useId();
    useEffect(() => {
        const dialog = dialogRef.current;
        return openWishDialog(dialog);
    }, []);
    return (<dialog ref={dialogRef} aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={(event) => {
            event.preventDefault();
            onClose();
        }} className="fixed inset-0 m-auto w-[calc(100%-56px)] max-w-[336px] rounded-lg bg-white p-6 text-center text-black shadow-xl backdrop:bg-black/40 backdrop:backdrop-blur-[5px]">
      <h2 id={titleId} className="font-display text-lg font-semibold">
        타임테이블 공개 안내
      </h2>
      <p id={descriptionId} className="mt-4 font-body text-sm leading-relaxed">
        {releaseAt ? (<>
            <time dateTime={releaseAt}>{formatReleaseAt(releaseAt)}</time>에 공개됩니다.
          </>) : ('타임테이블은 공개 준비 중입니다.')}
      </p>
      <button type="button" onClick={onClose} className="mt-6 min-h-11 w-full rounded-lg bg-blue px-4 py-2 font-body text-sm font-medium text-white">
        확인
      </button>
    </dialog>);
}
