export const DEFAULT_BIRTHDAY_MESSAGE_DESIGN_NO = 1;
const stationeryIdByDesignNo = {
    1: 'box',
    2: 'cake',
    3: 'ribbon',
    4: 'candle',
};
export function getStationeryId(designNo) {
    return stationeryIdByDesignNo[designNo ?? DEFAULT_BIRTHDAY_MESSAGE_DESIGN_NO] ?? 'box';
}
