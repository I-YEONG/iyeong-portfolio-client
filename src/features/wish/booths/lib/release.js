/** 운영에서 받은 부스맵 공개 일시다(2026-09-27). 백엔드가 내려주지 않아 코드에 둔다. */
export const BOOTHS_RELEASE_AT = '2026-10-01T14:00:00+09:00';
const BOOTHS_RELEASE_TIME = new Date(BOOTHS_RELEASE_AT).getTime();
export function isBoothsReleased(now = Date.now()) {
    return now >= BOOTHS_RELEASE_TIME;
}
/** 공개 시각까지 남은 시간. 이미 공개됐으면 0이다. */
export function getBoothsReleaseDelay(now = Date.now()) {
    return Math.max(0, BOOTHS_RELEASE_TIME - now);
}
