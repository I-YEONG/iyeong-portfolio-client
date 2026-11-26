export const env = {
    /** 비어 있으면 상대 경로(/api/...)로 요청한다. 개발 중에는 Vite 프록시를 탄다. */
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
    /**
     * 네이버 지도 JS SDK 인증 키(Client ID). 공개돼도 되는 값이라 번들에 포함한다.
     * Client Secret은 서버 전용이므로 여기에 두지 않는다.
     */
    naverMapClientId: import.meta.env.VITE_NAVER_MAP_CLIENT_ID ?? '',
};
