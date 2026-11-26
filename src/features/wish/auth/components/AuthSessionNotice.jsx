import { useQueryClient } from '@tanstack/react-query';
import { useAuthSession } from '../hooks/useAuthSession';
import { initializeSession } from '../session';
import { AuthFeedback } from './AuthFeedback';
/** 초기 인증 실패 처리를 auth 안에 두고 공개 화면에서도 재시도를 제공한다. */
export function AuthSessionNotice({ disabled = false, exterior = false, }) {
    const client = useQueryClient();
    const { status } = useAuthSession();
    if (status !== 'unavailable')
        return null;
    if (exterior)
        return (<AuthFeedback items={[
                {
                    id: 'login-session-error',
                    text: '로그인 상태를 확인하지 못했습니다. 다시 확인하거나 로그인해 주세요.',
                    tone: 'error',
                    action: { label: '다시 확인', disabled, onClick: () => void initializeSession(client) },
                },
            ]}/>);
    return (<div role="status" className="rounded-lg border border-gray-01 bg-white p-3 font-body text-sm leading-relaxed text-purple">
      <p>로그인 상태를 확인하지 못했습니다. 다시 확인하거나 로그인해 주세요.</p>
      <button type="button" disabled={disabled} onClick={() => void initializeSession(client)} className="min-h-11 text-blue underline disabled:opacity-60">
        다시 확인
      </button>
    </div>);
}
