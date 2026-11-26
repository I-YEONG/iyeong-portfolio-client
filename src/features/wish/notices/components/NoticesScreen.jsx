import { IconChevronRight, IconPinFilled } from '@tabler/icons-react';
import { generatePath, Link } from 'react-router';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useNotices } from '../hooks/useNotices';
import { formatDate, withNoticePrefix } from '../utils';
import { FeedbackBlock } from './FeedbackBlock';
import { InformationPageLayout } from './InformationPageLayout';
import { NoticeListSkeleton } from './LoadingSkeleton';
export function NoticesScreen() {
    const noticesQuery = useNotices();
    const notices = noticesQuery.data?.pages.flatMap((page) => page.items) ?? [];
    const hasNotices = notices.length > 0;
    const showInitialError = noticesQuery.isError && !hasNotices;
    const showNextPageError = noticesQuery.isFetchNextPageError && hasNotices;
    const showRefreshError = noticesQuery.isRefetchError && hasNotices && !showNextPageError;
    return (<InformationPageLayout activeId="notices">
      {noticesQuery.isPending ? <NoticeListSkeleton /> : null}
      {showInitialError ? (<FeedbackBlock message="공지사항을 불러오지 못했습니다." onRetry={() => void noticesQuery.refetch()}/>) : null}
      {!noticesQuery.isPending && !noticesQuery.isError && notices.length === 0 ? (<FeedbackBlock message="등록된 공지사항이 없습니다."/>) : null}
      {hasNotices ? (<ul className="px-[7px]">
          {notices.map((notice) => (<li key={notice.id}>
              <Link to={generatePath(ROUTES.NOTICE_DETAIL, { id: String(notice.id) })} className="grid min-h-[75px] grid-cols-[minmax(0,1fr)_44px] items-center border-b border-gray-01 pl-5">
                <span className="min-w-0">
                  <span className="flex items-center gap-1 truncate text-xs font-light text-gray-04">
                    {notice.pinned ? <IconPinFilled size={13} aria-label="고정 공지"/> : null}
                    <span>{formatDate(notice.createdAt)}</span>
                    {notice.authorName ? <span>ㅣ {notice.authorName}</span> : null}
                  </span>
                  <span className="mt-1 block truncate text-base text-black">
                    {withNoticePrefix(notice.title)}
                  </span>
                </span>
                <span className="flex size-11 items-center justify-center text-gray-01">
                  <IconChevronRight size={24} aria-hidden="true"/>
                </span>
              </Link>
            </li>))}
        </ul>) : null}
      {showNextPageError ? (<FeedbackBlock message="다음 공지사항을 불러오지 못했습니다." onRetry={() => void noticesQuery.fetchNextPage()}/>) : null}
      {showRefreshError ? (<FeedbackBlock message="공지사항을 새로고침하지 못했습니다." onRetry={() => void noticesQuery.refetch()}/>) : null}
      {noticesQuery.hasNextPage && !showNextPageError ? (<div className="px-3.5 py-5">
          <button type="button" onClick={() => void noticesQuery.fetchNextPage()} disabled={noticesQuery.isFetching} className="min-h-11 w-full rounded-full bg-main-02 px-5 text-sm font-semibold text-white disabled:opacity-50">
            {noticesQuery.isFetchingNextPage ? '불러오는 중...' : '더 보기'}
          </button>
        </div>) : null}
    </InformationPageLayout>);
}
