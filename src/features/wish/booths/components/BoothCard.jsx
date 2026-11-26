import bookmarkFilledIcon from '@/assets/wish/booths/bookmark-filled.svg';
import bookmarkIcon from '@/assets/wish/booths/bookmark.svg';
import { getBoothCategoryLabel } from '../lib/category';
import { toThumbnailUrl } from '../lib/thumbnail';
/** 70px 원 안의 이미지를 3배 화면까지 선명하게 보이는 크기 */
const THUMBNAIL_WIDTH = 192;
/** 시안은 두 자리까지만 보여 준다('99+'). */
function formatFavoriteCount(count) {
    return count > 99 ? '99+' : String(count);
}
/** 시안 1692:6632의 부스 카드. 누르면 지도를 그 부스로 옮긴다. */
export function BoothCard({ booth, isSelected, onSelect, onShowDetail, onToggleFavorite, isFavoriteDisabled = false, }) {
    const name = booth.name ?? '이름 미정';
    // 설명이 비어 있는 부스는 주최 쪽을 대신 보여 준다.
    const summary = booth.description ?? booth.operator;
    return (
    // 북마크와 상세보기 버튼은 지도 선택 버튼과 분리한다.
    <li className="relative shrink-0" data-booth-id={booth.id ?? undefined}>
      <div className={[
            'flex h-[166px] w-full gap-[18px] rounded-[20px] border bg-white pt-[19px] pl-[19px] text-left font-body',
            isSelected ? 'border-blue' : 'border-gray-01',
        ].join(' ')}>
        <button type="button" onClick={() => booth.id !== null && onShowDetail(booth.id)} aria-label={`${name} 상세보기`} aria-haspopup="dialog" className="grid size-[70px] shrink-0 place-items-center overflow-hidden rounded-full border border-gray-01 bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-02">
          {booth.imageUrl && (<img src={toThumbnailUrl(booth.imageUrl, THUMBNAIL_WIDTH)} alt="" loading="lazy" 
        // 변환이 실패하면 원본으로 한 번만 다시 시도한다.
        onError={(event) => {
                const original = booth.imageUrl;
                if (original && event.currentTarget.src !== original)
                    event.currentTarget.src = original;
            }} className="size-full object-contain p-[4.375px]"/>)}
        </button>

        <span className="flex min-w-0 flex-1 flex-col pr-[52px]">
          <button type="button" onClick={() => booth.id !== null && onSelect(booth.id)} aria-pressed={isSelected} className="flex min-h-11 shrink-0 items-center text-left text-[16px] leading-[normal] font-semibold text-purple focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-02">
            <span className="min-w-0 truncate">{name}</span>
          </button>
          {summary && (<button type="button" onClick={() => booth.id !== null && onShowDetail(booth.id)} aria-label={`${name} 소개 상세보기`} aria-haspopup="dialog" className="mt-[6px] line-clamp-3 text-left text-[14px] leading-[normal] text-gray-04 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main-02">
              {summary}
            </button>)}
          <span className="mt-auto mb-[15px] w-fit rounded-full bg-gray-01 px-[10px] py-[4px] text-[12px] leading-[normal] text-gray-04">
            {getBoothCategoryLabel(booth.category)}
          </span>
        </span>
      </div>

      <button type="button" onClick={() => onToggleFavorite(booth)} disabled={isFavoriteDisabled} aria-pressed={booth.favorited} aria-label={`${name} 북마크`} className="absolute top-[7px] right-[7px] flex w-11 flex-col items-center pt-[10px] pb-[6px] font-body disabled:opacity-40">
        <img src={booth.favorited ? bookmarkFilledIcon : bookmarkIcon} alt="" className="size-6"/>
        {booth.favoriteCount !== null && (<span className="mt-[8px] text-[12px] leading-[normal] font-light text-gray-04">
            {formatFavoriteCount(booth.favoriteCount)}
          </span>)}
      </button>
    </li>);
}
