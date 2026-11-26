import { env } from '@/features/wish/shared/constants/env';
const SDK_SRC = 'https://oapi.map.naver.com/openapi/v3/maps.js';
const SCRIPT_ID = 'naver-maps-sdk';
export const AUTH_FAILURE_MESSAGE = '지도 인증에 실패했습니다. 네이버 클라우드 콘솔에 이 주소가 웹 서비스 URL로 등록돼 있는지 확인해 주세요.';
export class NaverMapLoadError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NaverMapLoadError';
    }
}
let pending = null;
/**
 * 인증 실패는 스크립트 로드가 끝난 뒤에 따로 통보된다.
 * 그때는 이미 지도 객체를 만든 뒤라 Promise로는 전할 수 없어 구독으로 알린다.
 */
const authFailureListeners = new Set();
let authFailed = false;
export function onNaverMapAuthFailure(listener) {
    if (authFailed)
        listener();
    authFailureListeners.add(listener);
    return () => {
        authFailureListeners.delete(listener);
    };
}
function notifyAuthFailure() {
    authFailed = true;
    authFailureListeners.forEach((listener) => listener());
}
function findScript() {
    return document.getElementById(SCRIPT_ID);
}
/**
 * 네이버 지도 SDK를 한 번만 불러온다.
 * 인증 실패는 스크립트 로드 성공 뒤에 별도 전역 훅으로 오기 때문에 함께 감시한다.
 */
export function loadNaverMaps() {
    if (typeof window === 'undefined') {
        return Promise.reject(new NaverMapLoadError('브라우저에서만 지도를 불러올 수 있습니다.'));
    }
    if (authFailed)
        return Promise.reject(new NaverMapLoadError(AUTH_FAILURE_MESSAGE));
    if (window.naver?.maps)
        return Promise.resolve(window.naver.maps);
    if (pending)
        return pending;
    const clientId = env.naverMapClientId;
    if (!clientId) {
        return Promise.reject(new NaverMapLoadError('지도 키(VITE_NAVER_MAP_CLIENT_ID)가 설정되지 않았습니다.'));
    }
    pending = new Promise((resolve, reject) => {
        const fail = (message) => {
            pending = null;
            reject(new NaverMapLoadError(message));
        };
        window.navermap_authFailure = () => {
            notifyAuthFailure();
            fail(AUTH_FAILURE_MESSAGE);
        };
        const script = findScript() ?? document.createElement('script');
        script.id = SCRIPT_ID;
        script.async = true;
        // 통합 콘솔로 바뀐 뒤 공식 파라미터는 ncpKeyId 하나다. 구 콘솔의 ncpClientId는 쓰지 않는다.
        script.src = `${SDK_SRC}?ncpKeyId=${encodeURIComponent(clientId)}`;
        script.addEventListener('error', () => fail('지도를 불러오지 못했습니다.'), { once: true });
        script.addEventListener('load', () => {
            if (window.naver?.maps)
                resolve(window.naver.maps);
            else
                fail('지도를 불러오지 못했습니다.');
        }, { once: true });
        if (!script.isConnected)
            document.head.append(script);
    });
    return pending;
}
