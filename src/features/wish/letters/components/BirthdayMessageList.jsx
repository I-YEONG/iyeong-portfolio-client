import { IconChevronLeft, IconChevronRight, IconHeart, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import letterBox from '@/assets/wish/letter/letter-box.svg';
import letterCake from '@/assets/wish/letter/letter-cake.svg';
import letterCandle from '@/assets/wish/letter/letter-candle.svg';
import letterRibbon from '@/assets/wish/letter/letter-ribbon.svg';
import { useAuthSession } from '@/features/wish/auth';
import { useBirthdayMessages, useDeleteBirthdayMessage, useSetBirthdayMessageHeart, } from '../hooks/useBirthdayMessages';
import { getBirthdayMessageErrorMessage } from '../api/birthdayMessageError';
import { getStationeryId } from '../lib/stationery';
import styles from './birthday-message-list.module.css';
const stationery = [
    { id: 'box', image: letterBox, maxLength: 57, fontSize: 10 },
    { id: 'cake', image: letterCake, maxLength: 30, fontSize: 10 },
    { id: 'ribbon', image: letterRibbon, maxLength: 28, fontSize: 9.5 },
    { id: 'candle', image: letterCandle, maxLength: 35, fontSize: 10.5 },
];
function stableNumber(value, modulo) {
    return Math.abs((value * 2_654_435_761) >>> 0) % modulo;
}
function getStationery(message) {
    const stationeryId = getStationeryId(message.designNo);
    return stationery.find((paper) => paper.id === stationeryId) ?? stationery[0];
}
/** 메시지마다 고정된 의사 난수 각도를 계산해, 렌더링 중 흔들림 없이 -5~5도를 유지한다. */
function getRotation(message) {
    return stableNumber(message.id, 11) - 5;
}
function getAuthorName(message) {
    return message.author?.maskedName ?? '익명';
}
function getPageNumbers(currentPage, totalPages) {
    const visiblePageCount = Math.min(totalPages, 4);
    const firstPage = Math.min(Math.max(currentPage - 1, 0), Math.max(totalPages - visiblePageCount, 0));
    return Array.from({ length: visiblePageCount }, (_, index) => firstPage + index);
}
function BirthdayMessageCard({ message, isHeartPending, isDeletePending, onToggleHeart, onDelete, }) {
    const paper = getStationery(message);
    const rotation = getRotation(message);
    return (<article className={styles.card} data-stationery={paper.id} aria-label={`${getAuthorName(message)}님의 축하 편지`}>
      <div className={styles.letter} style={{ transform: `rotate(${rotation}deg)` }}>
        <img src={paper.image} alt="" className={styles.paper}/>
        <p className={styles.content} style={{ fontSize: `${paper.fontSize}px` }}>
          {message.content}
        </p>
      </div>
      <footer className={styles.meta}>
        <span className={styles.author}>{getAuthorName(message)}</span>
        {message.mine ? (<button type="button" className={styles.delete} onClick={() => onDelete(message)} disabled={isDeletePending} aria-label="내 편지 삭제">
            <IconTrash size={14} stroke={1.5} aria-hidden="true"/>
            삭제
          </button>) : (<button type="button" className={styles.heart} data-hearted={message.heartedByMe || undefined} onClick={() => onToggleHeart(message)} disabled={isHeartPending} aria-label={message.heartedByMe ? '좋아요 취소' : '좋아요'} aria-pressed={message.heartedByMe}>
            <IconHeart size={14} stroke={1.5} fill={message.heartedByMe ? 'currentColor' : 'none'} aria-hidden="true"/>
            {message.heartCount}
          </button>)}
      </footer>
    </article>);
}
/** 배경 이미지의 고정된 작업 영역 안에 최신 편지를 최대 8개까지 배치한다. */
export function BirthdayMessageList() {
    const { isAuthenticated, isInitializing } = useAuthSession();
    const [page, setPage] = useState(0);
    const [actionError, setActionError] = useState(null);
    const setHeart = useSetBirthdayMessageHeart();
    const deleteMessage = useDeleteBirthdayMessage();
    const { data, error, isError, isLoading } = useBirthdayMessages('LATEST', page, 8, isAuthenticated);
    const messages = data?.items ?? [];
    const totalPages = data?.totalPages ?? 0;
    const pageNumbers = getPageNumbers(page, totalPages);
    function toggleHeart(message) {
        if (setHeart.isPending)
            return;
        setActionError(null);
        setHeart.mutate({ id: message.id, hearted: !message.heartedByMe }, {
            onError: (error) => setActionError(getBirthdayMessageErrorMessage(error, 'heart')),
        });
    }
    function removeMessage(message) {
        if (deleteMessage.isPending)
            return;
        if (!window.confirm('작성한 편지를 삭제할까요? 삭제 후 새 편지를 작성할 수 있습니다.'))
            return;
        const shouldMoveToPreviousPage = page > 0 && page === totalPages - 1 && messages.length === 1;
        setActionError(null);
        deleteMessage.mutate(message.id, {
            onSuccess: () => {
                if (shouldMoveToPreviousPage)
                    setPage((currentPage) => currentPage - 1);
            },
            onError: (error) => setActionError(getBirthdayMessageErrorMessage(error, 'delete')),
        });
    }
    if (isInitializing || isLoading) {
        const loadingLabel = isInitializing ? '로그인 상태를 확인하는 중' : '축하 편지를 불러오는 중';
        return (<div role="status" aria-label={loadingLabel} className={styles.loading}>
        <span aria-hidden="true" className={styles.spinner}/>
        <span className="sr-only">{loadingLabel}</span>
      </div>);
    }
    if (isError && messages.length === 0) {
        return (<p role="alert" className={styles.status}>
        {getBirthdayMessageErrorMessage(error, 'list')}
      </p>);
    }
    if (messages.length === 0)
        return <p className="sr-only">아직 도착한 축하 편지가 없습니다.</p>;
    return (<>
      <section className={styles.list} aria-label="도착한 축하 편지">
        {messages.map((message) => (<BirthdayMessageCard key={message.id} message={message} isHeartPending={setHeart.isPending} isDeletePending={deleteMessage.isPending} onToggleHeart={toggleHeart} onDelete={removeMessage}/>))}
      </section>
      {actionError && (<p role="alert" className={styles.heartError}>
          {actionError}
        </p>)}
      {totalPages > 1 && (<nav className={styles.pagination} aria-label="축하 편지 페이지">
          <button type="button" className={styles.paginationButton} onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 0))} disabled={page === 0} aria-label="이전 페이지">
            <IconChevronLeft size={16} stroke={1.5} aria-hidden="true"/>
          </button>
          {pageNumbers.map((pageNumber) => (<button key={pageNumber} type="button" className={styles.paginationButton} data-current={pageNumber === page || undefined} onClick={() => setPage(pageNumber)} aria-current={pageNumber === page ? 'page' : undefined} aria-label={`${pageNumber + 1}페이지`}>
              {pageNumber + 1}
            </button>))}
          <button type="button" className={styles.paginationButton} onClick={() => setPage((currentPage) => Math.min(currentPage + 1, totalPages - 1))} disabled={page === totalPages - 1} aria-label="다음 페이지">
            <IconChevronRight size={16} stroke={1.5} aria-hidden="true"/>
          </button>
        </nav>)}
    </>);
}
