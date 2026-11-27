import { ServerMeetingChat } from '@/features/moyang/meeting-chat/ServerMeetingChat';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useMockStorageScope } from '@/features/moyang/hooks/useMockStorageScope';
import { hasMoyangApi } from '@/features/moyang/lib/moyang-api';
import { MeetingWaitingRoom } from '@/features/moyang/meeting-waiting-room/MeetingWaitingRoom';
import { isMeetingPreview } from '@/features/moyang/meeting-list/meetingEntry';
export const MeetingChatPage = () => {
    const { search } = useLocation();
    const { meetingId } = useParams();
    const scope = useMockStorageScope();
    if (!hasMoyangApi || isMeetingPreview(search, meetingId))
        return <MeetingWaitingRoom view="chat"/>;
    if (!meetingId || !scope)
        return <Navigate to="/project/moyang/meetings" replace/>;
    const key = JSON.stringify([scope, meetingId]);
    return <ServerMeetingChat key={key} id={meetingId} scope={scope}/>;
};
