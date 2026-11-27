import { useState } from 'react';
import { useNavigate } from 'react-router';
import bambooBackground from '@/assets/wish/bamboo/bamboo-bg.png';
import { PageHeader } from '@/components/wish/layout/PageHeader';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { BambooComposer } from './BambooComposer';
import { BambooStateDialog } from './BambooStateDialog';
import { BambooTermsDialog } from './BambooTermsDialog';
import { BambooNicknameDialog } from './BambooNicknameDialog';
import { BambooMessageList } from './BambooMessageList';
import { BambooReportDialog } from './BambooReportDialog';
import { useCreateBambooMessage } from '../hooks/useCreateBambooMessage';
import { useBambooMessages } from '../hooks/useBambooMessages';
import { useReportBambooMessage } from '../hooks/useReportBambooMessage';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { BambooProfanityError, BambooSpamError, containsBambooProfanity, containsBambooSpam, } from '../lib/profanity';
function getMessageError(error) {
    if (error instanceof BambooProfanityError || error instanceof BambooSpamError)
        return error.message;
    if (error instanceof ApiError) {
        if (error.status === 0)
            return '네트워크 연결을 확인하고 다시 시도해주세요.';
        if (error.status === 401)
            return '로그인이 만료되었습니다. 다시 로그인해주세요.';
        if (error.code === 'SCHOOL_VERIFICATION_REQUIRED')
            return '학생 인증 후 이용해주세요.';
        if (error.status === 403)
            return '현재 메시지를 작성할 수 없습니다.';
        if (error.status === 409)
            return '대나무숲 운영 상태가 변경되었습니다. 다시 확인해주세요.';
        if (error.status === 429)
            return '메시지 전송 요청이 많습니다. 잠시 후 다시 시도해주세요.';
        if (error.status === 400)
            return error.message;
    }
    return '메시지를 전송하지 못했습니다. 잠시 후 다시 시도해주세요.';
}
function getReportError(error) {
    if (error instanceof ApiError) {
        if (error.status === 0)
            return '네트워크 연결을 확인하고 다시 시도해주세요.';
        if (error.status === 401)
            return '로그인이 만료되었습니다. 다시 로그인해주세요.';
        if (error.code === 'BAMBOO_ALREADY_REPORTED')
            return '이미 신고한 채팅입니다.';
        if (error.code === 'BAMBOO_SELF_REPORT_NOT_ALLOWED')
            return '본인이 작성한 채팅은 신고할 수 없습니다.';
        if (error.status === 403)
            return '현재 신고할 수 없는 채팅입니다.';
        if (error.status === 404)
            return '신고할 채팅을 찾을 수 없습니다.';
        if (error.status === 429)
            return '신고 요청이 많습니다. 잠시 후 다시 시도해주세요.';
        if (error.status === 400)
            return error.message;
    }
    return '신고를 접수하지 못했습니다. 잠시 후 다시 시도해주세요.';
}
/** 공개 후 대나무숲 기능이 표시될 자리다. */
export function BambooReleased({ readOnly = false, blockedState, existingNickname, onNicknameAlreadySet, sessionVersion, }) {
    const navigate = useNavigate();
    const [hasAgreed, setHasAgreed] = useState(false);
    const [savedNickname, setSavedNickname] = useState(null);
    const [messageError, setMessageError] = useState(null);
    const [reportNotice, setReportNotice] = useState(null);
    const [reportTarget, setReportTarget] = useState(null);
    const [pendingMessage, setPendingMessage] = useState(null);
    const createMessage = useCreateBambooMessage();
    const reportMessage = useReportBambooMessage();
    const nickname = existingNickname || savedNickname;
    const messageStream = useBambooMessages(Boolean(nickname) && !blockedState, sessionVersion);
    async function sendMessage(content) {
        try {
            if (containsBambooSpam(content))
                throw new BambooSpamError();
            if (containsBambooProfanity(content))
                throw new BambooProfanityError();
            setPendingMessage({
                id: -1,
                mine: true,
                anonName: nickname ?? undefined,
                content,
                status: 'VISIBLE',
                createdAt: new Date().toISOString(),
            });
            const message = await createMessage.mutateAsync(content);
            messageStream.appendMessage(message);
        }
        catch (error) {
            setMessageError(getMessageError(error));
            throw error;
        }
        finally {
            setPendingMessage(null);
        }
    }
    async function submitReport(reason) {
        const messageId = reportTarget?.id;
        if (!messageId)
            return;
        try {
            await reportMessage.mutateAsync({ messageId, reason });
            setReportTarget(null);
            setReportNotice({ title: '채팅 신고', message: '신고가 접수되었습니다.' });
        }
        catch (error) {
            setReportTarget(null);
            setReportNotice({ title: '채팅 신고', message: getReportError(error) });
        }
    }
    return (<main className="relative isolate flex h-dvh max-h-dvh flex-col overflow-hidden bg-black">
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full bg-cover bg-center max-[480px]:h-[110%]" style={{ backgroundImage: `url(${bambooBackground})` }}/>
      <PageHeader title="대나무숲" onBack={() => navigate(ROUTES.HOME)} className="z-10 min-h-[63px] shrink-0 border-b border-white/[0.17] shadow-none"/>

      <section aria-label="채팅 목록" className="flex min-h-0 flex-1 overflow-hidden">
        {nickname && (<BambooMessageList messages={pendingMessage ? [...messageStream.messages, pendingMessage] : messageStream.messages} pendingMessageId={pendingMessage?.id} isLoading={messageStream.isLoadingInitialMessages} error={messageStream.initialError} hasOlderMessages={messageStream.hasOlderMessages} isLoadingOlderMessages={messageStream.isLoadingOlderMessages} onRetry={() => void messageStream.refetchInitialMessages()} onLoadOlder={messageStream.loadOlderMessages} onReportMessage={setReportTarget}/>)}
      </section>

      {readOnly && <p className="px-4 py-2 font-body text-sm text-white">현재 읽기 전용입니다.</p>}
      <BambooComposer disabled={readOnly || !nickname || Boolean(blockedState)} isSending={createMessage.isPending} onLengthExceeded={(maxLength) => setMessageError(`메시지는 ${maxLength}자 이내로 작성해주세요.`)} onSend={sendMessage}/>
      {!hasAgreed && !blockedState && (<BambooTermsDialog onAgree={() => setHasAgreed(true)} onClose={() => navigate(ROUTES.HOME)}/>)}
      {blockedState && (<BambooStateDialog {...blockedState} onClose={() => navigate(ROUTES.HOME)}/>)}
      {hasAgreed && !nickname && !blockedState && (<BambooNicknameDialog onComplete={setSavedNickname} onClose={() => navigate(ROUTES.HOME)} onNicknameAlreadySet={onNicknameAlreadySet ?? (async () => false)}/>)}
      {messageError && (<BambooStateDialog title="메시지 전송" message={messageError} actionLabel="확인" onAction={() => setMessageError(null)} onClose={() => setMessageError(null)}/>)}
      {reportTarget && (<BambooReportDialog message={reportTarget} isSubmitting={reportMessage.isPending} onSubmit={(reason) => void submitReport(reason)} onClose={() => {
                reportMessage.reset();
                setReportTarget(null);
            }}/>)}
      {reportNotice && (<BambooStateDialog title={reportNotice.title} message={reportNotice.message} actionLabel="확인" onAction={() => setReportNotice(null)} onClose={() => setReportNotice(null)}/>)}
    </main>);
}
