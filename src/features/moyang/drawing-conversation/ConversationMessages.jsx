import { SheepProfile } from '@/components/moyang';
import supportArrow from './assets/support-arrow.svg';
import styles from './DrawingConversation.module.css';
export const ConversationBubble = ({ role, text }) => {
    if (role === 'support') {
        return (<div className={styles.supportNotice}>
        <p>{text}</p>
        <a href="tel:109">
          <span>조금 더 전문적인 상담 받기 (109)</span>
          <img src={supportArrow} alt=""/>
        </a>
      </div>);
    }
    return (<div className={styles[role]}>
      {role === 'assistant' && <SheepProfile color="white" size={40} alt="AI"/>}
      <p className={styles.bubble}>{text}</p>
    </div>);
};
export const ConversationMessages = ({ messages, ref, readOnly, scrollWithPage, children, }) => (<div className={scrollWithPage ? `${styles.messages} ${styles.scrollWithPage}` : styles.messages} ref={ref} role={readOnly ? 'region' : 'log'} aria-label="그림 대화" tabIndex={readOnly ? 0 : undefined}>
    {messages.map((message, index) => (<ConversationBubble key={index} {...message}/>))}
    {children}
  </div>);
