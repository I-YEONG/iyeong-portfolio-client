import foodTruckMarker from '@/assets/wish/booths/marker-food-truck.svg';
import generalMarker from '@/assets/wish/booths/marker-general.svg';
import photoMarker from '@/assets/wish/booths/marker-photo.svg';
import studentCouncilMarker from '@/assets/wish/booths/marker-student-council.svg';
/**
 * 시안(1692:6619)의 칩 순서를 그대로 따른다.
 * 운영 API의 GENERAL은 시안에 대응하는 칩이 없어 '전체'에서만 보인다.
 * 칩을 추가할 때는 이 배열에 한 줄만 넣으면 된다.
 */
export const BOOTH_FILTER_CHIPS = [
    { id: 'ALL', label: '전체' },
    { id: 'FAVORITE', label: '북마크' },
    { id: 'STUDENT_COUNCIL', label: '학생회' },
    { id: 'FOOD_TRUCK', label: '푸드트럭' },
    { id: 'CAMPUS', label: '교내부스' },
];
/** 백엔드가 알려준 짧은 표기. 관리자 화면의 긴 이름(예: '교내 기관·부서 운영 부스')은 카드에 넣기엔 길다. */
const CATEGORY_LABELS = {
    STUDENT_COUNCIL: '학생회',
    CAMPUS: '교내기관',
    GENERAL: '일반부스',
    EXTERNAL: '외부업체',
    OTHER: '기타',
    FOOD_TRUCK: '푸드트럭',
    PHOTO_BOOTH: '포토부스',
};
/** 시안 '부스별 아이콘'(1749:1268)의 마커. 대응 아이콘이 없으면 일반 부스 아이콘을 쓴다. */
const CATEGORY_MARKERS = {
    STUDENT_COUNCIL: studentCouncilMarker,
    CAMPUS: generalMarker,
    GENERAL: generalMarker,
    EXTERNAL: generalMarker,
    OTHER: generalMarker,
    FOOD_TRUCK: foodTruckMarker,
    PHOTO_BOOTH: photoMarker,
};
export function getBoothCategoryLabel(category) {
    return category === null ? '부스' : CATEGORY_LABELS[category];
}
export function getBoothMarkerIcon(category) {
    return category === null ? generalMarker : CATEGORY_MARKERS[category];
}
export function matchesBoothFilter(booth, filter) {
    if (filter === 'ALL')
        return true;
    if (filter === 'FAVORITE')
        return booth.favorited;
    return booth.category === filter;
}
export function filterBooths(booths, filter) {
    return booths.filter((booth) => matchesBoothFilter(booth, filter));
}
