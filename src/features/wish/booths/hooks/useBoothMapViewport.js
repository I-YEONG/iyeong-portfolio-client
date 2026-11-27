import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { getVisibleMapArea } from '../lib/mapCamera';
function readMeasurements(container) {
    const rect = container.getBoundingClientRect();
    const preview = container.closest('.wish-screen')?.getBoundingClientRect() ?? rect;
    return {
        map: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
        viewport: {
            left: preview.left,
            top: preview.top,
            width: preview.width,
            height: preview.height,
        },
    };
}
/** 주소창·화면 회전·안전 영역을 포함해 실제 노출되는 지도 영역을 잰다. */
export function useBoothMapViewport(containerRef, sheetRef, sheetTop) {
    const [measurements, setMeasurements] = useState(null);
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container)
            return;
        let frame = 0;
        const measure = () => {
            const next = readMeasurements(container);
            setMeasurements((previous) => previous && JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
        };
        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(measure);
        };
        const observer = new ResizeObserver(schedule);
        observer.observe(container);
        schedule();
        window.addEventListener('resize', schedule);
        window.visualViewport?.addEventListener('resize', schedule);
        window.visualViewport?.addEventListener('scroll', schedule);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener('resize', schedule);
            window.visualViewport?.removeEventListener('resize', schedule);
            window.visualViewport?.removeEventListener('scroll', schedule);
        };
    }, [containerRef]);
    const area = useMemo(() => measurements && sheetTop !== null
        ? getVisibleMapArea(measurements.map, sheetTop, measurements.viewport)
        : null, [measurements, sheetTop]);
    // 화면 회전 직후의 요청은 다음 관찰 프레임을 기다리지 않고 현재 DOM으로 계산한다.
    const measureArea = useCallback(() => {
        const container = containerRef.current;
        const sheet = sheetRef.current;
        if (!container || !sheet)
            return null;
        const current = readMeasurements(container);
        return getVisibleMapArea(current.map, sheet.getBoundingClientRect().top, current.viewport);
    }, [containerRef, sheetRef]);
    return { area, measureArea };
}
