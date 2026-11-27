import { useEffect, useRef, useState } from 'react';
import myLocationMarker from '@/assets/wish/booths/marker-my-location.svg';
import { useBoothMapViewport } from '../hooks/useBoothMapViewport';
import { canFocusMap, getCameraOffset, getOverviewCamera, getSelectionZoom } from '../lib/mapCamera';
import { createBoothMarkerIcon, updateBoothMarkerIcon } from '../lib/mapMarker';
import { AUTH_FAILURE_MESSAGE, loadNaverMaps, NaverMapLoadError, onNaverMapAuthFailure, } from '../lib/naverMap';
/** 부스가 모여 있는 대운동장 일대. 좌표를 못 받았을 때의 기본 중심이다. */
const FALLBACK_CENTER = { lat: 37.642692, lng: 127.106437 };
const DEFAULT_ZOOM = 18;
function hasPosition(booth) {
    return booth.latitude !== null && booth.longitude !== null;
}
/**
 * 인증에 실패한 지도에서는 SDK 내부가 비어 있어 정리 중에 예외가 난다.
 * 화면을 내리는 길목이라 여기서 막아 두지 않으면 페이지 전체가 죽는다.
 */
function detachMarkers(markers) {
    markers.forEach((marker) => {
        try {
            window.naver?.maps.Event.clearInstanceListeners(marker);
            marker.setMap(null);
        }
        catch {
            // 이미 정리된 마커는 넘어간다.
        }
    });
    markers.clear();
}
/** 네이버 지도를 띄우고 부스 마커를 표시한다. 마커를 누르면 목록 쪽 선택과 맞춘다. */
export function BoothMap({ booths, selectedBoothId, focusRequestId, overviewRequestId = 0, isDataReady, sheetRef, sheetTop, isSheetMoving, onSelectBooth, onShowAll, className, }) {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const markersRef = useRef(new Map());
    const markerContentRef = useRef(new Map());
    const myLocationRef = useRef(null);
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');
    const { area, measureArea } = useBoothMapViewport(containerRef, sheetRef, sheetTop);
    const cameraRef = useRef({
        mode: 'overview',
        focusRequestId: 0,
        overviewRequestId: 0,
        pending: true,
        suspended: false,
    });
    // 인증 실패는 지도를 만든 뒤에 오기도 한다. 그때도 안내로 바꿔 준다.
    useEffect(() => onNaverMapAuthFailure(() => {
        setMessage(AUTH_FAILURE_MESSAGE);
        setStatus('failed');
    }), []);
    // 선택 변경마다 리스너를 다시 달지 않도록 최신 콜백만 참조한다.
    const onSelectRef = useRef(onSelectBooth);
    useEffect(() => {
        onSelectRef.current = onSelectBooth;
    }, [onSelectBooth]);
    useEffect(() => {
        let cancelled = false;
        // 정리 단계에서 쓰려고 effect 안에서 값을 잡아 둔다.
        const markers = markersRef.current;
        const markerContents = markerContentRef.current;
        loadNaverMaps()
            .then((maps) => {
            if (cancelled || !containerRef.current)
                return;
            mapRef.current = new maps.Map(containerRef.current, {
                center: new maps.LatLng(FALLBACK_CENTER.lat, FALLBACK_CENTER.lng),
                zoom: DEFAULT_ZOOM,
                mapDataControl: false,
                scaleControl: false,
                zoomControl: false,
                logoControlOptions: { position: maps.Position.TOP_LEFT },
            });
            setStatus('ready');
        })
            .catch((error) => {
            if (cancelled)
                return;
            setMessage(error instanceof NaverMapLoadError ? error.message : '지도를 불러오지 못했습니다.');
            setStatus('failed');
        });
        return () => {
            cancelled = true;
            detachMarkers(markers);
            markerContents.clear();
            try {
                myLocationRef.current?.setMap(null);
                mapRef.current?.destroy();
            }
            catch {
                // 인증 실패 상태의 지도는 정리할 것이 없다.
            }
            myLocationRef.current = null;
            mapRef.current = null;
        };
    }, []);
    // ID별 마커와 버튼을 유지한다. 북마크 갱신이 키보드 포커스를 지우지 않는다.
    useEffect(() => {
        const map = mapRef.current;
        const maps = window.naver?.maps;
        if (status !== 'ready' || !map || !maps)
            return;
        const markers = markersRef.current;
        const contents = markerContentRef.current;
        const positioned = booths.filter((booth) => booth.id !== null && hasPosition(booth));
        const visibleIds = new Set(positioned.map((booth) => booth.id));
        markers.forEach((marker, id) => {
            if (visibleIds.has(id))
                return;
            detachMarkers(new Map([[id, marker]]));
            markers.delete(id);
            contents.delete(id);
        });
        const labelWidth = area?.width ?? containerRef.current?.clientWidth ?? 196;
        for (const booth of positioned) {
            if (booth.id === null)
                continue;
            const id = booth.id;
            const isSelected = id === selectedBoothId;
            const signature = JSON.stringify([booth.name, booth.category, isSelected, labelWidth]);
            const position = new maps.LatLng(booth.latitude, booth.longitude);
            const existing = markers.get(id);
            const previous = contents.get(id);
            if (existing && previous) {
                if (!existing.getPosition().equals(position))
                    existing.setPosition(position);
                if (previous.signature !== signature) {
                    updateBoothMarkerIcon(previous.content, booth, isSelected, labelWidth);
                    existing.setTitle(booth.name ?? '');
                    existing.setZIndex(isSelected ? 1000 : 2);
                    previous.signature = signature;
                }
                continue;
            }
            const icon = createBoothMarkerIcon(maps, booth, isSelected, labelWidth, (selectedId) => onSelectRef.current(selectedId));
            const marker = new maps.Marker({
                map,
                position,
                title: booth.name ?? undefined,
                zIndex: isSelected ? 1000 : 2,
                icon,
            });
            // SDK 마커 영역이 44px이어도 영역 밖의 두 줄 이름은 잘리지 않아야 한다.
            marker.getElement().style.overflow = 'visible';
            maps.Event.addListener(marker, 'click', () => onSelectRef.current(id));
            markers.set(id, marker);
            contents.set(id, { content: icon.content, signature });
        }
    }, [booths, selectedBoothId, status, area?.width]);
    // 마커 데이터 갱신과 카메라 요청을 구분한다. 시트가 멈췄을 때만 이동한다.
    useEffect(() => {
        const camera = cameraRef.current;
        const map = mapRef.current;
        const maps = window.naver?.maps;
        if (camera.focusRequestId !== focusRequestId) {
            camera.focusRequestId = focusRequestId;
            camera.mode = selectedBoothId === null ? 'manual' : 'selection';
            camera.pending = selectedBoothId !== null;
            camera.suspended = false;
            if (camera.pending && status === 'ready')
                map?.stop();
        }
        if (camera.overviewRequestId !== overviewRequestId) {
            camera.overviewRequestId = overviewRequestId;
            camera.mode = 'overview';
            camera.pending = true;
            camera.suspended = false;
            if (status === 'ready')
                map?.stop();
        }
        if (camera.mode === 'selection' && selectedBoothId === null) {
            if (camera.pending && status === 'ready')
                map?.stop();
            camera.mode = 'manual';
            camera.pending = false;
        }
        if (status !== 'ready' || !map || !maps)
            return;
        // 리스트 높이와 데이터 변경은 측정만 갱신한다. 새 이동 요청이 있어야 카메라를 움직인다.
        if (!camera.pending)
            return;
        // 지난 목록을 먼저 보여 주더라도 첫 범위는 실제 응답을 받은 뒤 맞춘다.
        if (camera.mode === 'overview' && !isDataReady)
            return;
        const currentArea = measureArea();
        if (!currentArea || isSheetMoving || !canFocusMap(currentArea)) {
            if (camera.mode !== 'manual') {
                if (!camera.suspended)
                    map.stop();
                camera.suspended = true;
            }
            return;
        }
        camera.suspended = false;
        map.autoResize();
        const projection = map.getProjection();
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const move = (center, zoom) => {
            map.stop();
            if (reducedMotion) {
                map.setZoom(zoom, false);
                map.setCenter(center);
            }
            else {
                if (map.getZoom() === zoom)
                    map.panTo(center);
                else
                    map.morph(center, zoom);
            }
        };
        if (camera.mode === 'selection') {
            const marker = selectedBoothId === null ? undefined : markersRef.current.get(selectedBoothId);
            if (!marker) {
                // 위치가 없는 선택 요청은 폐기한다. 나중의 데이터 갱신으로 이동하지 않는다.
                camera.mode = 'manual';
                camera.pending = false;
                return;
            }
            const zoom = getSelectionZoom(map.getZoom(), map.getMinZoom(), map.getMaxZoom());
            const point = projection.fromCoordToPoint(marker.getPosition());
            const offset = getCameraOffset(currentArea);
            const scale = projection.factor(zoom);
            if (!Number.isFinite(scale) || scale <= 0) {
                camera.pending = false;
                return;
            }
            const center = projection.fromPointToCoord(new maps.Point(point.x + offset.x / scale, point.y + offset.y / scale));
            move(center, zoom);
            camera.pending = false;
        }
        else if (camera.mode === 'overview') {
            const points = booths
                .filter((booth) => booth.id !== null && hasPosition(booth))
                .map((booth) => projection.fromCoordToPoint(new maps.LatLng(booth.latitude, booth.longitude)));
            const target = getOverviewCamera(points, currentArea, (zoom) => projection.factor(zoom), map.getMinZoom(), map.getMaxZoom());
            if (!target) {
                // 위치나 투영이 유효하지 않으면 요청을 소비해 뒤늦은 자동 이동을 막는다.
                camera.pending = false;
                return;
            }
            move(projection.fromPointToCoord(new maps.Point(target.center.x, target.center.y)), target.zoom);
            camera.pending = false;
        }
    }, [
        booths,
        selectedBoothId,
        focusRequestId,
        overviewRequestId,
        isDataReady,
        area,
        measureArea,
        isSheetMoving,
        status,
    ]);
    // 프로그램 이동 알림 대신 실제 드래그·핀치·휠·키 입력으로 수동 탐색을 판별한다.
    useEffect(() => {
        const map = mapRef.current;
        const maps = window.naver?.maps;
        const container = containerRef.current;
        if (status !== 'ready' || !map || !maps || !container)
            return;
        const manual = () => {
            const wasAuto = cameraRef.current.mode !== 'manual' || cameraRef.current.pending;
            cameraRef.current.mode = 'manual';
            cameraRef.current.pending = false;
            // 자동 이동만 중단한다. 반복 휠·핀치 입력의 SDK 애니메이션은 유지한다.
            if (wasAuto)
                map.stop();
        };
        const keyboard = (event) => {
            if ([
                'ArrowUp',
                'ArrowDown',
                'ArrowLeft',
                'ArrowRight',
                'PageUp',
                'PageDown',
                'Home',
                'End',
                '+',
                '-',
                '=',
            ].includes(event.key)) {
                manual();
            }
        };
        const isMarkerTarget = (target) => target instanceof Node &&
            [...markersRef.current.values()].some((marker) => marker.getElement()?.contains(target));
        const doubleClick = (event) => {
            if (!isMarkerTarget(event.target))
                manual();
        };
        const listeners = ['dragstart', 'pinchstart'].map((event) => maps.Event.addListener(map, event, manual));
        listeners.push(maps.Event.addListener(map, 'doubletap', (event) => {
            if (!isMarkerTarget(event.pointerEvent?.target ?? null))
                manual();
        }));
        // SDK가 새 수동 조작을 시작하기 전에 이전 자동 이동을 취소한다.
        container.addEventListener('wheel', manual, { passive: true, capture: true });
        container.addEventListener('dblclick', doubleClick, true);
        container.addEventListener('keydown', keyboard, true);
        return () => {
            listeners.forEach((listener) => {
                try {
                    maps.Event.removeListener(listener);
                }
                catch {
                    // 인증 실패로 SDK 내부가 사라진 경우에도 화면 정리는 계속한다.
                }
            });
            container.removeEventListener('wheel', manual, true);
            container.removeEventListener('dblclick', doubleClick, true);
            container.removeEventListener('keydown', keyboard, true);
        };
    }, [status]);
    // 내 위치는 권한을 줬을 때만 표시하고, 실패해도 지도는 그대로 둔다.
    useEffect(() => {
        const maps = window.naver?.maps;
        if (status !== 'ready' || !maps || !navigator.geolocation)
            return;
        let cancelled = false;
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const map = mapRef.current;
            if (cancelled || !map)
                return;
            myLocationRef.current?.setMap(null);
            myLocationRef.current = new maps.Marker({
                map,
                position: new maps.LatLng(coords.latitude, coords.longitude),
                zIndex: 1,
                icon: {
                    url: myLocationMarker,
                    size: new maps.Size(26, 26),
                    scaledSize: new maps.Size(26, 26),
                    anchor: new maps.Point(13, 13),
                },
            });
        }, () => { }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 60_000 });
        return () => {
            cancelled = true;
        };
    }, [status]);
    return (<div className={className}>
      <div ref={containerRef} className="isolate size-full" aria-label="부스 지도" role="application" tabIndex={0}/>
      <button type="button" onClick={onShowAll} disabled={status !== 'ready' || !isDataReady} className="absolute top-4 right-4 z-10 rounded-full bg-white px-4 py-2.5 font-body text-[14px] font-semibold text-purple shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue disabled:opacity-50">
        전체 보기
      </button>
      {status === 'failed' && (<div className="absolute inset-0 grid place-items-center bg-gray-01 px-8 text-center font-body text-[14px] text-gray-04">
          {message}
        </div>)}
    </div>);
}
