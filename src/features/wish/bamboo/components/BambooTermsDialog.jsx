import { useEffect, useId, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import { openWishDialog } from '@/components/wish/feedback/openWishDialog';
export function BambooTermsDialog({ onAgree, onClose }) {
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
        }} className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-56px)] max-w-[336px] overflow-y-auto rounded-md bg-white px-7 pt-6 pb-7 text-gray-04 backdrop:bg-black/10 backdrop:backdrop-blur-[5px]">
      <button type="button" aria-label="약관 동의 취소하고 홈으로 이동" onClick={onClose} className="absolute top-1 right-1 flex size-11 items-center justify-center text-gray-01">
        <IconX size={24} aria-hidden="true"/>
      </button>
      <h2 id={titleId} className="pr-2 text-center font-display text-base font-medium text-blue">
        [ WISH를 함께 만드는 약속 ]
      </h2>
      <ul id={descriptionId} className="mt-9 list-disc pl-4 font-body text-sm leading-relaxed">
        <li>서로를 존중하며 따뜻한 마음으로 이야기해주세요.</li>
        <li>비속어 등 다른 사람에게 불쾌감이나 불편함을 줄 수 있는 표현은 삼가주세요.</li>
        <li>
          음란물, 도배, 광고성 내용 등 부적절한 게시글 작성 시 익명채팅 이용이 제한될 수 있습니다.
        </li>
        <li>모두가 즐거운 축제를 함께 만들 수 있도록 배려하며 이용해주세요.</li>
      </ul>
      <button type="button" onClick={onAgree} aria-label="약속에 동의하고 계속하기" className="mt-7 min-h-12 w-full rounded-full bg-blue px-4 font-body text-sm font-medium text-white">
        확인
      </button>
    </dialog>);
}
