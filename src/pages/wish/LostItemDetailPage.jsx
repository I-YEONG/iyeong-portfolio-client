import { useParams } from 'react-router';
import { LostItemDetailScreen } from '@/features/wish/notices';
export default function LostItemDetailPage() {
    const { id } = useParams();
    return <LostItemDetailScreen lostItemId={Number(id)}/>;
}
