import { IconAlertTriangle } from '@tabler/icons-react';
import { DialogFrame } from './DialogFrame';
import { DialogOverlay } from './DialogOverlay';
/**
 * 학생인증 시작 팝업 (Figma 1297:4800 미완료자 · 1297:4876 불일치자 재인증)
 *
 * 두 화면이 완전히 같아 하나로 처리한다. 이름·학번·학과는 확인용이라
 * 읽기 전용으로 보여준다.
 */
export function StudentVerifyDialog({ profile, onVerify, isPending, hasFailed, onClose, }) {
    const rows = [
        { label: '이름', value: profile.name },
        { label: '학번', value: profile.studentNo },
        { label: '학과', value: profile.department },
    ];
    return (<DialogOverlay onClose={onClose}>
      <div className="relative">
        <DialogFrame title="학생인증" height="130.534cqw" onClose={onClose}>
          <p className="absolute top-[40.712cqw] left-1/2 -translate-x-1/2 text-[3.562cqw] font-medium whitespace-nowrap text-gray-04 underline">
            내 정보가 정확한지 확인해주세요
          </p>

          {rows.map((row, index) => (<div key={row.label}>
              <span className="absolute left-[8.906cqw] text-[4.071cqw] font-semibold text-purple" style={{ top: `${56.743 + index * 17.812}cqw` }}>
                {row.label}
              </span>
              <p className="absolute left-[23.664cqw] flex h-[12.723cqw] w-[52.672cqw] items-center rounded-[1.018cqw] border border-gray-01 bg-white pl-[4.476cqw] text-[3.562cqw] text-purple" style={{ top: `${53.435 + index * 17.812}cqw` }}>
                {row.value}
              </p>
            </div>))}

          <button type="button" onClick={onVerify} disabled={isPending} className="absolute top-[109.656cqw] left-[9.924cqw] h-[12.723cqw] w-[65.394cqw] rounded-full bg-blue text-[4.071cqw] font-medium text-white disabled:opacity-60">
            학생인증 완료
          </button>
        </DialogFrame>

        {/* 박스 아래 경고 문구 (Figma 1285:4381) */}
        {hasFailed ? (<p className="absolute top-[134.605cqw] left-1/2 -translate-x-1/2 text-[4.071cqw] font-medium whitespace-nowrap text-white">
            <IconAlertTriangle aria-hidden className="mr-[1.527cqw] inline size-[4.834cqw] align-[-0.2em]"/>
            학적 정보를 불러오는데 실패했습니다.
          </p>) : null}
      </div>
    </DialogOverlay>);
}
