import { SheepProfile } from '@/components/moyang';
import styles from './MeetingChat.module.css';
export const ChatGuide = ({ children }) => (<div className={styles.guide}>
    <SheepProfile color="white" size={42} alt=""/>
    <div className={styles.guideBody}>
      <span className={styles.nickname}>모양 AI</span>
      {children}
    </div>
  </div>);
