/**
 * 수집용 route. 전체 URL과 쿼리 문자열은 보내지 않기로 되어 있어
 * 경로에 들어간 값은 `:id`처럼 패턴으로 되돌린다.
 */
export function toRoutePattern(pathname, params) {
    let route = pathname;
    for (const [key, value] of Object.entries(params)) {
        if (value)
            route = route.replace(`/${value}`, `/:${key}`);
    }
    return route;
}
/** route 패턴별 이벤트 종류. 해당하지 않으면 일반 방문으로 본다. */
export function eventTypeForRoute(route) {
    if (route === '/performances/:id')
        return 'PERFORMANCE_DETAIL_VIEW';
    if (route === '/booths/:id')
        return 'BOOTH_DETAIL_VIEW';
    if (route === '/notices/:id')
        return 'NOTICE_DETAIL_VIEW';
    if (route === '/booths')
        return 'MAP_VIEW';
    return 'PAGE_VIEW';
}
