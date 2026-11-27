import { useState } from 'react';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { useWithdraw } from '../hooks/useWithdraw';
import { DialogFrame } from './DialogFrame';
import { DialogOverlay } from './DialogOverlay';
/** 백엔드 문서(docs/frontend-user-api.md)가 삭제 전 노출을 요구하는 문구 */
const CONFIRM_MESSAGE = {
    festival: '축제 서비스 이용 정보를 삭제할까요? SSO 계정은 유지됩니다. 대나무숲·생일 쪽지·분실물의 작성자 정보와 투표 응답의 계정 연결은 익명화되지만, 본문과 일부 운영 기록은 남습니다. 삭제한 이용 정보는 복구되지 않습니다.',
    sso: '삼육멋사 SSO 계정까지 탈퇴할까요? 축제 이용 정보가 삭제·익명화되고 SSO 계정도 함께 탈퇴됩니다. 탈퇴한 축제 활동 내역은 복구되지 않습니다.',
};
/** 회원 탈퇴 (Figma 1297:4798) */
export function WithdrawDialog({ onClose, onCompleted }) {
    const [scope, setScope] = useState(null);
    const withdraw = useWithdraw();
    const handleConfirm = () => {
        if (!scope)
            return;
        withdraw.mutate(scope, { onSuccess: onCompleted });
    };
    if (scope) {
        return (<DialogOverlay onClose={onClose}>
        <DialogFrame title="회원 탈퇴" height="100cqw" onClose={onClose}>
          <p className="absolute top-[39.44cqw] left-1/2 w-[72.774cqw] -translate-x-1/2 text-center text-[3.053cqw] leading-[1.6] text-gray-04">
            {CONFIRM_MESSAGE[scope]}
          </p>

          {withdraw.isError ? (<p className="absolute top-[68cqw] left-1/2 w-[72.774cqw] -translate-x-1/2 text-center text-[3.053cqw] text-red">
              {withdraw.error instanceof ApiError
                    ? withdraw.error.message
                    : '탈퇴를 처리하지 못했습니다.'}
            </p>) : null}

          <button type="button" onClick={handleConfirm} disabled={withdraw.isPending} className="absolute top-[73cqw] left-[9.924cqw] h-[12.723cqw] w-[65.394cqw] rounded-[14.249cqw] bg-blue text-[4.071cqw] font-medium text-white disabled:opacity-60">
            {withdraw.isPending ? '처리 중…' : '탈퇴하기'}
          </button>
          <button type="button" onClick={() => setScope(null)} className="absolute top-[89cqw] left-1/2 -translate-x-1/2 text-[3.053cqw] font-medium text-gray-04 underline">
            취소
          </button>
        </DialogFrame>
      </DialogOverlay>);
    }
    return (<DialogOverlay onClose={onClose}>
      <DialogFrame title="회원 탈퇴" height="79.135cqw" onClose={onClose}>
        <button type="button" onClick={() => setScope('festival')} className="absolute top-[43.511cqw] left-[9.924cqw] h-[12.723cqw] w-[65.394cqw] rounded-[14.249cqw] bg-blue text-[4.071cqw] font-medium text-white">
          축제 홈페이지 탈퇴
        </button>
        <button type="button" onClick={() => setScope('sso')} className="absolute top-[61.832cqw] left-1/2 -translate-x-1/2 text-[3.053cqw] font-medium text-gray-04 underline">
          삼육멋사 SSO 탈퇴
        </button>
      </DialogFrame>
    </DialogOverlay>);
}
