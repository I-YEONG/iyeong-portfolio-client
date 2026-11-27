import { IconAlertTriangle } from '@tabler/icons-react';
import styles from './entry.module.css';
/** 같은 문구는 한 번 표시하고 각 입력의 설명 ID를 같은 텍스트에 연결한다. */
export function AuthFeedback({ items, children, }) {
    const groups = [];
    for (const item of items) {
        const previous = groups.find((group) => group.item.text === item.text && group.item.tone === item.tone);
        if (previous) {
            if (!previous.ids.includes(item.id))
                previous.ids.push(item.id);
            if (item.action && !previous.actions.some((action) => action.label === item.action?.label))
                previous.actions.push(item.action);
        }
        else {
            groups.push({ item, ids: [item.id], actions: item.action ? [item.action] : [] });
        }
    }
    if (!groups.length && !children)
        return null;
    return (<div className={styles.authFeedback} data-auth-feedback>
      {groups.map(({ item, ids, actions }) => (<div key={ids[0]} className={styles.feedbackEntry} data-feedback-tone={item.tone}>
          <p className={styles.feedbackMessage} role={item.tone === 'error' ? 'alert' : 'status'} aria-atomic="true">
            {item.tone === 'error' && <IconAlertTriangle size={19} aria-hidden/>}
            {ids.reduceRight((content, id) => (<span id={id}>{content}</span>), item.text)}
          </p>
          {actions.map((action) => (<button key={action.label} type="button" className={styles.feedbackAction} onClick={action.onClick} disabled={action.disabled}>
              {action.label}
            </button>))}
        </div>))}
      {children}
    </div>);
}
