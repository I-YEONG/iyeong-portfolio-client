import { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router';
import mainLogo from '@/assets/wish/my/main-logo.svg';
import qrButton from '@/assets/wish/my/qr-button.svg';
import { PageHeader } from '@/components/wish/layout/PageHeader';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useAuthSession, useLogout, useMe } from '@/features/wish/auth';
import { useSchoolVerification } from '../hooks/useSchoolVerification';
import { resolveMyPageState } from '../lib/pageState';
import { getPreviewDialog, getPreviewMismatch, getPreviewProfile } from '../lib/preview';
import { toMyProfile } from '../lib/profile';
import { nextForVerificationResult } from '../lib/verificationResult';
import { AccountEditDialog } from './AccountEditDialog';
import { DepartmentMismatchDialog } from './DepartmentMismatchDialog';
import { ProfileCard } from './ProfileCard';
import { QrDialog } from './QrDialog';
import { StudentVerifyDialog } from './StudentVerifyDialog';
import { VerifyUnavailableDialog } from './VerifyUnavailableDialog';
import { ProfileEditDialog } from './ProfileEditDialog';
import { ResultDialog } from './ResultDialog';
import { WithdrawDialog } from './WithdrawDialog';
/**
 * 마이페이지 (Figma 1437:2636 학생인증 완료 · 1437:2747 미완료)
 *
 * Figma 393px 프레임을 100cqw로 환산해 컨테이너 폭에 비례하도록 배치한다. (1px = 0.2545cqw)
 * 캔버스의 y = 0은 Figma의 y = 113(헤더 아래)에 해당한다.
 */
export function MyPageScreen() {
    const navigate = useNavigate();
    const previewProfile = getPreviewProfile();
    const { isAuthenticated, isInitializing } = useAuthSession();
    const { data: me, isPending, isFetching, refetch, } = useMe(previewProfile === null && isAuthenticated);
    /* 학교 SSO에서 돌아온 결과. 첫 렌더에 한 번만 읽고 URL에서는 지운다. */
    const [verificationNext] = useState(() => {
        const result = new URLSearchParams(window.location.search).get('schoolVerification');
        return result ? nextForVerificationResult(result) : null;
    });
    const [hasVerifyFailed, setHasVerifyFailed] = useState(verificationNext === 'retry');
    const [openDialog, setOpenDialog] = useState(() => {
        if (verificationNext === 'done')
            return 'studentVerifyDone';
        if (verificationNext === 'unavailable')
            return 'verifyUnavailable';
        if (verificationNext === 'pendingApproval')
            return 'verifyPending';
        if (verificationNext === 'retry')
            return 'studentVerify';
        // 'department'는 학과를 비교한 뒤에 열 팝업이 정해진다.
        return verificationNext ? null : getPreviewDialog();
    });
    const logout = useLogout();
    const { authorize, check, confirm } = useSchoolVerification();
    const { mutate: checkDepartment } = check;
    const { mutate: confirmSchoolDepartment } = confirm;
    const [, setSearchParams] = useSearchParams();
    const verificationHandled = useRef(false);
    const mismatch = check.data ?? getPreviewMismatch();
    const handleBack = () => navigate(ROUTES.HOME);
    const handleLogout = () => {
        logout.mutate(undefined, { onSuccess: () => setOpenDialog('logoutDone') });
    };
    /** 학과가 학적정보와 같으면 바로 인증을 끝내고, 다르면 확인 팝업을 거친다. */
    const finishVerification = useCallback(() => {
        confirmSchoolDepartment(undefined, {
            onSuccess: () => setOpenDialog('studentVerifyDone'),
            onError: () => {
                setHasVerifyFailed(true);
                setOpenDialog('studentVerify');
            },
        });
    }, [confirmSchoolDepartment]);
    /** 인증 시작. 학교 로그인으로 넘어갔다가 schoolVerification 결과로 돌아온다. */
    const handleVerify = () => {
        setHasVerifyFailed(false);
        authorize.mutate(undefined, { onError: () => setHasVerifyFailed(true) });
    };
    useEffect(() => {
        if (!verificationNext || verificationHandled.current)
            return;
        // SSO 왕복 뒤에는 메모리 토큰이 없으므로 refresh 성공까지 보호 API 호출을 미룬다.
        if (verificationNext === 'department' && !isAuthenticated)
            return;
        verificationHandled.current = true;
        setSearchParams((params) => {
            params.delete('schoolVerification');
            return params;
        }, { replace: true });
        if (verificationNext === 'department') {
            checkDepartment(undefined, {
                onSuccess: (mismatch) => {
                    if (mismatch.currentDepartment === mismatch.schoolDepartment) {
                        finishVerification();
                        return;
                    }
                    setOpenDialog('departmentMismatch');
                },
                onError: () => {
                    setHasVerifyFailed(true);
                    setOpenDialog('studentVerify');
                },
            });
        }
    }, [verificationNext, isAuthenticated, setSearchParams, checkDepartment, finishVerification]);
    /** 로그아웃·탈퇴 후에는 뒤로가기로 돌아오지 못하도록 첫 화면으로 replace 이동한다. */
    const leaveToLanding = () => {
        navigate(ROUTES.LANDING, { replace: true });
        setOpenDialog(null);
    };
    const profile = previewProfile ?? (me ? toMyProfile(me) : null);
    const pageState = resolveMyPageState({
        hasProfile: profile !== null,
        isInitializing,
        isAuthenticated,
        isProfilePending: isPending,
        hasOpenDialog: openDialog !== null,
    });
    if (pageState === 'redirect-login')
        return <Navigate replace to={ROUTES.LOGIN}/>;
    return (<div className="relative min-h-dvh w-full overflow-hidden bg-[rgb(48_217_221)]">
      <PageHeader title="마이페이지" onBack={handleBack} className="relative z-10 min-h-[63px] border-b border-white/[0.17] bg-black shadow-none"/>

      <div className="@container relative w-full">
        <div className="relative h-[188.041cqw] w-full">
          {/*
         * 배경: 밤하늘 → 민트 그라데이션 (Figma 1437:2666)
         * MCP가 준 3스톱 값은 실제 Figma 렌더와 어긋나서, 렌더 픽셀에서 뽑은 색을 스톱으로 쓴다.
         */}
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_14_38)_0%,rgb(13_21_48)_10%,rgb(16_29_60)_20%,rgb(20_38_74)_30%,rgb(22_46_87)_40%,rgb(27_68_107)_50%,rgb(31_96_129)_60%,rgb(36_131_154)_70%,rgb(40_158_176)_80%,rgb(45_199_205)_90%,rgb(48_217_221)_100%)]"/>

          <img src={mainLogo} alt="Make A Wish" className="absolute top-[7.069cqw] left-[31.043cqw] h-[26.708cqw] w-[37.771cqw] max-w-none [filter:drop-shadow(0_0_3.817cqw_rgb(0_234_255/0.8))]"/>

          {pageState === 'loading' ? (<p role="status" className="absolute top-[55.725cqw] left-1/2 -translate-x-1/2 text-[3.562cqw] text-white">
              내 정보를 불러오고 있습니다.
            </p>) : !profile ? (<div className="absolute top-[55.725cqw] left-1/2 w-[80cqw] -translate-x-1/2 text-center">
              <p role="alert" className="text-[3.562cqw] text-white">
                내 정보를 불러오지 못했습니다.
              </p>
              <button type="button" onClick={() => void refetch()} disabled={isFetching} className="mt-[3.562cqw] rounded-full bg-white/1 px-[5.089cqw] py-[1.782cqw] text-[3.562cqw] text-white shadow-[inset_0_0_0_1px_rgba(150,240,245,0.36),inset_1px_1px_0_rgba(150,240,245,0.22),inset_-1px_-1px_0_rgba(150,240,245,0.08)] backdrop-blur-[12px] disabled:opacity-60">
                {isFetching ? '다시 불러오는 중…' : '다시 시도'}
              </button>
            </div>) : (<>
              {/*
             * 카드의 <dl>은 화면 전체(inset-0)를 덮는다. 뒤에 두면 학생인증하기
             * 버튼 위로 올라와 클릭을 가로채므로, 버튼들보다 먼저 그린다.
             */}
              <ProfileCard profile={profile}/>

              {/* 상태 줄 (Figma 1437:2581) */}
              <p className="absolute top-[39.44cqw] left-[8.397cqw] text-[4.071cqw] font-semibold text-white" style={{
                textShadow: profile.schoolVerified ? '0 0 4px #00FF08' : '0 0 4px #FF0000',
            }}>
                {profile.schoolVerified ? '학생 인증 완료' : '학생 인증 미완료'}
              </p>
              {/*
             * 인증 전에는 학생회비 납부 여부를 확정할 수 없어, 그 자리에
             * 인증을 시작하는 버튼을 둔다. 스타일은 아래 글래스 버튼과 맞춘다.
             */}
              {profile.schoolVerified ? (<p className="absolute top-[39.44cqw] right-[8.397cqw] text-[4.071cqw] font-semibold text-white">
                  {profile.studentFeePaid ? '학생회비 납부자' : '학생회비 미납부자'}
                </p>) : (<button type="button" onClick={() => setOpenDialog('studentVerify')} className="absolute top-[37.66cqw] right-[7.125cqw] rounded-full bg-white/1 px-[4.071cqw] py-[1.272cqw] text-[3.817cqw] font-semibold text-white shadow-[inset_0_0_0_1px_rgba(150,240,245,0.36),inset_1px_1px_0_rgba(150,240,245,0.22),inset_-1px_-1px_0_rgba(150,240,245,0.08)] backdrop-blur-[12px] [text-shadow:0_0_4px_#5B36FF]">
                  학생인증하기
                </button>)}

              <button type="button" onClick={() => setOpenDialog('profileEdit')} className="absolute top-[124.936cqw] right-[6.107cqw] text-[3.562cqw] text-white underline">
                정보수정
              </button>
            </>)}

          {/* 부스 스탬프 (Figma 1437:2596, Glass 효과) */}
          <button type="button" onClick={() => navigate(ROUTES.STAMPS)} className="absolute top-[139.949cqw] left-[9.669cqw] flex h-[16.539cqw] w-[58.779cqw] items-center justify-center rounded-full bg-white/1 text-[4.58cqw] text-white shadow-[inset_0_0_0_1px_rgba(150,240,245,0.36),inset_1px_1px_0_rgba(150,240,245,0.22),inset_-1px_-1px_0_rgba(150,240,245,0.08),inset_2px_0_1px_-1px_rgba(150,240,245,0.45),inset_-2px_0_1px_-1px_rgba(150,240,245,0.32)] backdrop-blur-[12px] [text-shadow:0_0_4px_#5B36FF]">
            부스 스탬프 보러가기
          </button>

          <button type="button" aria-label="내 QR 코드 보기" onClick={() => setOpenDialog('qr')} 
    /*
     * 시안의 유리 원은 Figma Glass 효과라 SVG로 안 나온다.
     * 옆 부스 스탬프 버튼과 같은 방식으로 CSS에서 그린다.
     */
    className="absolute top-[140.204cqw] left-[73.791cqw] flex size-[16.285cqw] items-center justify-center rounded-full bg-white/1 shadow-[inset_0_0_0_1px_rgba(150,240,245,0.36),inset_1px_1px_0_rgba(150,240,245,0.22),inset_-1px_-1px_0_rgba(150,240,245,0.08),inset_2px_0_1px_-1px_rgba(150,240,245,0.45),inset_-2px_0_1px_-1px_rgba(150,240,245,0.32)] backdrop-blur-[12px]">
            <img src={qrButton} alt="" className="size-full [filter:drop-shadow(0_0_1.018cqw_#5B36FF)]"/>
          </button>

          {/* 하단 링크 (Figma 1437:2718) */}
          <button type="button" onClick={() => setOpenDialog('withdraw')} className="absolute top-[174.809cqw] left-[29.517cqw] text-[3.562cqw] text-white underline drop-shadow-[0_0_1px_rgba(0,0,0,0.25)]">
            회원탈퇴
          </button>
          <button type="button" onClick={handleLogout} disabled={logout.isPending} className="absolute top-[174.809cqw] left-[54.707cqw] text-[3.562cqw] text-white underline drop-shadow-[0_0_1px_rgba(0,0,0,0.25)] disabled:opacity-60">
            로그아웃
          </button>
        </div>
      </div>

      {openDialog === 'profileEdit' && profile ? (<ProfileEditDialog profile={profile} onClose={() => setOpenDialog(null)} onCompleted={() => setOpenDialog('accountEdit')}/>) : null}

      {openDialog === 'studentVerify' && profile ? (<StudentVerifyDialog profile={profile} onVerify={handleVerify} isPending={authorize.isPending || check.isPending || confirm.isPending} hasFailed={hasVerifyFailed} onClose={() => setOpenDialog(null)}/>) : null}

      {openDialog === 'departmentMismatch' && mismatch ? (<DepartmentMismatchDialog mismatch={mismatch} onNext={finishVerification} isPending={confirm.isPending} onClose={() => setOpenDialog(null)}/>) : null}

      {openDialog === 'verifyUnavailable' ? (<VerifyUnavailableDialog reason="alreadyLinked" onClose={() => setOpenDialog(null)}/>) : null}

      {openDialog === 'verifyPending' ? (<VerifyUnavailableDialog reason="pendingApproval" onClose={() => setOpenDialog(null)}/>) : null}

      {openDialog === 'studentVerifyDone' ? (<ResultDialog title="학생인증" message="학생인증이 완료되었습니다." underline onClose={() => setOpenDialog(null)}/>) : null}

      {openDialog === 'qr' && profile ? (<QrDialog profile={profile} onClose={() => setOpenDialog(null)}/>) : null}

      {openDialog === 'accountEdit' ? (<AccountEditDialog onBack={() => setOpenDialog('profileEdit')} onClose={() => setOpenDialog(null)} onCompleted={() => setOpenDialog('profileDone')} onPasswordChanged={() => setOpenDialog('passwordChanged')}/>) : null}

      {openDialog === 'passwordChanged' ? (<ResultDialog title="정보 수정" message="비밀번호가 변경되었습니다. 다시 로그인해 주세요." onClose={() => {
                setOpenDialog(null);
                navigate(ROUTES.LOGIN, { replace: true });
            }}/>) : null}

      {openDialog === 'profileDone' ? (<ResultDialog title="정보 수정" message="정보 수정이 완료되었습니다." onClose={() => setOpenDialog(null)}/>) : null}

      {openDialog === 'withdraw' ? (<WithdrawDialog onClose={() => setOpenDialog(null)} onCompleted={() => setOpenDialog('withdrawDone')}/>) : null}

      {openDialog === 'withdrawDone' ? (<ResultDialog title="회원 탈퇴" message="정상적으로 탈퇴 되었습니다." onClose={leaveToLanding}/>) : null}

      {openDialog === 'logoutDone' ? (<ResultDialog title="로그아웃" message="정상적으로 로그아웃 되었습니다." onClose={leaveToLanding}/>) : null}
    </div>);
}
