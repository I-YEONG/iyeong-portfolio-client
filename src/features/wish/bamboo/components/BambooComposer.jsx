import { IconCircleArrowUpFilled } from '@tabler/icons-react';
import { useRef, useState } from 'react';
const MAX_MESSAGE_LENGTH = 50;
/** 대나무숲 메시지 입력과 전송 제어 UI다. */
export function BambooComposer({ disabled = false, isSending = false, onLengthExceeded, onSend, }) {
    const [content, setContent] = useState('');
    const inputRef = useRef(null);
    const submittingRef = useRef(false);
    const editVersionRef = useRef(0);
    const canSend = !disabled && !isSending && Boolean(content.trim());
    async function submit() {
        const message = content.trim();
        if (!message || !canSend || submittingRef.current)
            return;
        if (message.length > MAX_MESSAGE_LENGTH) {
            onLengthExceeded?.(MAX_MESSAGE_LENGTH);
            requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
            return;
        }
        submittingRef.current = true;
        const draft = content;
        const editVersion = editVersionRef.current;
        try {
            const sending = onSend(message);
            setContent('');
            inputRef.current?.focus();
            await sending;
        }
        catch {
            // 다음 글을 입력했다면 덮어쓰지 않는다. 실패 모달은 호출자가 표시한다.
            if (editVersionRef.current === editVersion)
                setContent(draft);
        }
        finally {
            submittingRef.current = false;
        }
    }
    return (<footer className="shrink-0 bg-black/20 pt-[11px] pr-2.5 pb-[max(35px,env(safe-area-inset-bottom))] pl-3.5 shadow-[0_0_4px_0_#d1d1db]">
      <form className="flex items-end gap-0.5" onSubmit={(event) => {
            event.preventDefault();
            void submit();
        }}>
        <input ref={inputRef} type="text" value={content} disabled={disabled} aria-label="채팅 메시지" placeholder="채팅을 입력해주세요" autoComplete="off" onChange={(event) => {
            editVersionRef.current += 1;
            setContent(event.target.value);
        }} className="h-12 min-w-0 flex-1 rounded-full bg-white px-[19px] font-body text-base leading-[22px] text-black placeholder:text-gray-02"/>
        <button type="submit" disabled={!canSend} aria-label={isSending ? '메시지 전송 중' : '메시지 전송'} className="relative flex size-12 shrink-0 items-center justify-center rounded-full text-main-01 disabled:cursor-not-allowed">
          <span aria-hidden="true" className="absolute size-6 rounded-full bg-white"/>
          <IconCircleArrowUpFilled size={48} aria-hidden="true" className="relative"/>
        </button>
      </form>
    </footer>);
}
