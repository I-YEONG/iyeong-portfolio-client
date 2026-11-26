import { useNavigate } from 'react-router';
import { CategoryTabs } from '@/components/wish/CategoryTabs';
import { PageHeader } from '@/components/wish/layout/PageHeader';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useNoticeBanner } from '../hooks/useNotices';
import { NoticeBanner } from './NoticeBanner';
const categories = [
    { id: 'notices', label: '공지', to: ROUTES.NOTICES },
    { id: 'lost-items', label: '분실물', to: ROUTES.LOST_ITEMS },
    { id: 'sponsors', label: '협찬사', to: ROUTES.SPONSORS },
];
export function InformationPageLayout({ activeId, children }) {
    const navigate = useNavigate();
    const bannerQuery = useNoticeBanner();
    return (<div className="page-surface">
      <PageHeader title="공지사항" onBack={() => navigate(ROUTES.HOME)}/>
      {bannerQuery.data ? <NoticeBanner notice={bannerQuery.data}/> : null}
      <main>
        <CategoryTabs items={categories} activeId={activeId} ariaLabel="공지사항 카테고리" className="px-3.5 py-3"/>
        {children}
      </main>
    </div>);
}
