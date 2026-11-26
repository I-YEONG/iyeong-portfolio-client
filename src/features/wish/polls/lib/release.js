export const POLLS_RELEASE_AT = '2026-10-03T14:00:00+09:00';
const releaseTime = Date.parse(POLLS_RELEASE_AT);
export function isPollsReleased(now = Date.now()) {
    return now >= releaseTime;
}
export function getPollsReleaseDelay(now = Date.now()) {
    return Math.max(0, releaseTime - now);
}
