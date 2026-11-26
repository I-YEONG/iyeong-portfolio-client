import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useLostItem } from '../hooks/useLostItems';
import { formatDate, getLostItemStatus, withLostItemPrefix } from '../utils';
import { DetailPageLayout } from './DetailPageLayout';
import { FeedbackBlock } from './FeedbackBlock';
import { DetailSkeleton } from './LoadingSkeleton';
export function LostItemDetailScreen({ lostItemId }) {
    const lostItemQuery = useLostItem(lostItemId);
    return (<DetailPageLayout backTo={ROUTES.LOST_ITEMS}>
      {!Number.isInteger(lostItemId) || lostItemId <= 0 ? (<FeedbackBlock message="잘못된 분실물 주소입니다."/>) : null}
      {lostItemQuery.isPending && Number.isInteger(lostItemId) && lostItemId > 0 ? (<DetailSkeleton label="분실물"/>) : null}
      {lostItemQuery.isError ? (<FeedbackBlock message="분실물을 불러오지 못했습니다." onRetry={() => void lostItemQuery.refetch()}/>) : null}
      {lostItemQuery.data ? (<article>
          <h2 className="text-xl leading-normal font-semibold text-black">
            {withLostItemPrefix(lostItemQuery.data.title)}
          </h2>
          <div className="mt-4 flex items-center justify-between text-sm font-light text-gray-04">
            <time dateTime={lostItemQuery.data.createdAt ?? undefined}>
              {formatDate(lostItemQuery.data.createdAt)}
            </time>
            <span>{lostItemQuery.data.authorName}</span>
          </div>
          {lostItemQuery.data.images.length ? (<div className="mt-4 space-y-3">
              {lostItemQuery.data.images.map((image, index) => (<img key={image.id ?? `${image.url}-${index}`} src={image.url} alt={index === 0 ? lostItemQuery.data.title : ''} className="aspect-square w-full rounded-sm object-cover"/>))}
            </div>) : null}
          <div className="mt-4 text-base leading-normal text-purple">
            <p className="whitespace-pre-line">{lostItemQuery.data.content}</p>
            <dl className="mt-1">
              <div className="flex gap-1">
                <dt>습득 위치 :</dt>
                <dd>{lostItemQuery.data.foundLocation || '위치 미상'}</dd>
              </div>
              <div className="flex gap-1">
                <dt>상태 :</dt>
                <dd>{getLostItemStatus(lostItemQuery.data) || '확인 중'}</dd>
              </div>
            </dl>
          </div>
        </article>) : null}
    </DetailPageLayout>);
}
