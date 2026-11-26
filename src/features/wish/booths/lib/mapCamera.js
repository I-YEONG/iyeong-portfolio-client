function isUsableRect(rect) {
    return ([rect.left, rect.top, rect.width, rect.height].every(Number.isFinite) &&
        rect.width > 0 &&
        rect.height > 0);
}
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function getZoomRange(min, max) {
    const minimum = Number.isFinite(min) ? min : 0;
    const maximum = Number.isFinite(max) ? max : 21;
    return { min: Math.min(minimum, maximum), max: Math.max(minimum, maximum) };
}
/** 화면과 시트에 가리지 않는 지도 사각형을 지도 내부 좌표로 구한다. */
export function getVisibleMapArea(mapRect, sheetTop, viewport) {
    if (!isUsableRect(mapRect) || !isUsableRect(viewport) || Number.isNaN(sheetTop))
        return null;
    const left = Math.max(mapRect.left, viewport.left);
    const top = Math.max(mapRect.top, viewport.top);
    const right = Math.min(mapRect.left + mapRect.width, viewport.left + viewport.width);
    const bottom = Math.min(mapRect.top + mapRect.height, viewport.top + viewport.height, sheetTop);
    if (right <= left || bottom <= top)
        return null;
    return {
        left: left - mapRect.left,
        top: top - mapRect.top,
        width: right - left,
        height: bottom - top,
        mapWidth: mapRect.width,
        mapHeight: mapRect.height,
    };
}
/** 마커와 이름을 표시할 공간이 부족할 때에는 카메라 이동을 보류한다. */
export function canFocusMap(area) {
    return (isUsableRect(area) &&
        Number.isFinite(area.mapWidth) &&
        Number.isFinite(area.mapHeight) &&
        area.mapWidth > 0 &&
        area.mapHeight > 0 &&
        area.width >= 96 &&
        area.height >= 128);
}
/** 선택 시 19~20 배율을 유지하되 SDK가 지원하는 범위를 우선한다. */
export function getSelectionZoom(current, min = 0, max = 21) {
    const range = getZoomRange(min, max);
    const minimum = clamp(19, range.min, range.max);
    const maximum = clamp(20, range.min, range.max);
    return clamp(Number.isNaN(current) ? minimum : current, minimum, maximum);
}
/** 선택 좌표가 가시영역 중앙에 놓이도록 지도 중심에 더할 화면 오프셋이다. */
export function getCameraOffset(area) {
    return {
        x: area.mapWidth / 2 - (area.left + area.width / 2),
        y: area.mapHeight / 2 - (area.top + area.height / 2),
    };
}
/** 투영 좌표의 부스들이 가시영역 안에 들어오는 중심과 배율을 구한다. */
export function getOverviewCamera(points, area, factor, minZoom, maxZoom) {
    if (points.length === 0 ||
        !canFocusMap(area) ||
        points.some(({ x, y }) => !Number.isFinite(x) || !Number.isFinite(y))) {
        return null;
    }
    // 우측 상단 전체 보기 버튼과 마커 크기를 위한 여백을 남긴다.
    const horizontalScale = Math.min(1, (area.width - 1) / 64);
    const verticalScale = Math.min(1, (area.height - 1) / 96);
    const innerArea = {
        ...area,
        left: area.left + 32 * horizontalScale,
        top: area.top + 64 * verticalScale,
        width: area.width - 64 * horizontalScale,
        height: area.height - 96 * verticalScale,
    };
    let minX = points[0].x;
    let maxX = points[0].x;
    let minY = points[0].y;
    let maxY = points[0].y;
    for (const { x, y } of points) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
    }
    const range = getZoomRange(minZoom, maxZoom);
    const maximum = clamp(19, range.min, range.max);
    const boundsWidth = maxX - minX;
    const boundsHeight = maxY - minY;
    let zoom = maximum;
    if (boundsWidth > 0 || boundsHeight > 0) {
        // 최소 배율에서도 다 들어오지 않으면 SDK 최소 배율까지 축소한다.
        zoom = range.min;
        for (let candidate = Math.floor(maximum); candidate >= range.min; candidate--) {
            const scale = factor(candidate);
            if (Number.isFinite(scale) &&
                scale > 0 &&
                boundsWidth * scale <= innerArea.width &&
                boundsHeight * scale <= innerArea.height) {
                zoom = candidate;
                break;
            }
        }
    }
    const scale = factor(zoom);
    if (!Number.isFinite(scale) || scale <= 0)
        return null;
    const offset = getCameraOffset(innerArea);
    return {
        center: {
            x: minX + boundsWidth / 2 + offset.x / scale,
            y: minY + boundsHeight / 2 + offset.y / scale,
        },
        zoom,
    };
}
