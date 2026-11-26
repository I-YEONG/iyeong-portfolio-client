import { useLayoutEffect, useId, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button/Button';
import styles from './Modal.module.css';
/**
 * 공통 모달을 표시한다. title과 actions를 생략하고 children에 모달 내용을 직접 구성할 수 있다.
 *
 * @param props - 모달의 열림 상태, 닫기 동작, 제목, 내용 및 버튼 설정
 * @param props.isOpen - 모달 표시 여부
 * @param props.onClose - 닫기 버튼이나 Escape를 누를 때 호출할 함수
 * @param props.title - 선택적인 제목; 생략할 때는 ariaLabel로 모달 이름을 지정한다
 * @param props.ariaLabel - 제목이 없을 때 스크린 리더에 제공할 모달 이름
 * @param props.children - 제목 및 버튼을 포함해 직접 구성할 수 있는 모달 내용
 * @param props.actions - 선택적인 버튼 설정 (하나 또는 두 개)
 * @returns 공통 모달 요소
 */
export const Modal = ({ isOpen, onClose, title, ariaLabel, children, actions }) => {
    const dialogRef = useRef(null);
    const titleId = useId();
    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog)
            return;
        if (!isOpen) {
            if (dialog.open)
                dialog.close();
            return;
        }
        const frame = dialog.closest('[data-moyang-frame]');
        const position = () => {
            if (!frame) return;
            const rect = frame.getBoundingClientRect();
            dialog.style.setProperty('--moyang-modal-x', `${rect.left + rect.width / 2}px`);
            dialog.style.setProperty('--moyang-modal-y', `${rect.top + rect.height / 2}px`);
            dialog.style.setProperty('--moyang-modal-max-width', `${Math.max(0, rect.width - 32)}px`);
            dialog.style.setProperty('--moyang-modal-max-height', `${Math.max(0, rect.height - 32)}px`);
            dialog.style.setProperty('--moyang-modal-clip', `${Math.max(0, rect.top)}px ${Math.max(0, window.innerWidth - rect.right)}px ${Math.max(0, window.innerHeight - rect.bottom)}px ${Math.max(0, rect.left)}px`);
            dialog.style.setProperty('--moyang-modal-radius', getComputedStyle(frame).borderTopLeftRadius);
        };
        position();
        if (!dialog.open) dialog.showModal();
        const observer = frame && new ResizeObserver(position);
        if (frame) observer.observe(frame);
        window.addEventListener('resize', position);
        window.addEventListener('scroll', position, true);
        return () => {
            observer?.disconnect();
            window.removeEventListener('resize', position);
            window.removeEventListener('scroll', position, true);
        };
    }, [isOpen]);
    return (<dialog ref={dialogRef} className={styles.modal} aria-labelledby={title ? titleId : undefined} aria-label={title ? undefined : ariaLabel || '모달'} onCancel={(event) => {
            event.preventDefault();
            onClose();
        }}>
      <button type="button" className={styles.close} aria-label="모달 닫기" onClick={onClose}>
        <FontAwesomeIcon icon={faXmark} aria-hidden="true"/>
      </button>
      {title && (<h2 id={titleId} className={styles.title}>
          {title}
        </h2>)}
      {children && <div className={styles.content}>{children}</div>}
      {actions && (<div className={styles.actions}>
          {actions.map((action, index) => (<Button key={index} className={styles.action} color={action.color} disabled={action.disabled} onClick={action.onClick}>
              {action.label}
            </Button>))}
        </div>)}
    </dialog>);
};
