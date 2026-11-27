import { useNavigate } from 'react-router';
import { PageHeader } from '@/components/wish/layout/PageHeader';
import { ROUTES } from '@/features/wish/shared/constants/routes';
export function DetailPageLayout({ children, title = '공지사항', backTo = ROUTES.NOTICES, }) {
    const navigate = useNavigate();
    return (<div className="page-surface">
      <PageHeader title={title} onBack={() => navigate(backTo)}/>
      <main className="px-[23px] py-6">{children}</main>
    </div>);
}
