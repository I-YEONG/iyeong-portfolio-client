import { IconHome, IconMail, IconMapPin, IconMessageCircle, IconMicrophone2, } from '@tabler/icons-react';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import voteIcon from '@/assets/wish/material-symbols_how-to-vote-outline-rounded.svg';
import { BottomNavigation } from '@/components/wish/layout/BottomNavigation';
import { PageHeader } from '@/components/wish/layout/PageHeader';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useBooths, useToggleBoothFavorite } from '../hooks/useBooths';
import { filterBooths } from '../lib/category';
import { boothMapSelectionReducer, INITIAL_BOOTH_MAP_SELECTION } from '../lib/mapSelection';
import { BoothCard } from './BoothCard';
import { BoothDetailDialog } from './BoothDetailDialog';
import { BoothFilterChips } from './BoothFilterChips';
import { BoothMap } from './BoothMap';
import { BoothSheet } from './BoothSheet';
const navigationItems = [
    { id: 'booths', label: '부스 지도', to: ROUTES.BOOTHS, icon: <IconMapPin stroke={2}/> },
    {
        id: 'performances',
        label: '연예인 공개',
        to: ROUTES.PERFORMANCES,
        icon: <IconMicrophone2 stroke={2}/>,
    },
    { id: 'letters', label: '축하 편지', to: ROUTES.LETTERS, icon: <IconMail stroke={2}/> },
    { id: 'polls', label: '투표', to: ROUTES.POLLS, icon: <img src={voteIcon} alt=""/> },
    { id: 'bamboo', label: '대나무숲', to: ROUTES.BAMBOO, icon: <IconMessageCircle stroke={2}/> },
    { id: 'home', label: '홈', to: ROUTES.HOME, icon: <IconHome stroke={2}/> },
];
/** 지도와 부스 목록을 함께 보여 주는 부스맵 화면. 시안 1674:5087 / 1692:5411 / 1692:5680. */
export function BoothMapScreen() {
    const navigate = useNavigate();
    const { data: booths, isPending, isError, isPlaceholderData, refetch } = useBooths();
    const toggleFavorite = useToggleBoothFavorite();
    const [selection, dispatch] = useReducer(boothMapSelectionReducer, INITIAL_BOOTH_MAP_SELECTION);
    const { filter, snap, focusRequestId, overviewRequestId } = selection;
    const [sheetLayout, setSheetLayout] = useState(null);
    const [detailBoothId, setDetailBoothId] = useState(null);
    const listRef = useRef(null);
    const sheetRef = useRef(null);
    const navigationRef = useRef(null);
    const lastListRequestRef = useRef(0);
    const visibleBooths = useMemo(() => filterBooths(booths ?? [], filter), [booths, filter]);
    const selectedBooth = visibleBooths.find((booth) => booth.id === selection.selectedBoothId);
    const selectedBoothId = selectedBooth?.id ?? null;
    const hasMissingPosition = selectedBooth !== undefined &&
        (selectedBooth.latitude === null || selectedBooth.longitude === null);
    const handleSelectBooth = (id) => {
        dispatch({ type: 'select', id });
    };
    const handleFilterChange = (nextFilter) => {
        dispatch({
            type: 'filter',
            filter: nextFilter,
            selectedIsVisible: filterBooths(booths ?? [], nextFilter).some((booth) => booth.id === selectedBoothId && selectedBoothId !== null),
        });
    };
    // 북마크·재조회로 결과에서 빠진 부스는 선택만 해제한다. 카메라 요청은 만들지 않는다.
    useEffect(() => {
        if (selection.selectedBoothId !== null && selectedBoothId === null)
            dispatch({ type: 'removed' });
    }, [selection.selectedBoothId, selectedBoothId]);
    // 지도에서 마커를 누르면 목록에서도 그 카드가 보이게 한다.
    useEffect(() => {
        const list = listRef.current;
        if (selectedBoothId === null) {
            lastListRequestRef.current = focusRequestId;
            return;
        }
        if (lastListRequestRef.current === focusRequestId ||
            !list ||
            !sheetLayout ||
            sheetLayout.isMoving ||
            sheetLayout.snap !== snap)
            return;
        const card = list.querySelector(`[data-booth-id="${selectedBoothId}"]`);
        if (!card)
            return;
        const listRect = list.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const navigationTop = navigationRef.current?.getBoundingClientRect().top ?? listRect.bottom;
        const bottom = Math.min(listRect.bottom, navigationTop - 8);
        const availableHeight = bottom - listRect.top;
        if (availableHeight <= 0)
            return;
        lastListRequestRef.current = focusRequestId;
        let delta = 0;
        if (cardRect.top < listRect.top || cardRect.height > availableHeight) {
            delta = cardRect.top - listRect.top;
        }
        else if (cardRect.bottom > bottom) {
            delta = cardRect.bottom - bottom;
        }
        if (Math.abs(delta) < 1)
            return;
        // 페이지와 지도는 스크롤하지 않고 목록의 스크롤 위치만 조절한다.
        list.scrollTo({
            top: list.scrollTop + delta,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'instant'
                : 'smooth',
        });
    }, [selectedBoothId, focusRequestId, sheetLayout, snap]);
    const handleToggleFavorite = (booth) => {
        if (booth.id === null || isPlaceholderData)
            return;
        toggleFavorite.mutate({ id: booth.id, favorited: !booth.favorited });
    };
    return (<main className="relative h-dvh overflow-hidden bg-white">
      <h1 className="sr-only">부스맵</h1>
      <p className="sr-only" role="status" aria-live="polite">
        <span key={focusRequestId}>
          {selectedBoothId !== null ? `${selectedBooth?.name ?? '부스'} 선택됨` : ''}
        </span>
      </p>

      <BoothMap booths={visibleBooths} selectedBoothId={selectedBoothId} focusRequestId={focusRequestId} overviewRequestId={overviewRequestId} isDataReady={booths !== undefined && !isPlaceholderData} sheetRef={sheetRef} sheetTop={sheetLayout?.top ?? null} isSheetMoving={!sheetLayout || sheetLayout.isMoving || sheetLayout.snap !== snap} onSelectBooth={handleSelectBooth} onShowAll={() => dispatch({ type: 'overview' })} className="absolute inset-x-0 top-14 bottom-0"/>

      <PageHeader title="MAP" onBack={() => navigate(ROUTES.HOME)} className="relative z-10"/>

      <BoothSheet elementRef={sheetRef} snap={snap} onSnapChange={(next) => dispatch({ type: 'snap', snap: next })} onLayoutChange={setSheetLayout}>
        <div className="mt-[7px] shrink-0">
          <BoothFilterChips value={filter} onChange={handleFilterChange}/>
        </div>

        {hasMissingPosition && (<p role="status" className="mx-[14px] mt-2 shrink-0 rounded-lg bg-gray-01 px-3 py-2 font-body text-[12px] text-gray-04">
            이 부스의 위치 정보가 아직 등록되지 않았습니다.
          </p>)}

        <ul ref={listRef} className="mt-[13px] flex min-h-0 flex-1 [scrollbar-width:none] flex-col gap-2 overflow-y-auto overscroll-contain px-[14px] pb-[104px] [&::-webkit-scrollbar]:hidden">
          {isPending && <BoothSheetNotice>부스 정보를 불러오는 중입니다.</BoothSheetNotice>}

          {isError && (<BoothSheetNotice>
              부스 정보를 불러오지 못했습니다.
              <button type="button" onClick={() => void refetch()} className="mt-3 rounded-full bg-blue px-4 py-2 text-white">
                다시 시도
              </button>
            </BoothSheetNotice>)}

          {!isPending && !isError && visibleBooths.length === 0 && (<BoothSheetNotice>
              {filter === 'FAVORITE'
                ? '아직 북마크한 부스가 없습니다.'
                : '해당하는 부스가 없습니다.'}
            </BoothSheetNotice>)}

          {visibleBooths.map((booth) => (<BoothCard key={booth.id ?? booth.name} booth={booth} isSelected={booth.id === selectedBoothId} onSelect={handleSelectBooth} onShowDetail={setDetailBoothId} onToggleFavorite={handleToggleFavorite} isFavoriteDisabled={isPlaceholderData}/>))}
        </ul>
      </BoothSheet>

      <div ref={navigationRef} className="pointer-events-none absolute inset-x-0 bottom-[max(26px,calc(env(safe-area-inset-bottom)+26px))] z-30">
        <BottomNavigation items={navigationItems} activeId="booths" className="pointer-events-auto"/>
      </div>

      {detailBoothId !== null && (<BoothDetailDialog boothId={detailBoothId} onClose={() => setDetailBoothId(null)}/>)}
    </main>);
}
function BoothSheetNotice({ children }) {
    return (<li className="flex flex-col items-center justify-center px-6 py-10 text-center font-body text-[14px] text-gray-04">
      {children}
    </li>);
}
