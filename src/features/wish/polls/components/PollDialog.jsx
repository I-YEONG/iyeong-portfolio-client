import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import closeIcon from '@/assets/wish/polls/close.svg';
import badge from '@/assets/wish/polls/question-badge.svg';
import choiceCircle from '@/assets/wish/polls/choice-circle.svg';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { usePollSubmission } from '../hooks/usePollSubmission';
import { pollKeys, usePollResults } from '../hooks/usePollQueries';
import { canSubmit, isTopResult, serializeAnswers } from '../lib/polls';
const focusableSelector = 'button:not(:disabled), a[href], input:not(:disabled), textarea:not(:disabled), [tabindex="0"]';
function QuestionHeading({ question, index }) {
    return (<div className="flex items-center gap-2 font-display text-[14px] font-medium text-purple">
      <span className="relative grid size-5 shrink-0 place-items-center text-[12px] font-semibold text-[#1449b0]">
        <img src={badge} alt="" className="absolute inset-0"/>
        <span className="relative">{index + 1}</span>
      </span>
      <span className="min-w-0 break-words">
        {index + 1}. {question.text}
        {question.required && <span className="sr-only"> 필수</span>}
      </span>
    </div>);
}
function QuestionMedia({ question }) {
    return (question.media ?? [])
        .filter((item) => item.url)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((item) => item.kind === 'IMAGE' ? (<img key={item.id} src={item.url} alt={item.originalFilename || ''} className="mt-2 h-auto max-w-full rounded"/>) : (<video key={item.id} src={item.url} controls preload="metadata" aria-label={item.originalFilename || '질문 동영상'} className="mt-2 max-w-full rounded"/>));
}
function VoteQuestion({ question, index, value, error, onChange, }) {
    const isText = question.type === 'SHORT_TEXT' || question.type === 'LONG_TEXT';
    return (<fieldset className="relative min-w-0 rounded-[4px] border border-gray-01 px-3 py-3">
      <legend className="sr-only">{question.text}</legend>
      <QuestionHeading question={question} index={index}/>
      <QuestionMedia question={question}/>
      {isText ? (<textarea aria-label={question.text} aria-invalid={Boolean(error)} aria-describedby={error ? `poll-error-${question.id}` : undefined} placeholder="의견을 입력하세요." maxLength={question.type === 'SHORT_TEXT' ? 500 : 5000} value={value.text} onChange={(event) => onChange({ ...value, text: event.target.value })} rows={question.type === 'SHORT_TEXT' ? 3 : 6} className="mt-4 block min-h-[79px] w-full resize-y rounded-[4px] border border-[#e8eaf2] bg-[#f8f9fc] p-2 font-display text-[14px] text-purple placeholder:text-gray-02"/>) : (<div className="mt-3 space-y-2">
          {question.options.map((option, optionIndex) => {
                const checked = value.optionIds.includes(option.id);
                return (<label key={option.id} className={`relative flex min-h-[35px] cursor-pointer items-center gap-2 rounded-[4px] border border-[#e8eaf2] bg-[#f8f9fc] px-2 font-display text-[14px] text-gray-04 ${checked ? 'border-blue text-purple' : ''}`}>
                <input type={question.type === 'SINGLE_CHOICE' ? 'radio' : 'checkbox'} name={`question-${question.id}`} checked={checked} aria-invalid={Boolean(error)} onChange={() => onChange({
                        ...value,
                        optionIds: question.type === 'SINGLE_CHOICE'
                            ? [option.id]
                            : checked
                                ? value.optionIds.filter((id) => id !== option.id)
                                : [...value.optionIds, option.id],
                    })} className="peer sr-only"/>
                <span className="relative grid size-[18px] shrink-0 place-items-center rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-blue">
                  <img src={choiceCircle} alt=""/>
                  {checked && <span className="absolute size-2 rounded-full bg-blue"/>}
                </span>
                <span className="min-w-0 break-words">
                  {optionIndex + 1}. {option.text}
                </span>
                {option.imageUrl && (<img src={option.imageUrl} alt="" className="ml-auto max-h-16 max-w-16 rounded object-contain"/>)}
              </label>);
            })}
        </div>)}
      {error && (<p id={`poll-error-${question.id}`} role="alert" className="mt-2 font-body text-[12px] text-red">
          {error}
        </p>)}
    </fieldset>);
}
function ResultsContent({ results }) {
    return (<div className="space-y-[10px]">
      <p className="font-body text-[12px] text-gray-04">전체 제출 {results.submissionCount}건</p>
      {results.questions.map((question, index) => (<section key={question.questionId} className="min-w-0 rounded-[4px] border border-gray-01 px-3 py-3">
          <div className="flex items-center gap-2 font-display text-[14px] font-medium text-purple">
            <span className="relative grid size-5 shrink-0 place-items-center text-[12px] font-semibold text-[#1449b0]">
              <img src={badge} alt="" className="absolute inset-0"/>
              <span className="relative">{index + 1}</span>
            </span>
            <h3 className="min-w-0 break-words">
              {index + 1}. {question.text}
            </h3>
          </div>
          <p className="mt-1 font-body text-[12px] text-gray-04">
            이 질문 응답 {question.answeredCount}건
          </p>
          {question.options.length ? (<div className="mt-3 space-y-2">
              {question.options.map((option, optionIndex) => {
                    const top = isTopResult(option, question.options);
                    const fill = Math.max(0, Math.min(100, option.percentage));
                    return (<div key={option.optionId} className="relative min-h-[35px] overflow-hidden rounded-[4px] bg-gray-01">
                    <div className={`absolute inset-y-0 left-0 rounded-[4px] ${top ? 'bg-blue' : 'bg-[#adb9cc]'}`} style={{ width: `${fill}%` }}/>
                    <div className="relative flex min-h-[35px] items-center justify-between gap-2 px-2 font-display text-[14px]">
                      <span className="min-w-0 break-words text-gray-04">
                        {optionIndex + 1}. {option.text}
                        {option.imageUrl && (<img src={option.imageUrl} alt="" className="ml-2 inline-block max-h-8 max-w-8 object-contain"/>)}
                      </span>
                      <span className={`shrink-0 font-semibold ${top ? 'text-blue' : 'text-gray-04'}`}>
                        {option.percentage}%
                      </span>
                    </div>
                    {top && (<div aria-hidden="true" className="pointer-events-none absolute inset-0 flex min-h-[35px] items-center justify-between gap-2 overflow-hidden px-2 font-display text-[14px] text-white" style={{ clipPath: `inset(0 ${100 - fill}% 0 0)` }}>
                        <span className="min-w-0 break-words">
                          {optionIndex + 1}. {option.text}
                          {option.imageUrl && (<img src={option.imageUrl} alt="" className="ml-2 inline-block max-h-8 max-w-8 object-contain"/>)}
                        </span>
                        <span className="shrink-0 font-semibold">{option.percentage}%</span>
                      </div>)}
                  </div>);
                })}
            </div>) : null}
          {question.textAnswers.length ? (<ul className="mt-3 space-y-2">
              {question.textAnswers.map((answer, answerIndex) => (<li key={`${answer.submittedAt}:${answerIndex}`} className="rounded bg-[#f8f9fc] p-2 font-display text-[14px] break-words whitespace-pre-wrap text-gray-04">
                  {answer.text}
                </li>))}
            </ul>) : null}
          {!question.options.length && !question.textAnswers.length && (<p className="mt-3 font-body text-[13px] text-gray-04">아직 응답이 없습니다.</p>)}
        </section>))}
    </div>);
}
export function PollDialog({ poll, sessionVersion, initialMode, onClose, }) {
    const client = useQueryClient();
    const navigate = useNavigate();
    const mode = initialMode === 'results' && (poll.resultAvailable || poll.state === 'ENDED')
        ? 'results'
        : 'vote';
    const [draft, setDraft] = useState({});
    const [errors, setErrors] = useState({});
    const [viewport, setViewport] = useState({ height: document.querySelector('.wish-screen')?.clientHeight ?? 600, top: 0 });
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const results = usePollResults(poll.id, sessionVersion, mode === 'results' && poll.resultAvailable);
    const blocked = useCallback(() => {
        void client.invalidateQueries({ queryKey: pollKeys.detail(sessionVersion, poll.id) });
    }, [client, poll.id, sessionVersion]);
    const verificationRequired = useCallback(() => navigate(ROUTES.MY), [navigate]);
    const submission = usePollSubmission(poll.id, sessionVersion, blocked, verificationRequired);
    useEffect(() => {
        const updateViewport = () => {
            setViewport({ height: document.querySelector('.wish-screen')?.clientHeight ?? 600, top: 0 });
        };
        updateViewport();
        window.visualViewport?.addEventListener('resize', updateViewport);
        window.visualViewport?.addEventListener('scroll', updateViewport);
        window.addEventListener('resize', updateViewport);
        return () => {
            window.visualViewport?.removeEventListener('resize', updateViewport);
            window.visualViewport?.removeEventListener('scroll', updateViewport);
            window.removeEventListener('resize', updateViewport);
        };
    }, []);
    useLayoutEffect(() => {
        const previous = document.activeElement;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus({ preventScroll: true });
        const contain = (event) => {
            if (dialogRef.current &&
                event.target instanceof Node &&
                !dialogRef.current.contains(event.target))
                closeRef.current?.focus({ preventScroll: true });
        };
        document.addEventListener('focusin', contain);
        return () => {
            document.removeEventListener('focusin', contain);
            document.body.style.overflow = originalOverflow;
            if (previous instanceof HTMLElement && previous.isConnected)
                previous.focus({ preventScroll: true });
        };
    }, []);
    useLayoutEffect(() => {
        const dialog = dialogRef.current;
        const active = document.activeElement;
        if (dialog && (!dialog.contains(active) || active?.matches(':disabled')))
            closeRef.current?.focus({ preventScroll: true });
    });
    useLayoutEffect(() => {
        const handleKeyDown = (event) => {
            const dialog = dialogRef.current;
            if (!dialog)
                return;
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
            }
            else if (event.key === 'Tab' &&
                (!dialog.contains(document.activeElement) || document.activeElement?.matches(':disabled'))) {
                const focusable = Array.from(dialog.querySelectorAll(focusableSelector));
                const target = event.shiftKey ? focusable.at(-1) : focusable[0];
                if (target) {
                    event.preventDefault();
                    target.focus({ preventScroll: true });
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    useEffect(() => {
        if (results.error instanceof ApiError &&
            results.error.status === 403 &&
            results.error.code === 'POLL_RESULT_NOT_AVAILABLE') {
            void client.invalidateQueries({ queryKey: pollKeys.detail(sessionVersion, poll.id) });
            void client.invalidateQueries({ queryKey: pollKeys.list(sessionVersion) });
            onClose();
        }
    }, [client, onClose, poll.id, results.error, sessionVersion]);
    useEffect(() => {
        const first = poll.questions.find((question) => errors[question.id]);
        if (first)
            document.getElementById(`poll-error-${first.id}`)?.scrollIntoView({ block: 'nearest' });
    }, [errors, poll.questions]);
    useEffect(() => {
        if (results.error instanceof ApiError &&
            results.error.status === 403 &&
            results.error.code === 'SCHOOL_VERIFICATION_REQUIRED')
            navigate(ROUTES.MY);
    }, [navigate, results.error]);
    const handleSubmit = () => {
        if (!canSubmit(poll) || submission.status === 'sending' || submission.status === 'success')
            return;
        const serialized = serializeAnswers(poll.questions, draft);
        setErrors(serialized.errors);
        if (!serialized.valid) {
            return;
        }
        void submission.submit(serialized.answers);
    };
    return createPortal(<div className="absolute right-0 left-0 z-50 flex items-center justify-center bg-black/50 px-3 py-[max(12px,env(safe-area-inset-top))] pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-[5px]" style={{ top: viewport.top, height: viewport.height }}>
      <button type="button" aria-label="투표 창 바깥에서 닫기" tabIndex={-1} className="absolute inset-0" onClick={onClose}/>
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="poll-dialog-title" onKeyDown={(event) => {
            if (event.key !== 'Tab')
                return;
            const focusable = Array.from(dialogRef.current?.querySelectorAll(focusableSelector) ?? []);
            const first = focusable[0], last = focusable.at(-1);
            if (!first || !last)
                return;
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            }
            if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }} className="relative flex w-full max-w-[336px] min-w-0 flex-col overflow-clip rounded-[8px] bg-white text-purple shadow-xl" style={{
            maxHeight: `min(80%, calc(100% - 24px - env(safe-area-inset-top) - env(safe-area-inset-bottom)))`,
        }}>
        {/* 배너 API 필드는 아직 계약되지 않았다. 디자인 크기의 빈 회색 영역을 유지한다. */}
        <div className={`relative shrink-0 bg-gray-01 ${viewport.height < 300 ? 'h-[42px]' : viewport.height <= 600 ? 'h-[72px]' : mode === 'vote' && poll.questions.some((question) => question.type.includes('CHOICE')) ? 'h-[132px]' : 'h-[137px]'}`}>
          <button ref={closeRef} type="button" aria-label="닫기" onClick={onClose} className="absolute top-1 right-1 grid size-[38px] place-items-center">
            <img src={closeIcon} alt=""/>
          </button>
        </div>
        <div className={`min-h-0 overflow-y-auto overscroll-contain px-[9px] ${viewport.height < 300 ? 'pt-1 pb-1' : 'pt-3 pb-4'}`}>
          <h2 id="poll-dialog-title" className="text-center font-display text-[20px] font-semibold break-words">
            {poll.title}
          </h2>
          {poll.description && (<p className="mt-2 text-center font-display text-[14px] break-words whitespace-pre-wrap text-gray-04">
              {poll.description}
            </p>)}
          <div className="mt-4">
            {mode === 'results' ? (!poll.resultAvailable ? (<p role="status" className="text-center font-body text-[14px] text-gray-04">
                  투표가 마감되었습니다. 결과 공개를 기다려 주세요.
                </p>) : results.isPending ? (<p role="status">결과를 불러오는 중입니다.</p>) : results.isError ? (<p role="alert">
                  결과를 불러오지 못했습니다.{' '}
                  <button className="underline" onClick={() => void results.refetch()}>
                    다시 시도
                  </button>
                </p>) : (results.data && <ResultsContent results={results.data}/>)) : !canSubmit(poll) ? (<p className="text-center font-body text-[14px] text-gray-04">
                {poll.state === 'UPCOMING'
                ? '투표가 아직 시작되지 않았습니다.'
                : poll.hasSubmitted
                    ? '이미 참여한 투표입니다.'
                    : '마감된 투표입니다.'}
              </p>) : (<div className="space-y-[10px]">
                {poll.questions.map((question, index) => (<VoteQuestion key={question.id} question={question} index={index} value={draft[question.id] ?? { optionIds: [], text: '' }} error={errors[question.id]} onChange={(value) => {
                    setDraft((current) => ({ ...current, [question.id]: value }));
                    setErrors((current) => ({ ...current, [question.id]: '' }));
                }}/>))}
              </div>)}
          </div>
          <p aria-live="polite" className="mt-3 text-center font-body text-[13px] text-gray-04">
            {submission.message}
          </p>
          {submission.status === 'unresolved' && (<div className="mt-2 flex justify-center gap-2 font-body text-[12px]">
              <button type="button" className="rounded bg-blue px-2 py-1 text-white" onClick={() => void submission.verify()}>
                제출 내역 다시 확인
              </button>
              <button type="button" className="rounded border border-blue px-2 py-1 text-blue" onClick={submission.reset}>
                직접 재시도
              </button>
            </div>)}
        </div>
        {mode === 'vote' && canSubmit(poll) && submission.status !== 'success' && (<div className={`shrink-0 bg-white text-center ${viewport.height < 300 ? 'px-2 py-0' : 'px-3 pt-2 pb-3'}`}>
            <button type="button" disabled={submission.status === 'sending' || submission.status === 'unresolved'} onClick={handleSubmit} className={`rounded-[4px] bg-blue px-[14px] font-display text-[16px] font-semibold text-white disabled:opacity-50 ${viewport.height < 300 ? 'min-h-8' : 'min-h-11'}`}>
              {submission.status === 'sending' ? '확인 중...' : '투표하기'}
            </button>
          </div>)}
      </section>
    </div>, document.querySelector('.wish-screen'));
}
