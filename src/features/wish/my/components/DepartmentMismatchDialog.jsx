import { IconChevronRight } from '@tabler/icons-react';
import { DialogFrame } from './DialogFrame';
import { DialogOverlay } from './DialogOverlay';
/**
 * 학과 불일치 팝업 (Figma 1297:4864)
 *
 * 인증을 누른 시점에 회원 학과와 학교 학적정보의 학과가 다르면 뜬다.
 * 다음으로를 누르면 학교 학적정보 기준으로 학과가 바뀐다.
 */
export function DepartmentMismatchDialog({ mismatch, onNext, isPending, onClose, }) {
    const fieldClass = 'absolute left-[23.664cqw] flex h-[12.723cqw] w-[52.672cqw] items-center rounded-[1.018cqw] border border-gray-01 bg-white pl-[4.476cqw] text-[3.562cqw] text-purple';
    return (<DialogOverlay onClose={onClose}>
      <DialogFrame title="학생인증" height="117.557cqw" onClose={onClose}>
        <p className="absolute top-[38.677cqw] left-1/2 w-[59.287cqw] -translate-x-1/2 text-center text-[3.562cqw] font-medium text-gray-04 underline">
          수윙스 정보를 바탕으로
          <br />
          학과정보가 자동 수정됩니다
        </p>

        <span className="absolute top-[59.033cqw] left-[12.723cqw] -translate-x-1/2 text-center text-[4.071cqw] leading-[1.15] font-semibold text-purple">
          현재 회원
          <br />
          정보
        </span>
        <p className={`${fieldClass} top-[58.524cqw]`}>{mismatch.currentDepartment}</p>

        <span className="absolute top-[79.644cqw] left-[13.359cqw] -translate-x-1/2 text-[4.071cqw] font-semibold whitespace-nowrap text-purple">
          Su-wings
        </span>
        <p className={`${fieldClass} top-[76.336cqw]`}>{mismatch.schoolDepartment}</p>

        <button type="button" onClick={onNext} disabled={isPending} className="absolute top-[96.692cqw] left-[9.924cqw] h-[12.723cqw] w-[65.394cqw] rounded-full bg-blue disabled:opacity-60">
          <span className="absolute top-[3.053cqw] left-[23.409cqw] w-[15.776cqw] text-center text-[4.071cqw] font-medium text-white">
            다음으로
          </span>
          <IconChevronRight aria-hidden className="absolute top-[3.307cqw] left-[39.186cqw] size-[6.107cqw] text-white"/>
        </button>
      </DialogFrame>
    </DialogOverlay>);
}
