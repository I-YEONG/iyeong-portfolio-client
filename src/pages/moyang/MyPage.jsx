import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChevronRight, faCircleQuestion, faCircleUser, faClipboardList, faCommentDots, faLock, faRightFromBracket, faSliders, faStar, faTriangleExclamation, } from '@fortawesome/free-solid-svg-icons';
import { HomeLayout, Modal, SheepProfile } from '@/components/moyang';
import { useGetMoyangQuery } from '@/features/moyang/hooks/useGetMoyangQuery';
import { useAuth } from '@/hooks/useAuth';
import { readPreviewColor, readSheepColor } from '@/features/moyang/profile';
import { readPreviewPlan } from '@/features/moyang/plans';
import styles from './MyPage.module.css';
const Menu = ({ title, items, filled = false, }) => (<section className={styles.section}>
    {title && <h2 className="moyang-text-body">{title}</h2>}
    <div className={`${styles.menu} ${filled ? styles.filled : ''}`}>
      {items.map(({ label, icon, to, action }) => {
        const content = (<>
            <FontAwesomeIcon icon={icon} className={styles.menuIcon} aria-hidden="true"/>
            <span>{label}</span>
            <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} aria-hidden="true"/>
          </>);
        return to ? (<Link key={label} className={styles.menuItem} to={to}>
            {content}
          </Link>) : (<button key={label} type="button" className={styles.menuItem} onClick={action} disabled={!action} aria-label={action ? undefined : `${label} (준비 중)`}>
            {content}
          </button>);
    })}
    </div>
  </section>);
export const MyPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const preview = false;
    const { data: user, isError, refetch } = useGetMoyangQuery('/api/users/me', { enabled: !preview });
    const userId = user?.userId ?? null;
    const [withdrawOpen, setWithdrawOpen] = useState(false);
    const handleLogout = () => {
        if (!window.confirm('로그아웃 하시겠어요?'))
            return;
        logout();
        navigate('/project/moyang/onboarding', { replace: true });
    };
    const suffix = '';
    const previewPlan = preview ? readPreviewPlan() : null;
    return (<HomeLayout>
      <main className={styles.page}>
        <header className={styles.header}>
          <Link to={`/project/moyang/notifications${suffix}`} aria-label="알림">
            <FontAwesomeIcon icon={faBell}/>
          </Link>
        </header>
        <div className={styles.profile}>
          <div className={styles.stat}>
            <span className="moyang-text-caption">모은 양털</span>
            <strong className="moyang-text-caption-medium">
              {preview ? '2개' : '—'}
            </strong>
          </div>
          <div className={styles.avatar}>
            <div className={styles.avatarImage}>
              <SheepProfile color={preview ? readPreviewColor() : readSheepColor(userId)} size={95}/>
            </div>
          </div>
          <div className={styles.stat}>
            <span className="moyang-text-caption">다음 성장까지</span>
            <strong className="moyang-text-caption-medium">{preview ? '8개' : '—'}</strong>
          </div>
        </div>
        {isError && (<p className={`${styles.error} moyang-text-caption`} role="status">
            내 정보를 불러오지 못했어요.{' '}
            <button type="button" onClick={() => refetch()}>
              다시 시도
            </button>
          </p>)}
        <div className={styles.sections}>
          <Menu title="내 정보" filled items={[
            { label: '개인정보 수정', icon: faCircleUser, to: `/project/moyang/my/profile${suffix}` },
            { label: '나의 맞춤 정보 수정', icon: faSliders },
        ]}/>
          <section className={styles.section}>
            <div className={styles.planHeading}>
              <h2 className="moyang-text-body">요금제</h2>
              <Link to={`/project/moyang/my/plans${suffix}`}>
                요금제 자세히 보기 <FontAwesomeIcon icon={faChevronRight}/>
              </Link>
            </div>
            <div className={styles.plan}>
              <span className={styles.planIcon}>
                <FontAwesomeIcon icon={faStar}/>
              </span>
              <div>
                <strong className="moyang-text-body">
                  {previewPlan ? `모양 ${previewPlan === 'basic' ? '베이직' : '플러스'}` : '요금제'}
                </strong>
                <p className="moyang-text-caption">
                  {previewPlan
            ? `지금은 ${previewPlan === 'basic' ? '베이직' : '플러스'} 요금제를 이용하고 있어요`
            : '요금제 정보를 준비하고 있어요'}
                </p>
              </div>
            </div>
          </section>
          <Menu title="서비스 설정" items={[
            { label: '알림 설정', icon: faBell },
            { label: '개인정보 및 기록 관리', icon: faClipboardList },
        ]}/>
          <Menu title="서비스 안내" items={[
            { label: '모양 서비스 소개', icon: faCommentDots, to: `/project/moyang/about${suffix}` },
            { label: '자주 묻는 질문', icon: faCircleQuestion },
            { label: '문의하기', icon: faCommentDots },
            { label: '이용약관 및 개인정보처리 방침', icon: faTriangleExclamation },
        ]}/>
          <Menu items={[
            { label: '로그아웃', icon: faLock, action: handleLogout },
            {
                label: '회원 탈퇴',
                icon: faRightFromBracket,
                action: () => setWithdrawOpen(true),
            },
        ]}/>
        </div>
      </main>
      <Modal isOpen={withdrawOpen} onClose={() => setWithdrawOpen(false)} title="회원 탈퇴" actions={[{ label: '확인', onClick: () => setWithdrawOpen(false) }]}>
        <p>회원 탈퇴 기능을 준비하고 있어요.</p>
      </Modal>
    </HomeLayout>);
};
