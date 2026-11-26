import { IconChevronDown, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';
import stepDots from '@/assets/wish/my/step-dots.svg';
import { DEPARTMENT_OPTIONS } from '@/features/wish/shared/constants/departments';
import { ApiError } from '@/features/wish/shared/lib/api-client';
import { useUpdateProfile } from '../hooks/useUpdateProfile';
import { buildProfileUpdate, toProfileEditValues } from '../lib/profileEdit';
import { DialogFrame } from './DialogFrame';
import { DialogOverlay } from './DialogOverlay';
const GRADES = [1, 2, 3, 4, 5, 6];
/**
 * 정보 수정 1단계 — 전화번호 · 학과 · 학년 (Figma 1233:3657)
 *
 * 박스 기준 좌표를 cqw로 환산해 배치한다. (1px = 0.2545cqw)
 */
export function ProfileEditDialog({ profile, onClose, onCompleted }) {
    const [initialValues] = useState(() => toProfileEditValues(profile));
    const [phone, setPhone] = useState(initialValues.phone);
    const [department, setDepartment] = useState(initialValues.department);
    const [grade, setGrade] = useState(initialValues.grade);
    const [enrollment, setEnrollment] = useState(initialValues.enrollment);
    const updateProfile = useUpdateProfile();
    const handleSubmit = () => {
        const body = buildProfileUpdate(initialValues, { phone, department, grade, enrollment });
        if (Object.keys(body).length === 0) {
            onCompleted();
            return;
        }
        updateProfile.mutate(body, { onSuccess: onCompleted });
    };
    const inputClass = 'absolute left-[23.537cqw] h-[12.723cqw] w-[57.252cqw] rounded-[1.018cqw] border border-gray-01 bg-white px-[4.224cqw] text-[3.562cqw] text-purple';
    return (<DialogOverlay onClose={onClose}>
      <DialogFrame title="정보 수정" height="124.173cqw" onClose={onClose}>
        {/* 전화번호 */}
        <span className="absolute top-[47.328cqw] left-[4.453cqw] w-[16.285cqw] text-center text-[3.817cqw] font-semibold text-purple">
          전화번호
        </span>
        <input type="tel" inputMode="numeric" aria-label="전화번호" value={phone} onChange={(event) => setPhone(event.target.value)} className={`${inputClass} top-[44.02cqw]`}/>

        {/* 학과 */}
        <span className="absolute top-[65.14cqw] left-[8.779cqw] text-[4.071cqw] font-semibold text-purple">
          학과
        </span>
        <select aria-label="학과" value={department} onChange={(event) => setDepartment(event.target.value)} className={`${inputClass} top-[61.832cqw] appearance-none`}>
          <option value="">선택</option>
          {DEPARTMENT_OPTIONS.map((option) => (<option key={option} value={option}>
              {option}
            </option>))}
        </select>
        <IconChevronDown aria-hidden stroke={1.5} className="pointer-events-none absolute top-[62.087cqw] left-[71.628cqw] size-[6.107cqw] text-gray-01"/>

        {/* 학년 · 재학 여부 */}
        <span className="absolute top-[82.952cqw] left-[8.27cqw] text-[4.071cqw] font-semibold text-purple">
          학년
        </span>
        <div className={`${inputClass} top-[79.644cqw] px-0`} aria-hidden/>
        <select aria-label="학년" value={grade} onChange={(event) => setGrade(event.target.value)} className="absolute top-[81.679cqw] left-[27.863cqw] h-[6.107cqw] w-[14.249cqw] appearance-none bg-transparent text-[3.562cqw] text-purple">
          <option value="">-</option>
          {GRADES.map((value) => (<option key={value} value={value}>
              {value}
            </option>))}
        </select>
        <IconChevronDown aria-hidden stroke={1.5} className="pointer-events-none absolute top-[81.679cqw] left-[42.112cqw] size-[6.107cqw] text-gray-01"/>
        <button type="button" onClick={() => setEnrollment('ENROLLED')} className={`absolute top-[81.679cqw] left-[52.799cqw] rounded-[1.018cqw] px-[2.545cqw] py-[1.527cqw] text-[3.562cqw] text-white ${enrollment === 'ENROLLED' ? 'bg-blue' : 'bg-gray-04'}`}>
          재학
        </button>
        <button type="button" onClick={() => setEnrollment('LEAVE')} className={`absolute top-[81.679cqw] left-[67.049cqw] rounded-[1.018cqw] px-[2.545cqw] py-[1.527cqw] text-[3.562cqw] text-white ${enrollment === 'LEAVE' ? 'bg-blue' : 'bg-gray-04'}`}>
          휴학
        </button>

        {updateProfile.isError ? (<p className="absolute top-[91.6cqw] left-1/2 w-[76.336cqw] -translate-x-1/2 text-center text-[3.053cqw] text-red">
            {updateProfile.error instanceof ApiError
                ? updateProfile.error.message
                : '정보를 수정하지 못했습니다.'}
          </p>) : null}

        <img src={stepDots} alt="" aria-hidden className="absolute top-[96.947cqw] left-1/2 h-[2.036cqw] w-[4.835cqw] -translate-x-1/2"/>

        <button type="button" onClick={onClose} className="absolute top-[104.071cqw] left-[5.725cqw] flex h-[12.723cqw] w-[30.534cqw] items-center justify-center gap-[1cqw] rounded-full bg-gray-02 text-[3.562cqw] font-medium text-white">
          <IconChevronLeft aria-hidden className="size-[6.107cqw]"/>
          이전
        </button>
        <button type="button" onClick={handleSubmit} disabled={updateProfile.isPending} className="absolute top-[104.071cqw] left-[49.237cqw] flex h-[12.723cqw] w-[30.534cqw] items-center justify-center gap-[1cqw] rounded-full bg-blue text-[3.562cqw] font-medium text-white disabled:opacity-60">
          다음
          <IconChevronRight aria-hidden className="size-[6.107cqw]"/>
        </button>
      </DialogFrame>
    </DialogOverlay>);
}
