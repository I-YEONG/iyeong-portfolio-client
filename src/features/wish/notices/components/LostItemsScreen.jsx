import { generatePath, Link } from 'react-router';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useLostItems } from '../hooks/useLostItems';
import { withLostItemPrefix } from '../utils';
import { FeedbackBlock } from './FeedbackBlock';
import { InformationPageLayout } from './InformationPageLayout';
import { CardGridSkeleton } from './LoadingSkeleton';
export function LostItemsScreen() {
    const lostItemsQuery = useLostItems();
    const lostItems = lostItemsQuery.data?.pages.flatMap((page) => page.items) ?? [];
    const hasLostItems = lostItems.length > 0;
    const showInitialError = lostItemsQuery.isError && !hasLostItems;
    const showNextPageError = lostItemsQuery.isFetchNextPageError && hasLostItems;
    const showRefreshError = lostItemsQuery.isRefetchError && hasLostItems && !showNextPageError;
    return (<InformationPageLayout activeId="lost-items">
      <div className="mx-3.5 rounded-sm bg-gray-01 px-[15px] py-2.5 text-sm leading-normal font-medium text-gray-04">
        <p>모든 분실물은 비대위 부스에서 보관하고 있습니다.</p>
        <p>분실물을 찾으시는 경우, 비대위 부스를 방문해 확인해 주세요.</p>
      </div>
      {lostItemsQuery.isPending ? <CardGridSkeleton label="분실물"/> : null}
      {showInitialError ? (<FeedbackBlock message="분실물을 불러오지 못했습니다." onRetry={() => void lostItemsQuery.refetch()}/>) : null}
      {!lostItemsQuery.isPending && !lostItemsQuery.isError && lostItems.length === 0 ? (<FeedbackBlock message="등록된 분실물이 없습니다."/>) : null}
      {hasLostItems ? (<ul className="grid grid-cols-2 gap-x-7 gap-y-3 px-3.5 pt-[15px] pb-8">
          {lostItems.map((item) => {
                const image = item.images.find((candidate) => candidate.url);
                return (<li key={item.id} className="min-w-0">
                <Link to={generatePath(ROUTES.LOST_ITEM_DETAIL, { id: String(item.id) })} className="block min-h-11">
                  <div className="aspect-square w-full overflow-hidden rounded-sm bg-gray-01">
                    {image ? (<img src={image.url} alt="" className="size-full object-cover" loading="lazy"/>) : (<span className="flex size-full items-center justify-center text-sm text-gray-04">
                        이미지 없음
                      </span>)}
                  </div>
                  <p className="mt-3 truncate text-base text-black">
                    {withLostItemPrefix(item.title)}
                  </p>
                  <p className="mt-1 truncate text-sm font-light text-gray-04">
                    습득 위치 ㅣ {item.foundLocation || '위치 미상'}
                  </p>
                </Link>
              </li>);
            })}
        </ul>) : null}
      {showNextPageError ? (<FeedbackBlock message="다음 분실물을 불러오지 못했습니다." onRetry={() => void lostItemsQuery.fetchNextPage()}/>) : null}
      {showRefreshError ? (<FeedbackBlock message="분실물을 새로고침하지 못했습니다." onRetry={() => void lostItemsQuery.refetch()}/>) : null}
      {lostItemsQuery.hasNextPage && !showNextPageError ? (<div className="px-3.5 py-5">
          <button type="button" onClick={() => void lostItemsQuery.fetchNextPage()} disabled={lostItemsQuery.isFetching} className="min-h-11 w-full rounded-full bg-main-02 px-5 text-sm font-semibold text-white disabled:opacity-50">
            {lostItemsQuery.isFetchingNextPage ? '불러오는 중...' : '더 보기'}
          </button>
        </div>) : null}
    </InformationPageLayout>);
}
