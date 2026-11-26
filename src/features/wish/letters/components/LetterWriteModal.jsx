import { useEffect, useId, useRef, useState } from 'react';
import { useAuthSession, useMe } from '@/features/wish/auth';
import letterBox from '@/assets/wish/letter/letter-box.svg';
import letterCake from '@/assets/wish/letter/letter-cake.svg';
import letterCandle from '@/assets/wish/letter/letter-candle.svg';
import letterRibbon from '@/assets/wish/letter/letter-ribbon.svg';
import letterXmark from '@/assets/wish/letter/letter-xmark.svg';
import { useCreateBirthdayMessage } from '../hooks/useBirthdayMessages';
import { getBirthdayMessageErrorMessage } from '../api/birthdayMessageError';
import styles from './letter-write.module.css';
import { openWishDialog } from '@/components/wish/feedback/openWishDialog';
const stationeryOptions = [
    {
        id: 'box',
        designNo: 1,
        label: '선물 상자 편지지',
        image: letterBox,
        paidOnly: false,
        previewScale: 0.2,
        maxLength: 57,
        lineCapacity: 14,
        inputHeight: 190,
    },
    {
        id: 'cake',
        designNo: 2,
        label: '케이크 편지지',
        image: letterCake,
        paidOnly: false,
        previewScale: 0.2,
        maxLength: 30,
        lineCapacity: 8,
        inputHeight: 160,
    },
    {
        id: 'ribbon',
        designNo: 3,
        label: '리본 편지지',
        image: letterRibbon,
        paidOnly: true,
        previewScale: 0.18,
        maxLength: 28,
        lineCapacity: 11,
        inputHeight: 150,
    },
    {
        id: 'candle',
        designNo: 4,
        label: '촛불 편지지',
        image: letterCandle,
        paidOnly: true,
        previewScale: 0.17,
        maxLength: 35,
        lineCapacity: 6,
        inputHeight: 180,
    },
];
function getMaskedName(name) {
    if (!name)
        return '나';
    if (name.length === 1)
        return name;
    return `${name.slice(0, 1)}*${name.length > 2 ? name.slice(-1) : ''}`;
}
/** Figma 1925:1438 — 편지지를 고른 뒤 큰 편지지 위에서 메시지를 작성한다. */
export function LetterWriteModal({ onClose }) {
    const titleId = useId();
    const dialogRef = useRef(null);
    useEffect(() => {
        const dialog = dialogRef.current;
        const previousFocus = document.activeElement;
        const overflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = 'hidden';
        const closeDialog = openWishDialog(dialog);
        return () => {
            closeDialog();
            document.documentElement.style.overflow = overflow;
            if (previousFocus instanceof HTMLElement)
                previousFocus.focus();
        };
    }, []);
    const { isAuthenticated, isInitializing } = useAuthSession();
    const { data: me, isPending: isMePending } = useMe(isAuthenticated);
    const createMessage = useCreateBirthdayMessage();
    const [content, setContent] = useState('');
    const [selectedStationery, setSelectedStationery] = useState('box');
    const [isEditing, setIsEditing] = useState(false);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [formError, setFormError] = useState(null);
    const isPaid = me?.studentFeePaid === true;
    const selected = stationeryOptions.find((stationery) => stationery.id === selectedStationery);
    const lineCount = Math.max(2, Math.ceil(content.length / selected.lineCapacity));
    const inputStyle = {
        paddingTop: `${Math.max(0, (selected.inputHeight - lineCount * 24) / 2)}px`,
    };
    const validateContent = () => {
        if (content.length > selected.maxLength) {
            setFormError(`공백 포함 ${selected.maxLength}자 이내로 작성해 주세요.`);
            return false;
        }
        const trimmedContent = content.trim();
        if (!isAuthenticated) {
            setFormError('로그인 후 축하 편지를 작성할 수 있어요.');
            return false;
        }
        if (isMePending) {
            setFormError('학생 인증 정보를 확인하고 있어요. 잠시 후 다시 시도해 주세요.');
            return false;
        }
        if (me?.schoolVerified !== true) {
            setFormError('학생 인증을 완료한 뒤 축하 편지를 작성할 수 있어요.');
            return false;
        }
        if (!trimmedContent) {
            setFormError('축하 메시지를 입력해 주세요.');
            return false;
        }
        return true;
    };
    const handlePreview = () => {
        if (!validateContent())
            return;
        setFormError(null);
        setIsPreviewing(true);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isPreviewing || createMessage.isPending || !validateContent())
            return;
        const trimmedContent = content.trim();
        setFormError(null);
        try {
            await createMessage.mutateAsync({ content: trimmedContent, designNo: selected.designNo });
            onClose();
        }
        catch (error) {
            setFormError(getBirthdayMessageErrorMessage(error, 'create'));
        }
    };
    return (<dialog ref={dialogRef} className={styles.dialog} onCancel={(event) => {
            event.preventDefault();
            onClose();
        }} aria-modal="true" aria-labelledby={titleId}>
      <section className={styles.panel}>
        <h2 id={titleId} className="sr-only">
          120주년 축하편지 쓰기
        </h2>
        <button type="button" onClick={onClose} aria-label="편지 쓰기 닫기" className={styles.close}>
          <img src={letterXmark} alt=""/>
        </button>

        <form onSubmit={(event) => void handleSubmit(event)} className={styles.form}>
          <div className={`${styles.paper} ${isPreviewing ? styles.listPreview : ''}`} data-stationery={selected.id}>
            <img src={selected.image} alt="" className={styles.paperImage}/>
            {!isEditing ? (<button type="button" onClick={() => setIsEditing(true)} className={styles.instructions}>
                <span>
                  120주년 축하편지를 작성해주세요.
                  <br />
                  <br />
                  작성한 편지는 수정할 수 없지만, 삭제 후 새로 작성할 수 있어요.
                </span>
              </button>) : (<>
                {isPreviewing ? (<p className={styles.previewContent}>{content.trim()}</p>) : (<textarea autoFocus value={content} maxLength={selected.maxLength} onChange={(event) => {
                    setContent(event.target.value.replace(/[\r\n]/g, ' '));
                    if (formError)
                        setFormError(null);
                }} aria-label="축하 메시지" placeholder="120주년 축하편지를 작성해주세요." className={styles.input} style={inputStyle}/>)}
              </>)}
            {isPreviewing && (<p className={styles.previewMeta} aria-label="목록 미리보기 정보">
                <span>{getMaskedName(me?.name)}</span>
                <span>♡ 0</span>
              </p>)}
          </div>

          <p className={styles.notice}>
            {isPreviewing
            ? '이 모습으로 공개 목록에 등록됩니다.'
            : '작성한 편지는 수정할 수 없으며, 삭제 후 새로 작성할 수 있습니다.'}
            <br />
            공백 포함 {content.length} / {selected.maxLength}자
          </p>

          {isEditing && (<>
              {isPreviewing ? (<div className={styles.previewActions}>
                  <button type="button" onClick={() => setIsPreviewing(false)} className={styles.edit}>
                    수정하기
                  </button>
                  <button type="submit" disabled={createMessage.isPending || isInitializing || isMePending} className={styles.submit}>
                    {createMessage.isPending ? '등록 중…' : '이대로 등록하기'}
                  </button>
                </div>) : (<button type="button" disabled={isInitializing || isMePending} onClick={handlePreview} className={styles.submit}>
                  편지 등록하기
                </button>)}
            </>)}

          {formError && (<p role="alert" className={styles.error}>
              {formError}
            </p>)}

          <fieldset className={styles.options}>
            <legend className="sr-only">편지지 선택</legend>
            <div className={styles.optionBar}>
              {stationeryOptions.map((stationery) => {
            const unavailable = stationery.paidOnly && !isPaid;
            const isSelected = stationery.id === selectedStationery;
            return (<button key={stationery.id} type="button" aria-label={stationery.label} aria-pressed={isSelected} disabled={unavailable || isInitializing || isPreviewing} onClick={() => {
                    if (content.length > stationery.maxLength) {
                        setFormError(`${stationery.label}는 ${stationery.maxLength}자까지 작성할 수 있어요. 글을 줄인 뒤 선택해 주세요.`);
                        return;
                    }
                    setSelectedStationery(stationery.id);
                    setFormError(null);
                }} className={styles.option}>
                    <span aria-hidden="true" className={isSelected ? styles.selected : undefined}/>
                    <img src={stationery.image} alt="" className={styles.optionImage} style={{
                    transform: `translate(-50%, -50%) scale(${stationery.previewScale})`,
                }}/>
                    {unavailable && (<span className={styles.paidOnly}>
                        학생회비
                        <br />
                        납부자
                        <br />
                        전용
                      </span>)}
                  </button>);
        })}
            </div>
          </fieldset>
        </form>
      </section>
    </dialog>);
}
