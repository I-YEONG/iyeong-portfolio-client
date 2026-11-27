import { useEffect, useReducer } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { HomeLayout } from '@/components/moyang';
import { getMockMeeting, isMeetingStorageEvent } from './meetingMock';
import { getMeetingEntry, getMeetingListPath, getMeetingPath } from './meetingEntry';
import styles from './MeetingList.module.css';
import { canEnterWaitingRoom, isReservationStatusPending, } from '@/features/moyang/meeting-reservation/reservationMock';
const screenMessage = {
    detail: '모임 상세 화면은 준비 중이에요.',
    waiting: '모임 대기실은 준비 중이에요.',
    chat: '모임 채팅 화면은 준비 중이에요.',
};
export const MeetingHandoff = ({ screen = 'detail' }) => {
    const { meetingId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const fromList = state?.fromMeetingList === true;
    const fromReservation = screen === 'waiting' && state?.fromReservation === true;
    const listPath = getMeetingListPath(state?.meetingListSearch);
    const [, refresh] = useReducer((revision) => revision + 1, 0);
    useEffect(() => {
        const onStorage = (event) => {
            if (isMeetingStorageEvent(event))
                refresh();
        };
        window.addEventListener('storage', onStorage);
        const timer = screen === 'waiting' ? window.setInterval(refresh, 1000) : undefined;
        return () => {
            window.removeEventListener('storage', onStorage);
            window.clearInterval(timer);
        };
    }, [screen]);
    const listState = (meetingNotice) => ({
        meetingNotice,
        meetingListKey: state?.meetingListKey,
    });
    let meeting;
    try {
        meeting = getMockMeeting(meetingId);
    }
    catch {
        return <Navigate to={listPath} replace state={listState('unavailable')}/>;
    }
    const wrongKind = screen === 'detail' && meeting?.kind !== 'scheduled';
    if (!meeting || wrongKind) {
        return <Navigate to={listPath} replace state={listState('missing')}/>;
    }
    const entry = getMeetingEntry(meeting);
    if (entry.canEnter === false) {
        return <Navigate to={listPath} replace state={listState(entry.notice)}/>;
    }
    const pendingWaitingRoom = fromReservation &&
        meeting.kind === 'scheduled' &&
        Boolean(meeting.membership) &&
        isReservationStatusPending(meeting);
    if (screen === 'waiting' &&
        meeting.kind === 'scheduled' &&
        meeting.status === 'waiting' &&
        !canEnterWaitingRoom(meeting) &&
        !pendingWaitingRoom) {
        if (fromReservation && !meeting.membership) {
            return <Navigate to={listPath} replace state={listState('reservation-cancelled')}/>;
        }
        return <Navigate to={`/project/moyang/meetings/${encodeURIComponent(meeting.id)}`} replace state={state}/>;
    }
    if ((screen === 'chat') !== (meeting.status === 'in-progress')) {
        return <Navigate to={getMeetingPath(meeting)} replace state={state}/>;
    }
    return (<HomeLayout>
      <section className={styles.handoff}>
        <h1>{meeting.title}</h1>
        <p role="status">
          {pendingWaitingRoom ? '모임 시작 상태를 확인하고 있어요.' : screenMessage[screen]}
        </p>
        {fromReservation ? (<button className={styles.backLink} type="button" onClick={() => {
                if (window.history.state?.idx > 0)
                    navigate(-1);
                else
                    navigate(`/project/moyang/meetings/${encodeURIComponent(meeting.id)}`, { replace: true });
            }}>
            모임 상세로 돌아가기
          </button>) : fromList ? (<button className={styles.backLink} type="button" onClick={() => {
                if (window.history.state?.idx > 0)
                    navigate(-1);
                else
                    navigate(listPath, { replace: true });
            }}>
            모임 목록으로 돌아가기
          </button>) : (<Link className={styles.backLink} to={screen === 'chat' ? '/project/moyang/meetings?tab=mine' : '/project/moyang/meetings'} replace>
            모임 목록으로 돌아가기
          </Link>)}
      </section>
    </HomeLayout>);
};
