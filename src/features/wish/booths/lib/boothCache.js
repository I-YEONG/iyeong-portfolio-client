/** 저장 형식이 바뀌면 버전을 올려 이전 값을 버린다. */
const STORAGE_KEY = 'portfolio:wish:demo-booths:v1';
/**
 * 마지막으로 받은 부스 목록을 기기에 남겨 두고, 다음 방문 때 먼저 보여 준다.
 * 서버 응답이 수 초씩 걸릴 때가 있어서, 거의 바뀌지 않는 부스 정보는 먼저 그리고 뒤에서 새로 받는다.
 *
 * 북마크 여부는 사용자마다 달라 저장하지 않는다. (다른 계정의 북마크가 비치지 않도록)
 * 저장소를 쓸 수 없는 환경(사생활 보호 모드 등)에서는 조용히 건너뛴다.
 */
export function readCachedBooths() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw)
            return undefined;
        const booths = JSON.parse(raw);
        if (!Array.isArray(booths) || !booths.every(isBoothLike))
            return undefined;
        return booths;
    }
    catch {
        return undefined;
    }
}
export function writeCachedBooths(booths) {
    try {
        const stripped = booths.map((booth) => ({ ...booth, favorited: false }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stripped));
    }
    catch {
        // 저장 공간이 없거나 막혀 있으면 캐시 없이 동작한다.
    }
}
function isBoothLike(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'id' in value &&
        'name' in value &&
        'latitude' in value &&
        'longitude' in value);
}
