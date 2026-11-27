import { useEffect, useRef } from 'react';
import dialogClose from '@/assets/wish/my/dialog-close.svg';
import dialogLogo from '@/assets/wish/my/dialog-logo.svg';
import { openWishDialog } from './openWishDialog';
/** 이용 제한과 상태 안내에 쓰는 공통 확인 팝업이다. */
export function StateDialog({ title, message, actionLabel = '홈으로', onAction, onClose, }) {
    const dialogRef = useRef(null);
    useEffect(() => {
        const dialog = dialogRef.current;
        return openWishDialog(dialog);
    }, []);
    return (<dialog ref={dialogRef} onCancel={(event) => {
            event.preventDefault();
            onClose();
        }} aria-label={title} className="fixed inset-0 m-auto w-[85.496%] max-w-[336px] rounded-[8px] bg-white pb-7 backdrop:bg-black/10 backdrop:backdrop-blur-[5px]">
      <img src={dialogLogo} alt="" aria-hidden="true" className="mx-auto mt-[19px] h-[77px] w-[107px] [filter:drop-shadow(0_0_4px_rgb(45_125_200))]"/>
      <button autoFocus type="button" onClick={onClose} aria-label="닫기" className="absolute top-2 right-2 flex size-11 items-center justify-center">
        <img src={dialogClose} alt="" className="size-8"/>
      </button>
      <div className="mt-1 flex items-center gap-3 px-4">
        <span aria-hidden="true" className="h-px flex-1 bg-gray-01"/>
        <h2 className="font-body text-sm text-gray-04">{title}</h2>
        <span aria-hidden="true" className="h-px flex-1 bg-gray-01"/>
      </div>
      <p className="mt-9 px-8 text-center font-body text-sm leading-relaxed font-medium whitespace-pre-line text-black">
        {message}
      </p>
      <button type="button" onClick={onAction ?? onClose} className="mx-8 mt-8 min-h-12 w-[calc(100%-64px)] rounded-full bg-blue px-4 font-body text-sm font-medium text-white">
        {actionLabel}
      </button>
    </dialog>);
}
