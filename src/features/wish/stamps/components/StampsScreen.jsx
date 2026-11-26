import { Navigate, useNavigate } from 'react-router';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useAuthSession } from '@/features/wish/auth';
import { useStampBoard } from '../hooks/useStampBoard';
import { StampPageContent } from './StampPageContent';
const retryButtonClassName = 'mt-2 min-h-11 rounded-full border border-white/30 bg-black/20 px-5 py-2 text-sm text-white underline backdrop-blur-sm disabled:opacity-50';
/** 마이페이지에서 연결되는 내 스탬프판. 적립 권한과 상태는 서버 응답을 따른다. */
export function StampsScreen() {
    const navigate = useNavigate();
    const session = useAuthSession();
    const board = useStampBoard();
    const onBack = () => navigate(ROUTES.MY);
    let status;
    if (session.status === 'anonymous')
        return <Navigate replace to={ROUTES.LOGIN}/>;
    if (session.isInitializing) {
        status = <p role="status">로그인 상태를 확인하고 있습니다.</p>;
    }
    else if (session.status === 'unavailable') {
        status = (<div>
        <p role="alert">로그인 상태를 확인하지 못했습니다.</p>
        <button type="button" className={retryButtonClassName} onClick={() => void session.retrySession()}>
          다시 확인
        </button>
      </div>);
    }
    else if (board.error) {
        const message = board.error === 'stamps'
            ? '스탬프를 불러오지 못했습니다.'
            : '적립한 부스 정보를 확인하지 못했습니다.';
        status = (<div>
        <p role="alert">
          {message}
          {board.slots ? <span className="block">마지막으로 확인한 내역을 표시합니다.</span> : null}
        </p>
        <button type="button" className={retryButtonClassName} disabled={board.isRefreshing} onClick={() => void board.retry()}>
          {board.isRefreshing ? '다시 확인하는 중…' : '다시 시도'}
        </button>
      </div>);
    }
    else if (board.isLoading) {
        status = <p role="status">스탬프 정보를 확인하고 있습니다.</p>;
    }
    return (<StampPageContent slots={session.isAuthenticated ? board.slots : null} onBack={onBack} status={status}/>);
}
