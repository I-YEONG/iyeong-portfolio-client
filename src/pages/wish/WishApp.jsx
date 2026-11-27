import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/features/wish/auth/store';
import '@/styles/wish.global.css';

const Landing = lazy(() => import('./LandingPage'));
const Login = lazy(() => import('./LoginPage'));
const Signup = lazy(() => import('./SignupPage'));
const Home = lazy(() => import('./HomePage'));
const Booths = lazy(() => import('./BoothsPage'));
const BoothDetail = lazy(() => import('./BoothDetailPage'));
const Stamps = lazy(() => import('./StampsPage'));
const Performances = lazy(() => import('./PerformancesPage'));
const PerformanceDetail = lazy(() => import('./PerformanceDetailPage'));
const Letters = lazy(() => import('./LettersPage'));
const LetterWrite = lazy(() => import('./LetterWritePage'));
const Polls = lazy(() => import('./PollsPage'));
const PollDetail = lazy(() => import('./PollDetailPage'));
const Bamboo = lazy(() => import('./BambooPage'));
const Notices = lazy(() => import('./NoticesPage'));
const NoticeDetail = lazy(() => import('./NoticeDetailPage'));
const LostItems = lazy(() => import('./LostItemsPage'));
const LostItemDetail = lazy(() => import('./LostItemDetailPage'));
const Sponsors = lazy(() => import('./SponsorsPage'));
const About = lazy(() => import('./AboutPage'));
const My = lazy(() => import('./MyPage'));
const NotFound = lazy(() => import('./NotFoundPage'));

export default function WishApp({ isPc }) {
  const { isLogin } = useAuth();
  useEffect(() => {
    useAuthStore.setState((state) => ({ status: isLogin ? 'authenticated' : 'anonymous', sessionVersion: state.sessionVersion + 1 }));
  }, [isLogin]);

  return (
    <div className="wish" style={{ height: '100%', overflow: 'auto', background: '#080c18', color: '#fff' }}>
      <div className="wish-screen" style={{ width: '100%', maxWidth: isPc ? 480 : '100%', minHeight: '100%', height: '100%', margin: 'auto', position: 'relative', transform: 'translate(0)', containerType: 'size' }}>
        <Suspense fallback={<p>화면을 불러오는 중입니다.</p>}>
          <Routes>
            <Route element={<Landing />}>
              <Route index element={null} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
            <Route path="home" element={<Home />} />
            <Route path="booths" element={<Booths />} />
            <Route path="booths/:id" element={<BoothDetail />} />
            <Route path="stamps" element={<Stamps />} />
            <Route path="performances" element={<Performances />} />
            <Route path="performances/:id" element={<PerformanceDetail />} />
            <Route path="letters" element={<Letters />} />
            <Route path="letters/write" element={<LetterWrite />} />
            <Route path="polls" element={<Polls />} />
            <Route path="polls/:id" element={<PollDetail />} />
            <Route path="bamboo" element={<Bamboo />} />
            <Route path="notices" element={<Notices />} />
            <Route path="notices/:id" element={<NoticeDetail />} />
            <Route path="lost-items" element={<LostItems />} />
            <Route path="lost-items/:id" element={<LostItemDetail />} />
            <Route path="sponsors" element={<Sponsors />} />
            <Route path="about" element={<About />} />
            <Route path="my" element={<My />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
