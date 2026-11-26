import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import styles from './bamboo-message-list.module.css';
const messageTimeFormatter = new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
});
function formatMessageTime(createdAt) {
    if (!createdAt)
        return '';
    const date = new Date(createdAt);
    if (Number.isNaN(date.getTime()))
        return '';
    return messageTimeFormatter.format(date);
}
function getMessageContent(message) {
    if (message.status === 'DELETED')
        return '삭제된 메시지입니다.';
    if (message.status === 'BLOCKED')
        return '관리자에 의해 차단된 메시지입니다.';
    return message.content ?? '';
}
function isSameMessageAuthor(left, right) {
    if (!left || left.mine !== right.mine)
        return false;
    return left.mine === true || left.anonName === right.anonName;
}
function canReportMessage(message) {
    const status = message.status ?? 'VISIBLE';
    return (message.mine !== true &&
        Boolean(message.id && message.id > 0) &&
        (status === 'VISIBLE' || status === 'HIDDEN'));
}
/** 스크롤 위치를 보존하면서 과거·신규 메시지를 보여주는 채팅 목록이다. */
export function BambooMessageList({ messages, pendingMessageId, isLoading, error, hasOlderMessages, isLoadingOlderMessages, onRetry, onLoadOlder, onReportMessage, }) {
    const listRef = useRef(null);
    const longPressTimerRef = useRef(null);
    const longPressPointerRef = useRef(null);
    const didLoadInitialMessages = useRef(false);
    const previousMessageCount = useRef(0);
    const wasAtBottom = useRef(true);
    const restoreScroll = useRef(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [revealedHiddenMessageIds, setRevealedHiddenMessageIds] = useState(new Set());
    const scrollToBottom = useCallback(() => {
        const list = listRef.current;
        if (!list)
            return;
        list.scrollTop = list.scrollHeight;
        wasAtBottom.current = true;
        setUnreadCount(0);
    }, []);
    useLayoutEffect(() => {
        const list = listRef.current;
        if (!list)
            return;
        if (restoreScroll.current) {
            const { height, top } = restoreScroll.current;
            list.scrollTop = list.scrollHeight - height + top;
            restoreScroll.current = null;
            previousMessageCount.current = messages.length;
            return;
        }
        if (!didLoadInitialMessages.current && !isLoading) {
            didLoadInitialMessages.current = true;
            previousMessageCount.current = messages.length;
            scrollToBottom();
            return;
        }
        const addedCount = messages.length - previousMessageCount.current;
        if (addedCount > 0) {
            const latestMessage = messages.at(-1);
            if (wasAtBottom.current || latestMessage?.mine)
                scrollToBottom();
            else
                setUnreadCount((count) => count + addedCount);
        }
        previousMessageCount.current = messages.length;
    }, [isLoading, messages, scrollToBottom]);
    async function loadOlderMessages() {
        const list = listRef.current;
        if (!list || isLoadingOlderMessages || !hasOlderMessages)
            return;
        restoreScroll.current = { height: list.scrollHeight, top: list.scrollTop };
        try {
            const loaded = await onLoadOlder();
            if (!loaded)
                restoreScroll.current = null;
        }
        catch {
            restoreScroll.current = null;
        }
    }
    const clearLongPressTimer = useCallback(() => {
        longPressPointerRef.current = null;
        if (longPressTimerRef.current === null)
            return;
        window.clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
    }, []);
    useLayoutEffect(() => clearLongPressTimer, [clearLongPressTimer]);
    function startReportLongPress(message, event) {
        if (!onReportMessage || !canReportMessage(message) || event.pointerType === 'mouse')
            return;
        clearLongPressTimer();
        longPressPointerRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
        longPressTimerRef.current = window.setTimeout(() => {
            clearLongPressTimer();
            window.navigator.vibrate?.(10);
            onReportMessage(message);
        }, 600);
    }
    function handleReportPointerMove(event) {
        const pointer = longPressPointerRef.current;
        if (!pointer || pointer.id !== event.pointerId)
            return;
        // 손가락의 작은 흔들림은 허용하되 스크롤 제스처가 되면 신고를 취소한다.
        if (Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 10) {
            clearLongPressTimer();
        }
    }
    function handleScroll(event) {
        clearLongPressTimer();
        const list = event.currentTarget;
        const atBottom = list.scrollHeight - list.scrollTop - list.clientHeight < 48;
        wasAtBottom.current = atBottom;
        if (atBottom)
            setUnreadCount(0);
        if (list.scrollTop < 48)
            void loadOlderMessages();
    }
    if (isLoading && pendingMessageId === undefined) {
        return (<div className="grid h-full flex-1 place-items-center" role="status">
        <span className="size-8 animate-spin rounded-full border-2 border-white/30 border-t-main-01"/>
      </div>);
    }
    if (error && pendingMessageId === undefined) {
        return (<div className="grid h-full flex-1 place-items-center px-6 text-center font-body text-sm text-white">
        <div>
          <p>메시지를 불러오지 못했습니다.</p>
          <button type="button" onClick={onRetry} className="mt-4 min-h-11 rounded-full bg-blue px-5 text-white">
            다시 시도
          </button>
        </div>
      </div>);
    }
    if (messages.length === 0) {
        return (<div className="grid h-full flex-1 place-items-center px-6 text-center font-body text-sm leading-relaxed text-white">
        아직 메시지가 없습니다.
        <br />첫 번째 이야기를 남겨보세요.
      </div>);
    }
    return (<div className="relative flex min-h-0 flex-1">
      <div ref={listRef} onScroll={handleScroll} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 py-3">
        <div className="flex min-h-full flex-col justify-end gap-3">
          {isLoadingOlderMessages && (<p className="text-center font-body text-xs text-white/70">
              이전 메시지를 불러오는 중…
            </p>)}
          <div className="flex flex-col gap-2">
            {messages.map((message, index) => {
            const mine = message.mine === true;
            const isPending = message.id !== undefined && message.id === pendingMessageId;
            const previousMessage = messages[index - 1];
            const nextMessage = messages[index + 1];
            const isFirstMessageInGroup = !isSameMessageAuthor(previousMessage, message);
            const showMessageTime = !nextMessage || !isSameMessageAuthor(nextMessage, message);
            const content = getMessageContent(message);
            const key = message.id ?? message.seq ?? `${message.createdAt}-${index}`;
            const isHidden = message.status === 'HIDDEN';
            const isReportable = canReportMessage(message);
            const isHiddenContentRevealed = message.id !== undefined && revealedHiddenMessageIds.has(message.id);
            return (<article key={key} className={`group flex w-full flex-col ${mine ? 'items-end' : 'items-start'}`}>
                  {!mine && isFirstMessageInGroup && (<p className="mb-1 px-1 font-body text-sm text-white">
                      {message.anonName ?? '익명'}
                    </p>)}
                  <div className={`${styles.messageRow} ${isReportable && onReportMessage ? styles.reportable : ''}`}>
                  <div onPointerDown={(event) => startReportLongPress(message, event)} onPointerMove={handleReportPointerMove} onPointerUp={clearLongPressTimer} onPointerCancel={clearLongPressTimer} onPointerLeave={clearLongPressTimer} onContextMenu={(event) => {
                    if (!isReportable)
                        return;
                    event.preventDefault();
                }} className={`max-w-[82%] min-w-0 px-4 py-3 font-body text-base leading-relaxed [overflow-wrap:anywhere] [word-break:break-all] whitespace-pre-wrap ${mine ? 'rounded-2xl rounded-br-sm bg-[#F2F4F9] text-black' : 'rounded-2xl rounded-bl-sm bg-blue text-white'} ${message.status !== 'VISIBLE' ? 'opacity-70' : ''} ${isReportable ? 'select-none [-webkit-touch-callout:none]' : ''}`}>
                    {isHidden && !isHiddenContentRevealed ? (<button type="button" onClick={() => {
                        const messageId = message.id;
                        if (messageId === undefined)
                            return;
                        setRevealedHiddenMessageIds((ids) => new Set(ids).add(messageId));
                    }} className="text-left underline underline-offset-4">
                        신고 누적으로 가려진 메시지입니다.
                        <br />
                        내용 보기
                      </button>) : (content)}
                  </div>
                  {isReportable && onReportMessage && (<button type="button" onClick={() => onReportMessage(message)} className={styles.reportButton} aria-label={`${message.anonName ?? '익명'}님의 채팅 신고하기`}>
                      신고하기
                    </button>)}
                  </div>
                  {isPending ? (<p role="status" className="mt-1 px-1 font-body text-[11px] text-white/70">
                      전송 중…
                    </p>) : (showMessageTime && (<time dateTime={message.createdAt} className="mt-1 px-1 font-body text-[11px] text-white/70">
                        {formatMessageTime(message.createdAt)}
                      </time>))}
                </article>);
        })}
          </div>
        </div>
      </div>
      {unreadCount > 0 && (<button type="button" onClick={scrollToBottom} className="absolute right-4 bottom-4 min-h-10 rounded-full bg-blue px-4 font-body text-sm text-white shadow-lg">
          새 메시지 {unreadCount}개
        </button>)}
    </div>);
}
