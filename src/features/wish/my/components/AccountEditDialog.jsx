import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';
import stepDots from '@/assets/wish/my/step-dots.svg';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { useChangePassword } from '../hooks/useChangePassword';
import { useEmailChange } from '../hooks/useEmailChange';
import { validateAccountEdit } from '../lib/accountEdit';
import { DialogFrame } from './DialogFrame';
import { DialogOverlay } from './DialogOverlay';
const PASSWORD_HINT = '*8-20자 영문 대소문자, 숫자, 특수문자 포함';
/**
 * 정보 수정 2단계 — 이메일 변경 · 비밀번호 변경 (Figma 1233:3825)
 *
 * 디자인의 입력칸 두 개는 API 규약에 맞춰 현재 비밀번호 / 새 비밀번호로 쓴다.
 */
export function AccountEditDialog({ onBack, onClose, onCompleted, onPasswordChanged, }) {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [notice, setNotice] = useState(null);
    const [validationError, setValidationError] = useState(null);
    const { send, confirm, apply, cooldownSeconds, reset } = useEmailChange();
    const changePassword = useChangePassword();
    const failure = [send.error, confirm.error, apply.error, changePassword.error].find(Boolean);
    const errorMessage = validationError ??
        (failure instanceof ApiError ? failure.message : failure ? '요청을 처리하지 못했습니다.' : null);
    const isBusy = send.isPending || confirm.isPending || apply.isPending || changePassword.isPending;
    const handleSend = () => {
        setNotice(null);
        setValidationError(null);
        confirm.reset();
        apply.reset();
        send.mutate(email.trim(), { onSuccess: () => setNotice('인증번호를 발송했습니다.') });
    };
    const handleSubmit = async () => {
        setNotice(null);
        const error = validateAccountEdit({ email, code, currentPassword, newPassword });
        setValidationError(error);
        if (error)
            return;
        send.reset();
        confirm.reset();
        apply.reset();
        changePassword.reset();
        try {
            if (email.trim() && code.trim()) {
                await confirm.mutateAsync({ email: email.trim(), code: code.trim() });
                await apply.mutateAsync(email.trim());
            }
            if (currentPassword && newPassword) {
                await changePassword.mutateAsync({ currentPassword, newPassword });
                onPasswordChanged();
                return;
            }
            onCompleted();
        }
        catch {
            // 실패 내용은 각 mutation의 오류 상태에서 표시한다.
        }
    };
    const fieldClass = 'absolute h-[12.723cqw] w-[57.252cqw] rounded-[1.018cqw] border border-green bg-white px-[4.325cqw] text-[3.562cqw] text-green placeholder:text-gray-02';
    const labelClass = 'absolute left-[4.198cqw] w-[16.285cqw] text-center text-[3.817cqw] leading-[1.15] font-semibold text-purple';
    const hintClass = 'absolute left-[22.01cqw] text-[3.053cqw] text-gray-04';
    return (<DialogOverlay onClose={onClose}>
      <div className="relative">
        <DialogFrame title="정보 수정" height="156.743cqw" onClose={onClose}>
          {/* 변경할 E-mail */}
          <span className={`${labelClass} top-[44.275cqw]`}>
            변경할
            <br /> E- mail
          </span>
          <input type="email" aria-label="변경할 이메일" value={email} onChange={(event) => {
            setEmail(event.target.value);
            setCode('');
            setNotice(null);
            setValidationError(null);
            reset();
        }} disabled={isBusy} className={`${fieldClass} top-[44.02cqw] left-[23.282cqw]`}/>

          {/* 인증번호 + 재전송 */}
          <span className={`${labelClass} top-[62.087cqw]`}>E- mail 인증번호</span>
          <input inputMode="numeric" aria-label="이메일 인증번호" value={code} onChange={(event) => setCode(event.target.value)} disabled={isBusy} className={`${fieldClass} top-[61.832cqw] left-[23.282cqw] pr-[18.066cqw]`}/>
          <button type="button" onClick={handleSend} disabled={!email.trim() || isBusy || cooldownSeconds !== null} className="absolute top-[64.122cqw] left-[62.977cqw] flex h-[8.142cqw] items-center justify-center rounded-[1.018cqw] bg-gray-04 px-[2.545cqw] text-[3.562cqw] text-white disabled:opacity-60">
            {cooldownSeconds !== null ? `${cooldownSeconds}초` : '재전송'}
          </button>

          {/* 현재 비밀번호 */}
          <span className={`${labelClass} top-[79.898cqw]`}>
            현재
            <br />
            비밀번호
          </span>
          <input type="password" aria-label="현재 비밀번호" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} disabled={isBusy} className={`${fieldClass} top-[79.644cqw] left-[23.537cqw]`}/>
          <p className={`${hintClass} top-[93.893cqw]`}>{PASSWORD_HINT}</p>

          {/* 새 비밀번호 */}
          <span className={`${labelClass} top-[105.089cqw]`}>
            새<br />
            비밀번호
          </span>
          <input type="password" aria-label="새 비밀번호" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} disabled={isBusy} className={`${fieldClass} top-[104.835cqw] left-[23.537cqw]`}/>
          <p className={`${hintClass} top-[119.084cqw]`}>{PASSWORD_HINT}</p>

          {errorMessage ? (<p className="absolute top-[126cqw] left-1/2 w-[76.336cqw] -translate-x-1/2 text-center text-[3.053cqw] text-red">
              {errorMessage}
            </p>) : null}

          <img src={stepDots} alt="" aria-hidden className="absolute top-[129.517cqw] left-[40.331cqw] h-[2.036cqw] w-[4.835cqw] scale-x-[-1]"/>

          <button type="button" onClick={onBack} className="absolute top-[136.641cqw] left-[5.725cqw] flex h-[12.723cqw] w-[30.534cqw] items-center justify-center gap-[1cqw] rounded-full bg-gray-02 text-[3.562cqw] font-medium text-white">
            <IconChevronLeft aria-hidden className="size-[6.107cqw]"/>
            이전
          </button>
          <button type="button" onClick={() => void handleSubmit()} disabled={isBusy} className="absolute top-[136.641cqw] left-[49.237cqw] flex h-[12.723cqw] w-[30.534cqw] items-center justify-center gap-[1cqw] rounded-full bg-blue text-[3.562cqw] font-medium text-white disabled:opacity-60">
            완료
            <IconChevronRight aria-hidden className="size-[6.107cqw]"/>
          </button>
        </DialogFrame>

        {/* 박스 아래 상태 문구 (Figma 1233:4074) */}
        {notice ? (<p className="absolute top-[160.814cqw] left-1/2 w-[85.496cqw] -translate-x-1/2 text-center text-[4.071cqw] font-medium text-white [text-shadow:0_0_4px_#0CB000]">
            {notice}
          </p>) : null}
      </div>
    </DialogOverlay>);
}
