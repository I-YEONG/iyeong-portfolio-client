import { useParams } from 'react-router';
import { NoticeDetailScreen } from '@/features/wish/notices';
export default function NoticeDetailPage() {
    const { id } = useParams();
    return <NoticeDetailScreen noticeId={Number(id)}/>;
}
