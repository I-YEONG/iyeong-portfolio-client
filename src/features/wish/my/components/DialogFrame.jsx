import dialogClose from '@/assets/wish/my/dialog-close.svg';
import dialogLogo from '@/assets/wish/my/dialog-logo.svg';
/**
 * 마이페이지 팝업 공통 틀 (Figma 1297:4744 등)
 *
 * 흰 박스(336px) + 로고 + 닫기 버튼 + 구분선 제목까지가 모든 팝업에서 같다.
 * 내부 요소는 Figma 박스 기준 좌표를 cqw로 환산해 배치한다. (1px = 0.2545cqw)
 */
export function DialogFrame({ title, height, onClose, children }) {
    return (<div className="relative w-[85.496cqw] rounded-[2.036cqw] bg-white" style={{ height }} role="dialog" aria-modal="true" aria-label={title}>
      <img src={dialogLogo} alt="" aria-hidden className="absolute top-[4.835cqw] left-[29.262cqw] h-[19.518cqw] w-[27.226cqw] max-w-none [filter:drop-shadow(0_0_1.018cqw_rgb(45_125_200))]"/>

      <button type="button" onClick={onClose} aria-label="닫기" className="absolute top-[2.036cqw] left-[73.79cqw] size-[9.669cqw]">
        <img src={dialogClose} alt="" className="size-full"/>
      </button>

      {/* 구분선 사이 제목 (Figma 1297:4704) */}
      <p className="absolute top-[29.517cqw] left-1/2 -translate-x-1/2 text-[3.562cqw] text-gray-04">
        {title}
      </p>
      <span aria-hidden className="absolute top-[32.57cqw] left-[4.325cqw] h-px w-[29.517cqw] bg-gray-01"/>
      <span aria-hidden className="absolute top-[32.57cqw] left-[51.399cqw] h-px w-[29.517cqw] bg-gray-01"/>

      {children}
    </div>);
}
