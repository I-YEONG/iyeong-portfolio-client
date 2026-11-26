import { useId, useLayoutEffect, useRef } from 'react';
import envelope from '../assets/welcome-envelope.png';
import logo from '../assets/welcome-logo.svg';
import starTop from '../assets/welcome-star-top.svg';
import starBottom from '../assets/welcome-star-bottom.svg';
import styles from './welcome.module.css';
import { openWishDialog } from '@/components/wish/feedback/openWishDialog';
export function LoginWelcome({ invitation, onDismiss, returnFocusRef }) {
    const dialogRef = useRef(null);
    const headingRef = useRef(null);
    const buttonRef = useRef(null);
    const titleId = useId();
    const descriptionId = useId();
    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        const returnFocus = returnFocusRef.current;
        const closeDialog = openWishDialog(dialog);
        headingRef.current?.focus({ preventScroll: true });
        return () => {
            // StrictMode의 재설정은 표시만 정리하며 초대 의도를 소비하지 않는다.
            closeDialog();
            queueMicrotask(() => {
                if (returnFocus?.isConnected && !document.querySelector('dialog[open]')) {
                    returnFocus.focus({ preventScroll: true });
                }
            });
        };
    }, [returnFocusRef]);
    const dismiss = () => onDismiss(invitation.sessionVersion);
    return (<dialog ref={dialogRef} aria-labelledby={titleId} aria-describedby={descriptionId} className={`${styles.dialog} ${invitation.isPaid ? styles.paid : ''}`} onCancel={(event) => {
            event.preventDefault();
            event.stopPropagation();
            dismiss();
        }} onKeyDown={(event) => {
            if (event.key === 'Escape')
                event.stopPropagation();
            if (event.key === 'Tab') {
                event.preventDefault();
                buttonRef.current?.focus();
            }
        }}>
      <div className={styles.scene}>
        <div className={styles.letter}>
          <img src={envelope} alt="" className={styles.envelope}/>
          <img src={logo} alt="" className={styles.logo}/>
          <div className={styles.copy}>
            <h2 id={titleId} ref={headingRef} tabIndex={-1} className={styles.salutation}>
              Dear. <span className={styles.accent}>{invitation.name}</span>
              {invitation.suffix}
            </h2>
            <div id={descriptionId}>
              <p className={styles.introduction}>
                <span className={styles.accent}>120번째 생일</span>을 맞은 삼육대학교가
                <br />
                <strong className={styles.accent}>{invitation.name}</strong>
                {invitation.suffix}을 생일파티에 초대합니다.
              </p>
              <p className={styles.message}>
                함께 축하하고, 함께 웃으며
                <br />
                우리의 다음 120년을 위한
                <br />
                WISH를 빌어주세요.
              </p>
              <p className={styles.wish}>MAKE A WISH</p>
            </div>
          </div>
          {invitation.isPaid && (<>
              <img src={starTop} alt="" className={styles.starTop}/>
              <img src={starBottom} alt="" className={styles.starBottom}/>
            </>)}
        </div>
        <button ref={buttonRef} type="button" onClick={dismiss} className={styles.enter}>
          생일파티 입장하기
        </button>
      </div>
    </dialog>);
}
