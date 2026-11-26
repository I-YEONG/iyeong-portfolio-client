/**
 * 앱의 모든 URL. 경로 문자열은 여기서만 정의하고 코드에서는 ROUTES.XXX로 참조한다.
 * 파라미터가 있는 경로는 react-router의 generatePath로 채운다.
 *   generatePath(ROUTES.BOOTH_DETAIL, { id: 3 }) → '/booths/3'
 */
export const ROUTES = {
    /** 첫페이지 — 로그인/회원가입, 게스트 입장 */
    LANDING: '/',
    LOGIN: '/login',
    SIGNUP: '/signup',
    SCHOOL_SSO_CALLBACK: '/temporary-auth',
    SCHOOL_SSO_RESULT: '/auth/school/result',
    /** 메인 */
    HOME: '/home',
    /** 부스맵 · 스탬프 */
    BOOTHS: '/booths',
    BOOTH_DETAIL: '/booths/:id',
    STAMPS: '/stamps',
    /** 연예인 공개 */
    PERFORMANCES: '/performances',
    PERFORMANCE_DETAIL: '/performances/:id',
    /** 120주년 축하편지 */
    LETTERS: '/letters',
    LETTER_WRITE: '/letters/write',
    /** 투표 */
    POLLS: '/polls',
    POLL_DETAIL: '/polls/:id',
    /** 대나무숲 (익명 채팅) */
    BAMBOO: '/bamboo',
    /** 공지사항 · 분실물 · 협찬사 */
    NOTICES: '/notices',
    NOTICE_DETAIL: '/notices/:id',
    LOST_ITEMS: '/lost-items',
    LOST_ITEM_DETAIL: '/lost-items/:id',
    SPONSORS: '/sponsors',
    /** 학생회 인사/만든 사람들 */
    ABOUT: '/about',
    /** 마이페이지 */
    MY: '/my',
};
Object.keys(ROUTES).forEach((key) => {
    ROUTES[key] = `/project/wish${ROUTES[key] === '/' ? '' : ROUTES[key]}`;
});
