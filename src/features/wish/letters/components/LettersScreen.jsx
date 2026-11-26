import { IconHome, IconMail, IconMapPin, IconMessageCircle, IconMicrophone2, } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import letterBackground from '@/assets/wish/letter/letter-bg.png';
import letterButton from '@/assets/wish/letter/letter-button.png';
import voteIcon from '@/assets/wish/material-symbols_how-to-vote-outline-rounded.svg';
import { StateDialog } from '@/components/wish/feedback/StateDialog';
import { BottomNavigation } from '@/components/wish/layout/BottomNavigation';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useAuthSession } from '@/features/wish/auth';
import { BirthdayMessageList } from './BirthdayMessageList';
import { LetterWriteModal } from './LetterWriteModal';
const navigationItems = [
    { id: 'booths', label: '부스 지도', to: ROUTES.BOOTHS, icon: <IconMapPin stroke={2}/> },
    {
        id: 'performances',
        label: '연예인 공개',
        to: ROUTES.PERFORMANCES,
        icon: <IconMicrophone2 stroke={2}/>,
    },
    { id: 'letters', label: '축하 편지', to: ROUTES.LETTERS, icon: <IconMail stroke={2}/> },
    { id: 'polls', label: '투표', to: ROUTES.POLLS, icon: <img src={voteIcon} alt=""/> },
    { id: 'bamboo', label: '대나무숲', to: ROUTES.BAMBOO, icon: <IconMessageCircle stroke={2}/> },
    { id: 'home', label: '홈', to: ROUTES.HOME, icon: <IconHome stroke={2}/> },
];
/** 고정된 배경 영역 안에서 공개 축하 편지와 작성 모달을 제공한다. */
export function LettersScreen() {
    const navigate = useNavigate();
    const { isAuthenticated, isInitializing } = useAuthSession();
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [isLoginDialogDismissed, setIsLoginDialogDismissed] = useState(false);
    const isLoginDialogOpen = !isInitializing && !isAuthenticated && !isLoginDialogDismissed;
    function openLetterWriter() {
        if (isInitializing)
            return;
        if (!isAuthenticated) {
            setIsLoginDialogDismissed(false);
            return;
        }
        setIsWriteModalOpen(true);
    }
    return (<main className="relative isolate min-h-dvh overflow-x-hidden bg-black">
      <h1 className="sr-only">120주년 축하편지</h1>

      <div className="relative aspect-[393/1615] min-h-dvh overflow-hidden bg-cover bg-top bg-no-repeat" style={{ backgroundImage: `url(${letterBackground})` }}>
        <BirthdayMessageList />
      </div>

      <button type="button" aria-label="축하 편지 쓰기" onClick={openLetterWriter} className="fixed bottom-[calc(112px+env(safe-area-inset-bottom))] z-10 grid size-[88px] place-items-center" style={{ right: 'max(20px, calc((100vw - var(--container-mobile)) / 2 + 20px))' }}>
        <img src={letterButton} alt=""/>
      </button>

      <BottomNavigation items={navigationItems} activeId="letters" className="fixed right-0 bottom-[max(26px,calc(env(safe-area-inset-bottom)+26px))] left-0 z-10"/>

      {isWriteModalOpen && <LetterWriteModal onClose={() => setIsWriteModalOpen(false)}/>}
      {isLoginDialogOpen && (<StateDialog title="로그인이 필요합니다" message={'120주년 축하편지는\n로그인 후 작성할 수 있습니다.'} actionLabel="로그인하기" onAction={() => navigate(ROUTES.LOGIN)} onClose={() => setIsLoginDialogDismissed(true)}/>)}
    </main>);
}
