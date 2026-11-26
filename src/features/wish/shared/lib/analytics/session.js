const SESSION_KEY = 'analyticsSessionId';
/**
 * 익명 세션 id. 탭이 살아 있는 동안만 유지하고 개인정보는 담지 않는다.
 * sessionStorage를 못 쓰는 환경(사생활 보호 모드 등)에서는 메모리로만 쓴다.
 */
let memorySessionId = null;
function createId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
        return crypto.randomUUID();
    // randomUUID가 없는 환경 대비. 서버는 uuid 형식만 확인한다.
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) => (Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))).toString(16));
}
export function getSessionId() {
    if (memorySessionId)
        return memorySessionId;
    try {
        const saved = sessionStorage.getItem(SESSION_KEY);
        if (saved) {
            memorySessionId = saved;
            return saved;
        }
    }
    catch {
        // 접근이 막혀 있으면 메모리로만 쓴다.
    }
    memorySessionId = createId();
    try {
        sessionStorage.setItem(SESSION_KEY, memorySessionId);
    }
    catch {
        // 저장 실패는 수집 실패로 보지 않는다.
    }
    return memorySessionId;
}
export { createId as createEventId };
