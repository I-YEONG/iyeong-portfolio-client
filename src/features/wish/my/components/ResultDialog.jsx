import { DialogFrame } from './DialogFrame';
import { DialogOverlay } from './DialogOverlay';
/**
 * 결과 안내 팝업 (Figma 1268:4134 정보수정 완료 · 1297:4830 학생인증 완료 ·
 * 1297:4720 탈퇴 완료 · 1297:4744 로그아웃 완료)
 *
 * 네 화면이 문구만 다르고 구조가 같아 하나로 처리한다.
 */
export function ResultDialog({ title, message, underline, onClose }) {
    return (<DialogOverlay onClose={onClose}>
      <DialogFrame title={title} height="81.679cqw" onClose={onClose}>
        <p className={`absolute top-[50.891cqw] left-1/2 w-[76.336cqw] -translate-x-1/2 text-center text-[3.562cqw] font-medium text-blue ${underline ? 'underline' : ''}`}>
          {message}
        </p>
      </DialogFrame>
    </DialogOverlay>);
}
