export const INITIAL_BOOTH_MAP_SELECTION = {
    filter: 'ALL',
    snap: 'half',
    selectedBoothId: null,
    focusRequestId: 0,
    overviewRequestId: 0,
};
/** 선택 표시와 카메라 이동 요청을 분리해 데이터 갱신으로 인한 자동 이동을 막는다. */
export function boothMapSelectionReducer(state, action) {
    switch (action.type) {
        case 'select':
            return {
                ...state,
                selectedBoothId: action.id,
                // 같은 부스의 재선택도 새로운 이동 요청으로 처리한다.
                focusRequestId: state.focusRequestId + 1,
                snap: state.snap === 'expanded' ? 'half' : state.snap,
            };
        case 'snap':
            return state.snap === action.snap ? state : { ...state, snap: action.snap };
        case 'filter':
            if (state.filter === action.filter)
                return state;
            if (state.selectedBoothId !== null && action.selectedIsVisible) {
                return { ...state, filter: action.filter };
            }
            return {
                ...state,
                filter: action.filter,
                selectedBoothId: null,
                overviewRequestId: state.overviewRequestId + 1,
            };
        case 'overview':
            return {
                ...state,
                selectedBoothId: null,
                overviewRequestId: state.overviewRequestId + 1,
            };
        case 'removed':
            // 갱신으로 사라진 선택만 해제한다. 지도 위치와 배율은 유지한다.
            return state.selectedBoothId === null ? state : { ...state, selectedBoothId: null };
    }
    return state;
}
