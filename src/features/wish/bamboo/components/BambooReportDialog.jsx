import { useEffect, useRef, useState } from 'react';
import dialogClose from '@/assets/wish/my/dialog-close.svg';
import dialogLogo from '@/assets/wish/my/dialog-logo.svg';
import styles from './bamboo-report.module.css';
import { openWishDialog } from '@/components/wish/feedback/openWishDialog';
const reportReasons = [
    { value: 'ABUSE', label: '욕설·비방' },
    { value: 'SPAM', label: '도배·광고' },
    { value: 'SEXUAL', label: '음란·성적 내용' },
    { value: 'PERSONAL_INFO', label: '개인정보 노출' },
    { value: 'IMPERSONATION', label: '사칭' },
    { value: 'OTHER', label: '기타' },
];
export function BambooReportDialog({ message, isSubmitting = false, onSubmit, onClose, }) {
    const [selectedReason, setSelectedReason] = useState('');
    const dialogRef = useRef(null);
    useEffect(() => {
        const dialog = dialogRef.current;
        return openWishDialog(dialog);
    }, []);
    return (<dialog ref={dialogRef} onCancel={(event) => {
            event.preventDefault();
            if (!isSubmitting)
                onClose();
        }} aria-labelledby="bamboo-report-title" className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[85.496%] max-w-[336px] overflow-y-auto rounded-[8px] bg-white pb-7 backdrop:bg-black/10 backdrop:backdrop-blur-[5px]">
      <img src={dialogLogo} alt="" aria-hidden="true" className="mx-auto mt-[19px] h-[77px] w-[107px] [filter:drop-shadow(0_0_4px_rgb(45_125_200))]"/>
      <button autoFocus type="button" disabled={isSubmitting} onClick={onClose} aria-label="닫기" className="absolute top-2 right-2 flex size-11 items-center justify-center">
        <img src={dialogClose} alt="" className="size-8"/>
      </button>
      <div className="mt-1 flex items-center gap-3 px-4">
        <span aria-hidden="true" className="h-px flex-1 bg-gray-01"/>
        <h2 id="bamboo-report-title" className="font-body text-sm text-gray-04">
          채팅 신고
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-gray-01"/>
      </div>
      <div className={styles.content}>
        <p className={styles.guide}>신고할 메시지와 사유를 확인해 주세요.</p>
        <div className={styles.message}>
          <span className={styles.author}>{message.anonName ?? '익명'}</span>
          <p>{message.status === 'HIDDEN' ? '신고 누적으로 가려진 메시지입니다.' : message.content}</p>
        </div>
      <fieldset className={styles.reasons}>
        <legend className={styles.legend}>신고 사유</legend>
        <div className="grid grid-cols-2 gap-2">
          {reportReasons.map((reason) => {
            const selected = selectedReason === reason.value;
            return (<label key={reason.value} className={`${styles.reason} ${selected ? styles.selected : ''}`}>
                <input type="radio" name="bamboo-report-reason" value={reason.value} checked={selected} onChange={() => setSelectedReason(reason.value)} className="sr-only"/>
                {reason.label}
              </label>);
        })}
        </div>
      </fieldset>
      <button type="button" disabled={isSubmitting || !selectedReason} onClick={() => onSubmit(selectedReason)} className={styles.submit}>
        {isSubmitting ? '신고 중…' : '신고하기'}
      </button>
      <p className={styles.notice}>신고는 데모 화면에서만 처리되며 실제로 접수되지 않습니다.</p>
      </div>
    </dialog>);
}
