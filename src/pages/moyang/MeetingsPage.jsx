import { HomeLayout } from '@/components/moyang';
import { MeetingList } from '@/features/moyang/meeting-list/MeetingList';
import { useMockStorageScope } from '@/features/moyang/hooks/useMockStorageScope';
export const MeetingsPage = ({ getCreatePath }) => {
    const scope = useMockStorageScope();
    return (<HomeLayout>
      <MeetingList key={scope} getCreatePath={getCreatePath}/>
    </HomeLayout>);
};
