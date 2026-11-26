import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthSession } from '@/features/wish/auth';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { useBambooRoom } from '../hooks/useBambooRoom';
import { BambooReleased } from './BambooReleased';
import { getBambooMuteMessage } from '../lib/mute';
export function BambooEntry({ preview }) {
    const navigate = useNavigate();
    const [, setSearchParams] = useSearchParams();
    const isPreview = preview !== null;
    // released 프리뷰는 공개 시각만 우회한다. 실제 이용 조건과 프로필 상태는 서버에서 확인한다.
    const usesLiveRoom = preview === null || preview === 'released';
    const session = useAuthSession();
    const room = useBambooRoom(usesLiveRoom && session.isAuthenticated, session.sessionVersion);
    const [now, setNow] = useState(Date.now);
    const closesAt = room.data?.closesAt;
    const checkingRoom = room.isPending || (!room.isFetchedAfterMount && room.isFetching);
    const isMuted = preview === 'ban' || (usesLiveRoom && room.data?.muted === true);
    const bambooSessionKey = `${isPreview ? 'preview' : 'live'}-${session.sessionVersion}`;
    useEffect(() => {
        if (!usesLiveRoom || !closesAt)
            return;
        const remaining = Date.parse(closesAt) - now;
        if (!Number.isFinite(remaining) || remaining <= 0)
            return;
        const timer = window.setTimeout(() => setNow(Date.now()), Math.min(remaining, 60_000));
        return () => window.clearTimeout(timer);
    }, [usesLiveRoom, closesAt, now]);
    let message = null;
    let actionLabel;
    let onAction;
    if (preview === 'error') {
        message = '대나무숲 상태를 확인하지 못했습니다.\n잠시 후 다시 시도해주세요.';
        actionLabel = '다시 확인';
        onAction = () => {
            setSearchParams((params) => {
                params.set('preview', 'released');
                return params;
            }, { replace: true });
        };
    }
    else if (preview === 'ban') {
        message = getBambooMuteMessage(new Date(now + 60 * 60 * 1_000).toISOString());
        actionLabel = '홈으로 돌아가기';
    }
    else if (usesLiveRoom) {
        if (session.isInitializing)
            message = '로그인 상태를 확인하고 있습니다.';
        else if (session.status === 'unavailable')
            message = '로그인 상태를 확인하지 못했습니다.';
        else if (!session.isAuthenticated) {
            message = '대나무숲은 로그인 후 이용할 수 있습니다.';
            actionLabel = '로그인하기';
            onAction = () => navigate(ROUTES.LOGIN);
        }
        else if (checkingRoom)
            message = '대나무숲 상태를 확인하고 있습니다.';
        else if (room.error) {
            if (room.error instanceof ApiError && room.error.code === 'SCHOOL_VERIFICATION_REQUIRED') {
                message = '대나무숲을 이용하려면 학생 인증이 필요합니다.';
                actionLabel = '학생 인증하러 가기';
                onAction = () => navigate(ROUTES.MY);
            }
            else {
                message = '대나무숲 상태를 확인하지 못했습니다.\n잠시 후 다시 시도해주세요.';
                actionLabel = '다시 확인';
                onAction = () => void room.refetch();
            }
        }
        else if (room.data?.muted === true) {
            message = getBambooMuteMessage(room.data.mutedUntil);
            actionLabel = '홈으로 돌아가기';
            onAction = () => navigate(ROUTES.HOME);
        }
        else if (room.data?.enabled !== true)
            message = '현재 대나무숲을 이용할 수 없습니다.';
        else if (room.data.closesAt && Date.parse(room.data.closesAt) <= now)
            message = '대나무숲 운영이 종료되었습니다.';
    }
    if (!message)
        return (<BambooReleased key={bambooSessionKey} existingNickname={room.data?.nickname} readOnly={room.data?.readOnly === true} sessionVersion={session.sessionVersion} onNicknameAlreadySet={async () => {
                const result = await room.refetch();
                return Boolean(result.data?.nickname);
            }}/>);
    const loading = usesLiveRoom && (session.isInitializing || (session.isAuthenticated && checkingRoom));
    if (loading) {
        return (<main className="grid h-dvh place-items-center overflow-hidden bg-black" role="status">
        <span aria-label={message} className="size-9 animate-spin rounded-full border-2 border-white/30 border-t-main-01"/>
      </main>);
    }
    return (<BambooReleased key={bambooSessionKey} sessionVersion={session.sessionVersion} blockedState={{
            title: isMuted ? '대나무숲 이용 정지' : '대나무숲',
            message,
            actionLabel,
            onAction,
        }}/>);
}
