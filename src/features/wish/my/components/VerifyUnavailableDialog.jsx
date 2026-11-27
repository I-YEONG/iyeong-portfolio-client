import { DialogFrame } from './DialogFrame';
import { DialogOverlay } from './DialogOverlay';
/** 문의처. 디자인에 적힌 값을 그대로 쓴다. (Figma 1285:4596) */
const CONTACT = [
    '관리자 : 구교승',
    '이메일 : sahmyook.univ@likelion.org',
    '주소 : 삼육대학교 제1실습관 206호',
];
/**
 * 사유별 본문.
 * alreadyLinked는 Figma 1297:4774 문구 그대로,
 * pendingApproval은 전용 시안이 없어 같은 레이아웃에 문구만 바꿔 쓴다.
 */
const BODY = {
    alreadyLinked: [
        '회원정보와 Su-wings정보가 일치하지 않아 학생인증이 불가합니다.',
        '아래 관리자로 문의하세요.',
    ],
    pendingApproval: [
        '회원정보와 Su-wings정보가 달라 관리자 승인 요청이 접수되었습니다.',
        '승인까지 시간이 걸릴 수 있습니다.',
    ],
};
/** 학생인증 불가·승인 대기 팝업 (Figma 1297:4774) */
export function VerifyUnavailableDialog({ reason, onClose }) {
    const [lead, follow] = BODY[reason];
    return (<DialogOverlay onClose={onClose}>
      <DialogFrame title="학생인증" height="100cqw" onClose={onClose}>
        <p className="absolute top-[44.529cqw] left-[9.924cqw] w-[65.903cqw] text-center text-[3.562cqw] font-medium text-black">
          {lead}
        </p>
        <p className="absolute top-[57.506cqw] left-[9.924cqw] w-[65.903cqw] text-center text-[3.562cqw] font-medium text-black">
          {follow}
        </p>

        <div className="absolute top-[76.081cqw] left-[9.924cqw] w-[65.903cqw] text-[3.562cqw] font-medium text-[#2d5d80]">
          {CONTACT.map((line) => (<p key={line}>{line}</p>))}
        </div>
      </DialogFrame>
    </DialogOverlay>);
}
