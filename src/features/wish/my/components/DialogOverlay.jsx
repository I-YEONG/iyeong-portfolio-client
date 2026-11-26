/**
 * 팝업 뒤 배경 (Figma 1233:3725)
 * 디자인 값 그대로 blur 5px + 검정 10%를 쓴다.
 */
export function DialogOverlay({ onClose, children }) {
    return (<div className="fixed inset-0 z-50 flex items-center justify-center">
      <button type="button" aria-label="닫기" onClick={onClose} className="absolute inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-[5px]"/>
      <div className="@container pointer-events-none relative flex w-full max-w-mobile justify-center">
        <div className="pointer-events-auto">{children}</div>
      </div>
    </div>);
}
