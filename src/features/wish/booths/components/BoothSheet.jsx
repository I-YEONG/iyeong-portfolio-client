import { useLayoutEffect, useRef, useState, } from 'react';
/** 시안 852px 기준의 시트 상단 위치(지도->끝까지올림 128, ->반만 402, ->맨아래 660). */
const SNAP_RATIOS = {
    expanded: 128 / 852,
    half: 402 / 852,
    collapsed: 660 / 852,
};
const SNAP_ORDER = ['expanded', 'half', 'collapsed'];
function nearestSnap(ratio) {
    return SNAP_ORDER.reduce((closest, candidate) => Math.abs(SNAP_RATIOS[candidate] - ratio) < Math.abs(SNAP_RATIOS[closest] - ratio)
        ? candidate
        : closest);
}
/** 손잡이를 끌어 세 단계로 여닫는 부스 목록 시트. */
export function BoothSheet({ elementRef: sheetRef, snap, onSnapChange, onLayoutChange, children, }) {
    const dragRef = useRef(null);
    const [dragTop, setDragTop] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    useLayoutEffect(() => {
        const sheet = sheetRef.current;
        if (!sheet)
            return;
        let frame = 0;
        let previous = null;
        const measure = () => {
            const targetTop = SNAP_RATIOS[snap] * (sheet.parentElement?.clientHeight ?? 0);
            const isAnimating = sheet
                .getAnimations()
                .some((animation) => animation.playState === 'running' || animation.pending);
            const isMoving = dragRef.current !== null || isAnimating || Math.abs(sheet.offsetTop - targetTop) > 1;
            const layout = { top: sheet.getBoundingClientRect().top, isMoving, snap };
            if (!previous || previous.top !== layout.top || previous.isMoving !== isMoving) {
                previous = layout;
                onLayoutChange(layout);
            }
            if (isMoving && dragRef.current === null)
                frame = requestAnimationFrame(measure);
        };
        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(measure);
        };
        const observer = new ResizeObserver(schedule);
        observer.observe(sheet);
        if (sheet.parentElement)
            observer.observe(sheet.parentElement);
        schedule();
        window.visualViewport?.addEventListener('resize', schedule);
        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            window.visualViewport?.removeEventListener('resize', schedule);
        };
    }, [snap, dragTop, isDragging, onLayoutChange, sheetRef]);
    const handlePointerDown = (event) => {
        const sheet = sheetRef.current;
        const areaHeight = sheet?.parentElement?.clientHeight ?? 0;
        if (!sheet || areaHeight === 0)
            return;
        // 끄는 동안에는 실제로 그려진 위치에서 이어가야 도중에 튀지 않는다.
        dragRef.current = {
            pointerY: event.clientY,
            top: sheet.offsetTop,
            lastTop: sheet.offsetTop,
            areaHeight,
        };
        setIsDragging(true);
        onLayoutChange({ top: sheet.getBoundingClientRect().top, isMoving: true, snap });
        event.currentTarget.setPointerCapture(event.pointerId);
    };
    const handlePointerMove = (event) => {
        const drag = dragRef.current;
        if (!drag)
            return;
        const min = SNAP_RATIOS.expanded * drag.areaHeight;
        const max = SNAP_RATIOS.collapsed * drag.areaHeight;
        const next = drag.top + (event.clientY - drag.pointerY);
        drag.lastTop = Math.min(Math.max(next, min), max);
        setDragTop(drag.lastTop);
    };
    const handlePointerUp = (event) => {
        const drag = dragRef.current;
        if (!drag)
            return;
        dragRef.current = null;
        setIsDragging(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        onSnapChange(nearestSnap(drag.lastTop / drag.areaHeight));
        setDragTop(null);
        // 단순한 손잡이 클릭도 이동 중 상태를 해제해야 한다.
        if (sheetRef.current) {
            onLayoutChange({ top: sheetRef.current.getBoundingClientRect().top, isMoving: true, snap });
        }
    };
    return (<div ref={sheetRef} 
    // 비율로 두면 높이를 재지 않아도 첫 그림부터 제자리에 놓인다.
    style={{ top: dragTop ?? `${SNAP_RATIOS[snap] * 100}%` }} className={[
            'absolute inset-x-0 bottom-0 z-20 flex flex-col rounded-t-[20px] bg-white shadow-[0_0_4px_rgb(0_0_0/0.25)]',
            dragTop === null
                ? 'transition-[top] duration-300 ease-out motion-reduce:transition-none'
                : '',
        ].join(' ')}>
      {/* 손잡이만 끌 수 있게 둔다. 목록은 그대로 스크롤되어야 한다. */}
      <div role="slider" tabIndex={0} aria-label="부스 목록 높이" aria-valuemin={0} aria-valuemax={SNAP_ORDER.length - 1} aria-valuenow={SNAP_ORDER.length - 1 - SNAP_ORDER.indexOf(snap)} aria-valuetext={{ expanded: '가장 크게', half: '절반', collapsed: '가장 작게' }[snap]} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp} onLostPointerCapture={handlePointerUp} onKeyDown={(event) => {
            const index = SNAP_ORDER.indexOf(snap);
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (index > 0)
                    onSnapChange(SNAP_ORDER[index - 1]);
            }
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (index < SNAP_ORDER.length - 1)
                    onSnapChange(SNAP_ORDER[index + 1]);
            }
        }} className="grid h-10 shrink-0 cursor-grab touch-none place-items-center pt-4">
        <span aria-hidden="true" className="h-[3px] w-[104px] rounded-full bg-gray-01"/>
      </div>

      {children}
    </div>);
}
