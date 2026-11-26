import { ProfanityEngine } from 'profanity-guard';
/**
 * 라이브러리 사전에 없는 흔한 한글 축약·변형을 보완한다.
 * 서버 검증을 대체하지 않는 클라이언트 측 1차 차단이다.
 */
const koreanProfanityFilter = new ProfanityEngine({
    language: 'ko',
    addWords: [
        '시발',
        '시팔',
        'ㅅㅂ',
        'ㅆㅂ',
        'ㅅㄲ',
        'ㅂㅅ',
        'ㅄ',
        'ㅈㄴ',
        'ㅈㄹ',
        'ㄱㅅㄲ',
        'ㄲㅈ',
        '썅',
        '썅년',
        '개년',
    ],
});
// 영어 사전은 약 15KB 수준이며, 별도 모델·네트워크 요청 없이 메모리에서 검사한다.
const englishProfanityFilter = new ProfanityEngine({ language: 'en' });
const resultCache = new Map();
const CACHE_LIMIT = 100;
// 같은 후보를 다시 정규화·검사하지 않고, 최근 결과를 제한된 메모리에서 재사용한다.
function createCachedCheck(engine) {
    const cache = new Map();
    return (value) => {
        const cached = cache.get(value);
        if (cached !== undefined)
            return cached;
        const result = engine.check(value);
        cacheResult(cache, value, result);
        return result;
    };
}
function cacheResult(cache, value, result) {
    if (cache.size >= CACHE_LIMIT) {
        const oldest = cache.keys().next().value;
        if (oldest !== undefined)
            cache.delete(oldest);
    }
    cache.set(value, result);
}
const checkKorean = createCachedCheck(koreanProfanityFilter);
const checkEnglish = createCachedCheck(englishProfanityFilter);
const koreanEvasionPatterns = [/(?:시|씨)[이잇]*[발팔]/u, /[ㅣl]+[발팔]/u];
function normalizeProfanityCandidate(value) {
    return value
        .normalize('NFC')
        .toLowerCase()
        .replace(/[^\p{L}]+/gu, '')
        .replace(/(\p{L})\1{2,}/gu, '$1');
}
function containsKoreanEvasionProfanity(value) {
    return koreanEvasionPatterns.some((pattern) => pattern.test(value));
}
export function containsBambooProfanity(value) {
    const cached = resultCache.get(value);
    if (cached !== undefined)
        return cached;
    const containsHangul = /\p{Script=Hangul}/u.test(value);
    const containsEnglish = /[A-Za-z]/.test(value);
    let result = containsHangul && checkKorean(value);
    if (containsHangul && !result) {
        const candidate = normalizeProfanityCandidate(value);
        if (candidate !== value)
            result = checkKorean(candidate);
        if (!result)
            result = containsKoreanEvasionProfanity(candidate);
    }
    if (!result && containsEnglish)
        result = checkEnglish(value);
    cacheResult(resultCache, value, result);
    return result;
}
export function containsBambooSpam(value) {
    // NFC로 같은 한글 표기를 맞추고, 공백을 제외한 문자·숫자·기호의 연속 반복을 검사한다.
    return /(\S)\1{9}/u.test(value.normalize('NFC'));
}
export class BambooSpamError extends Error {
    constructor() {
        super('같은 문자나 자음을 10번 이상 연속해서\n사용할 수 없습니다.');
        this.name = 'BambooSpamError';
    }
}
export class BambooProfanityError extends Error {
    constructor() {
        super('대나무숲 운영 정책에 맞지 않는 표현이\n포함되어 있습니다.');
        this.name = 'BambooProfanityError';
    }
}
