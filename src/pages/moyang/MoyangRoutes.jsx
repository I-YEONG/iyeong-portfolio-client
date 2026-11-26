import { Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { RootLayout } from '@/components/moyang';
import { StartPage } from '@/pages/moyang/StartPage';
import { OnboardingProfilePage } from '@/pages/moyang/OnboardingProfilePage';
import { HomePage } from '@/pages/moyang/HomePage';
import { AboutPage } from '@/pages/moyang/AboutPage';
import { NotificationsPage } from '@/pages/moyang/NotificationsPage';
import { DrawingPage } from '@/pages/moyang/DrawingPage';
import { DrawingOnboardingFirstPage } from '@/pages/moyang/DrawingOnboardingFirstPage';
import { DrawingOnboardingSecondPage } from '@/pages/moyang/DrawingOnboardingSecondPage';
import { DrawingOnboardingThirdPage } from '@/pages/moyang/DrawingOnboardingThirdPage';
import { DrawingCanvasPage } from '@/pages/moyang/DrawingCanvasPage';
import { DrawingUploadPage } from '@/pages/moyang/DrawingUploadPage';
import { DrawingCameraPage } from '@/pages/moyang/DrawingCameraPage';
import { DrawingDetailsPage } from '@/pages/moyang/DrawingDetailsPage';
import { DrawingConversationPage } from '@/pages/moyang/DrawingConversationPage';
import { DrawingResultPage } from '@/pages/moyang/DrawingResultPage';
import { SessionsPage } from '@/pages/moyang/SessionsPage';
import { MeetingsPage } from '@/pages/moyang/MeetingsPage';
import { MeetingCreatePage } from '@/pages/moyang/MeetingCreatePage';
import { MeetingDetailPage } from '@/pages/moyang/MeetingDetailPage';
import { MeetingWaitingPage } from '@/pages/moyang/MeetingWaitingPage';
import { MeetingChatPage } from '@/pages/moyang/MeetingChatPage';
import { MeetingDrawingPage } from '@/pages/moyang/MeetingDrawingPage';
import { MeetingHistoryPage } from '@/pages/moyang/MeetingHistoryPage';
import { RecordsPage } from '@/pages/moyang/RecordsPage';
import { RecordDetailPage } from '@/pages/moyang/RecordDetailPage';
import { MyPage } from '@/pages/moyang/MyPage';
import { ProfilePage } from '@/pages/moyang/ProfilePage';
import { PlansPage } from '@/pages/moyang/PlansPage';
import { NotFoundPage } from '@/pages/moyang/NotFoundPage';
import '@/styles/moyang.global.css';
import { setMoyangLoginState } from '@/features/moyang/lib/api-client';

const Entry = () => {
  const { isLogin, isAuthLoading } = useAuth();
  if (isAuthLoading) return null;
  return <Navigate to={isLogin ? '/project/moyang/home' : '/project/moyang/onboarding'} replace />;
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { login(); navigate('/project/moyang/home', { replace: true }); }, []);
  return null;
};

const RequireLogin = () => {
  const { isLogin, isAuthLoading } = useAuth();
  if (isAuthLoading) return null;
  return isLogin ? <Outlet /> : <Navigate to="/project/moyang/onboarding" replace />;
};

export default function MoyangRoutes({ isPc }) {
  const { isLogin } = useAuth();
  setMoyangLoginState(isLogin);
  return <div className={`moyang${isPc ? ' moyang--pc' : ''}`}><Routes><Route element={<RootLayout />}>
    <Route index element={<Entry />} />
    <Route path="onboarding" element={<StartPage />} />
    <Route path="login" element={<Login />} />
    <Route element={<RequireLogin />}>
    <Route path="onboarding/profile" element={<OnboardingProfilePage />} />
    {['lifestyle', 'concerns', 'emotions', 'story'].map((section, index) => <Route key={section} path={`onboarding/${section}`} element={<Navigate to={`/project/moyang/onboarding/profile?page=${index + 2}`} replace />} />)}
    <Route path="home" element={<HomePage />} /><Route path="about" element={<AboutPage />} />
    <Route path="notifications" element={<NotificationsPage />} />
    <Route path="drawing" element={<DrawingPage />} />
    <Route path="drawing/onboarding/1" element={<DrawingOnboardingFirstPage />} />
    <Route path="drawing/onboarding/2" element={<DrawingOnboardingSecondPage />} />
    <Route path="drawing/onboarding/3" element={<DrawingOnboardingThirdPage />} />
    <Route path="drawing/canvas" element={<DrawingCanvasPage />} /><Route path="drawing/upload" element={<DrawingUploadPage />} />
    <Route path="drawing/camera" element={<DrawingCameraPage />} /><Route path="drawing/details" element={<DrawingDetailsPage />} />
    <Route path="drawing/conversation" element={<DrawingConversationPage />} /><Route path="drawing/result" element={<DrawingResultPage />} />
    <Route path="sessions" element={<SessionsPage />} />
    <Route path="meetings" element={<MeetingsPage getCreatePath={() => '/project/moyang/meetings/create'} />} />
    <Route path="meetings/create" element={<MeetingCreatePage />} /><Route path="meetings/:meetingId" element={<MeetingDetailPage />} />
    <Route path="meetings/:meetingId/waiting" element={<MeetingWaitingPage />} /><Route path="meetings/:meetingId/chat" element={<MeetingChatPage />} />
    <Route path="meetings/:meetingId/drawing/:step" element={<MeetingDrawingPage />} /><Route path="meetings/:meetingId/history" element={<MeetingHistoryPage />} />
    <Route path="records" element={<RecordsPage />} /><Route path="records/:recordId" element={<RecordDetailPage />} />
    <Route path="my" element={<MyPage />} /><Route path="my/profile" element={<ProfilePage />} /><Route path="my/plans" element={<PlansPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route></Routes></div>;
}
