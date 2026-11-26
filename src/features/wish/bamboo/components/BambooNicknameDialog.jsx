import { useEffect, useId, useRef, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { BambooSpamError, containsBambooProfanity, containsBambooSpam } from '../lib/profanity';
import { BambooStateDialog } from './BambooStateDialog';
import { useBambooNickname } from '../hooks/useBambooNickname';
import { openWishDialog } from '@/components/wish/feedback/openWishDialog';
function getNicknameError(error) {
    if (error instanceof ApiError) {
        if (error.status === 0)
            return '네트워크 연결을 확인하고 다시 시도해주세요.';
        if (error.status === 401)
            return '로그인이 만료되었습니다. 다시 로그인해주세요.';
        if (error.code === 'SCHOOL_VERIFICATION_REQUIRED')
            return '학생 인증 후 이용해주세요.';
        if (error.code === 'BAMBOO_NICKNAME_ALREADY_SET')
            return '닉네임은 한 번만 정할 수 있습니다.';
        if (error.status === 409)
            return '이미 사용 중이거나 설정된 닉네임입니다. 다시 확인해주세요.';
        if (error.status === 400)
            return '사용할 수 없는 닉네임입니다. 다른 닉네임을 입력해주세요.';
        if (error.status === 403)
            return '현재 닉네임을 설정할 수 없습니다.';
        if (error.status === 429)
            return '요청이 많습니다. 잠시 후 다시 시도해주세요.';
    }
    return '닉네임 요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.';
}
export function BambooNicknameDialog({ onComplete, onClose, onNicknameAlreadySet, }) {
    const dialogRef = useRef(null);
    const busyRef = useRef(false);
    const titleId = useId();
    const inputId = useId();
    const hintId = useId();
    const [nickname, setNickname] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const { suggest, claim } = useBambooNickname();
    const busy = suggest.isPending || claim.isPending;
    useEffect(() => {
        const dialog = dialogRef.current;
        return openWishDialog(dialog);
    }, [errorMessage]);
    async function generateNickname() {
        if (busyRef.current)
            return;
        busyRef.current = true;
        setErrorMessage(null);
        try {
            setNickname(await suggest.mutateAsync());
        }
        catch (cause) {
            setErrorMessage(getNicknameError(cause));
        }
        finally {
            busyRef.current = false;
        }
    }
    async function submitNickname() {
        if (busyRef.current || !nickname.trim())
            return;
        busyRef.current = true;
        setErrorMessage(null);
        try {
            if (containsBambooSpam(nickname)) {
                setErrorMessage(new BambooSpamError().message);
                return;
            }
            if (containsBambooProfanity(nickname)) {
                setErrorMessage('닉네임에 사용할 수 없는 표현이\n포함되어 있습니다.');
                return;
            }
            const savedNickname = await claim.mutateAsync(nickname.trim());
            onComplete(savedNickname);
        }
        catch (cause) {
            if (cause instanceof ApiError && cause.code === 'BAMBOO_NICKNAME_ALREADY_SET') {
                try {
                    if (await onNicknameAlreadySet())
                        return;
                }
                catch {
                    setErrorMessage('닉네임 상태를 다시 확인하지 못했습니다. 잠시 후 다시 시도해주세요.');
                    return;
                }
            }
            setErrorMessage(getNicknameError(cause));
        }
        finally {
            busyRef.current = false;
        }
    }
    if (errorMessage) {
        return (<BambooStateDialog title="닉네임 설정" message={errorMessage} actionLabel="다시 설정" onAction={() => setErrorMessage(null)} onClose={onClose}/>);
    }
    return (<dialog ref={dialogRef} aria-labelledby={titleId} onCancel={(event) => {
            event.preventDefault();
            if (!busyRef.current)
                onClose();
        }} className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-56px)] max-w-[336px] overflow-y-auto rounded-md bg-white px-7 pt-6 pb-7 text-gray-04 backdrop:bg-black/10 backdrop:backdrop-blur-[5px]">
      <button type="button" aria-label="닉네임 설정 취소하고 홈으로 이동" disabled={busy} onClick={onClose} className="absolute top-1 right-1 flex size-11 items-center justify-center text-gray-01 disabled:opacity-50">
        <IconX size={24} aria-hidden="true"/>
      </button>
      <h2 id={titleId} className="text-center font-display text-base font-medium text-blue">
        [ 닉네임 설정 ]
      </h2>
      <form className="mt-7 font-body" aria-busy={busy} onSubmit={(event) => {
            event.preventDefault();
            void submitNickname();
        }}>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3">
          <label htmlFor={inputId} className="text-sm text-purple">
            닉네임
          </label>
          <input id={inputId} value={nickname} required disabled={busy} autoComplete="off" aria-describedby={hintId} placeholder="닉네임 입력하기" onChange={(event) => {
            setNickname(event.target.value);
            setErrorMessage(null);
        }} className="min-h-12 min-w-0 rounded border border-gray-01 px-3 text-base text-black placeholder:text-gray-02 focus-visible:outline-2 focus-visible:outline-blue disabled:opacity-50"/>
          <button type="button" disabled={busy} onClick={() => void generateNickname()} className="col-start-2 min-h-11 rounded bg-gray-04 px-2 text-sm text-white disabled:opacity-50">
            {suggest.isPending ? '생성 중…' : '닉네임 랜덤 자동생성'}
          </button>
        </div>
        <p id={hintId} className="mt-4 text-xs leading-relaxed">
          닉네임은 한 번 설정하면 변경할 수 없습니다.
        </p>
        <button type="submit" disabled={busy || !nickname.trim()} className="mt-7 min-h-12 w-full rounded-full bg-blue px-4 text-sm font-medium text-white disabled:opacity-50">
          {claim.isPending ? '저장 중…' : '확인'}
        </button>
      </form>
    </dialog>);
}
