import { IconSparkles } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { PageHeader } from './layout/PageHeader';
/** 아직 공개하지 않은 기능에서도 안내와 홈 복귀 동선을 제공한다. */
export function ComingSoonPage({ title }) {
    const navigate = useNavigate();
    return (<main className="flex min-h-dvh flex-col bg-black font-body text-white">
      <PageHeader title={title} onBack={() => navigate(ROUTES.HOME)} backLabel="홈으로 돌아가기"/>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-6 grid size-20 place-items-center rounded-full bg-main-02 text-main-01">
          <IconSparkles size={36} stroke={1.5} aria-hidden="true"/>
        </div>
        <h2 className="font-display text-2xl font-medium">준비 중이에요</h2>
        <p className="mt-4 text-base leading-7 text-gray-01">
          더 즐거운 축제를 위해
          <br />이 기능을 준비하고 있어요.
        </p>
        <Link to={ROUTES.HOME} className="mt-8 flex min-h-12 w-full max-w-[280px] items-center justify-center rounded-full bg-main-01 px-6 py-3 font-semibold text-black">
          홈으로 돌아가기
        </Link>
      </div>
    </main>);
}
