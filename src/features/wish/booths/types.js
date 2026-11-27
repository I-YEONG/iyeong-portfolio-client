/** 운영 API가 내려주는 부스 분류 7종(2026-09-26 기준). */
export const BOOTH_CATEGORIES = [
    'STUDENT_COUNCIL',
    'CAMPUS',
    'GENERAL',
    'EXTERNAL',
    'OTHER',
    'FOOD_TRUCK',
    'PHOTO_BOOTH',
];
function toCategory(value) {
    return BOOTH_CATEGORIES.includes(value) ? value : null;
}
/** 관리자 화면에서 빈칸 대신 '-'를 넣어 두는 경우가 있어 없는 값으로 본다. */
function toText(value) {
    const text = value?.trim();
    return text && text !== '-' ? text : null;
}
function toCount(value) {
    return typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : null;
}
function toCoordinate(value) {
    return typeof value === 'number' && Number.isFinite(value) ? value : null;
}
function toMedia(media) {
    return {
        id: media.id ?? null,
        kind: media.kind ?? null,
        url: media.url ?? null,
        displayOrder: media.displayOrder ?? 0,
    };
}
function pickImageUrl(representative, media) {
    if (representative?.kind === 'IMAGE' && representative.url)
        return representative.url;
    return media.find(({ kind, url }) => kind === 'IMAGE' && url)?.url ?? null;
}
export function normalizeBooth(booth) {
    return {
        id: booth.id ?? null,
        name: booth.name ?? null,
        operator: toText(booth.operator),
        description: toText(booth.description),
        category: toCategory(booth.category),
        latitude: toCoordinate(booth.latitude),
        longitude: toCoordinate(booth.longitude),
        opensAt: booth.opensAt ?? null,
        closesAt: booth.closesAt ?? null,
        stampEnabled: booth.stampEnabled ?? false,
        favorited: booth.favorited ?? false,
        favoriteCount: toCount(booth.favoriteCount),
        imageUrl: pickImageUrl(booth.representativeMedia, []),
    };
}
export function normalizeBoothDetail(booth) {
    const media = (booth.media ?? []).map(toMedia).sort((a, b) => a.displayOrder - b.displayOrder);
    return {
        ...normalizeBooth(booth),
        imageUrl: pickImageUrl(booth.representativeMedia, booth.media ?? []),
        media,
    };
}
