export const BAMBOO_RELEASE_AT = '2026-09-28T14:00:00+09:00';
export function hasBambooReleased(now = Date.now()) {
    return now >= Date.parse(BAMBOO_RELEASE_AT);
}
