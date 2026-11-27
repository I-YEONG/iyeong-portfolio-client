export const LETTERS_RELEASE_AT = '2026-10-03T14:00:00+09:00';
const LETTERS_RELEASE_TIME = new Date(LETTERS_RELEASE_AT).getTime();
export function hasLettersReleased(now = Date.now()) {
    return now >= LETTERS_RELEASE_TIME;
}
export function getLettersReleaseDelay(now = Date.now()) {
    return Math.max(0, LETTERS_RELEASE_TIME - now);
}
