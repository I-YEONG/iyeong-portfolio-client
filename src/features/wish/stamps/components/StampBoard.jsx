import { useEffect, useId, useRef, useState } from 'react';
import tooltipArrow from '@/assets/wish/stamps/tooltip-arrow.svg';
import { cqw, STAMP_CONNECTIONS, STAMP_STARS } from '../lib/artwork';
/** 별을 눌러 적립한 부스명을 확인하는 별자리 스탬프판. 적립 상태는 서버 데이터만 따른다. */
export function StampBoard({ slots }) {
    const [selectedBoothId, setSelectedBoothId] = useState(null);
    const boardRef = useRef(null);
    const tooltipId = useId();
    const selectedIndex = slots.findIndex((stamp) => stamp?.boothId === selectedBoothId);
    const selectedStamp = selectedIndex >= 0 ? slots[selectedIndex] : null;
    const selectedStar = selectedIndex >= 0 ? STAMP_STARS[selectedIndex] : null;
    useEffect(() => {
        if (selectedBoothId === null)
            return;
        const dismissOutside = (event) => {
            if (event.target instanceof Node && !boardRef.current?.contains(event.target)) {
                setSelectedBoothId(null);
            }
        };
        const dismissEscape = (event) => {
            if (event.key === 'Escape')
                setSelectedBoothId(null);
        };
        document.addEventListener('pointerdown', dismissOutside);
        document.addEventListener('keydown', dismissEscape);
        return () => {
            document.removeEventListener('pointerdown', dismissOutside);
            document.removeEventListener('keydown', dismissEscape);
        };
    }, [selectedBoothId]);
    return (<div ref={boardRef} aria-label="나의 부스 스탬프" className="absolute inset-0" onPointerDown={(event) => {
            if (event.target === event.currentTarget)
                setSelectedBoothId(null);
        }}>
      <svg aria-hidden viewBox="0 113 393 739" focusable="false" className="pointer-events-none absolute top-0 left-0 block h-auto w-full overflow-visible">
        {STAMP_CONNECTIONS.map((line) => (<image key={line.src} href={line.src} x={line.x} y={line.y} width={line.width} height={line.height} transform={'transform' in line ? line.transform : undefined}/>))}
        {STAMP_STARS.map((star, index) => {
            const filled = Boolean(slots[index]);
            const external = index === 5;
            const geometry = !filled
                ? star.emptyGeometry
                : {
                    x: star.x,
                    y: star.y,
                    width: external ? 119 : 114,
                    height: external ? 114 : 110,
                };
            return <image key={star.empty} href={filled ? star.filled : star.empty} {...geometry}/>;
        })}
      </svg>

      {STAMP_STARS.map((star, index) => {
            const stamp = slots[index];
            const selected = Boolean(stamp && stamp.boothId === selectedBoothId);
            return (<button key={star.empty} type="button" disabled={!stamp} aria-label={stamp
                    ? `${index + 1}번째 스탬프: ${stamp.boothName}`
                    : `${index + 1}번째 스탬프, 아직 받지 않음`} aria-expanded={stamp ? selected : undefined} aria-controls={selected ? tooltipId : undefined} onClick={() => {
                    if (stamp)
                        setSelectedBoothId(selected ? null : stamp.boothId);
                }} className="absolute z-10 cursor-pointer rounded-[25%] disabled:cursor-default" style={{
                    left: cqw(star.left),
                    top: cqw(star.top - 113),
                    width: cqw(index === 5 ? 98 : 94),
                    height: cqw(index === 5 ? 94 : 90),
                }}>
            {index === 5 && !stamp ? (<span aria-hidden className="absolute inset-0 flex items-center justify-center text-center text-[4.071cqw] leading-[1.2] font-medium text-white [text-shadow:0_0_4px_#0015FF]">
                외부
                <br />
                부스
              </span>) : null}
          </button>);
        })}

      {selectedStamp && selectedStar ? (<div id={tooltipId} role="status" className="pointer-events-none absolute z-20 w-max -translate-x-1/2 rounded-full bg-white px-[4.071cqw] py-[1.018cqw] text-center text-[3.562cqw] leading-[1.45] font-light break-words text-purple shadow-[0_0_6px_#BC9CFF]" style={{
                left: cqw(selectedStar.tooltipX),
                maxWidth: cqw(Math.min(252, 2 * Math.min(selectedStar.tooltipX - 8, 385 - selectedStar.tooltipX))),
                top: cqw((selectedIndex === 5 ? 642 : selectedStar.tooltipY) - 113),
            }}>
          <img src={tooltipArrow} alt="" width={15} height={20} className="absolute h-auto w-[3.817cqw] max-w-none -translate-x-1/2" style={{
                left: '50%',
                ...(selectedIndex === 5
                    ? { bottom: cqw(-12) }
                    : { top: cqw(-12), transform: 'scaleY(-1)' }),
            }}/>
          <span className="relative">{selectedStamp.boothName}</span>
        </div>) : null}
    </div>);
}
