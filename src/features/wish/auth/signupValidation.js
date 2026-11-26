import { DEPARTMENT_OPTIONS, OTHER_DEPARTMENT_OPTION } from '@/features/wish/shared/constants/departments';
export function validateSignupId(value) {
    const length = Array.from(value).length;
    return !value.trim() || length < 4 || length > 50
        ? '아이디는 공백만으로 구성할 수 없으며, 4–50자로 입력해 주세요.'
        : undefined;
}
export function validateSignupEmail(value) {
    const email = value.trim();
    return email.length > 254 || !/^[^\s@]+@[^\s@]+$/.test(email)
        ? '올바른 이메일 주소를 입력해 주세요.'
        : undefined;
}
export function validateSignupPassword(value) {
    return !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])[\x21-\x7E]{8,20}$/.test(value)
        ? '8–20자의 영문 대문자·소문자·숫자·특수문자를 모두 포함해 주세요. 공백은 사용할 수 없습니다.'
        : undefined;
}
export function validateSignupPasswordConfirmation(password, confirmation) {
    if (!confirmation)
        return '비밀번호 확인을 입력해 주세요.';
    return password !== confirmation ? '비밀번호가 일치하지 않습니다.' : undefined;
}
export function validateSignupCode(value) {
    return !value.trim() || value.length < 4 || value.length > 12
        ? '이메일로 받은 인증번호를 4–12자로 입력해 주세요.'
        : undefined;
}
export const normalizePhone = (value) => value.replace(/[ -]/g, '');
export const normalizeManualName = (value) => value.trim();
export const normalizeManualStudentNo = (value) => value.trim();
export function validateManualStudentNo(value) {
    const studentNo = normalizeManualStudentNo(value);
    return !studentNo
        ? '학번을 입력해 주세요.'
        : !/^[0-9]{10}$/.test(studentNo)
            ? '학번은 숫자 10자리로 입력해 주세요.'
            : undefined;
}
export function resolveManualDepartment(value) {
    return value.department === OTHER_DEPARTMENT_OPTION
        ? value.departmentOther.trim()
        : value.department;
}
export function validateManualAcademicInfo(value) {
    const name = normalizeManualName(value.name);
    const department = resolveManualDepartment(value);
    const errors = {};
    if (!name)
        errors.name = '이름을 입력해 주세요.';
    else if (Array.from(name).length > 100)
        errors.name = '이름은 100자 이내로 입력해 주세요.';
    const studentNoError = validateManualStudentNo(value.studentNo);
    if (studentNoError)
        errors.studentNo = studentNoError;
    if (!value.department)
        errors.department = '학과를 선택해 주세요.';
    else if (!DEPARTMENT_OPTIONS.includes(value.department))
        errors.department = '학과를 목록에서 선택해 주세요.';
    else if (value.department === OTHER_DEPARTMENT_OPTION) {
        if (!department)
            errors.departmentOther = '학과를 직접 입력해 주세요.';
        else if (Array.from(department).length > 100)
            errors.departmentOther = '학과는 100자 이내로 입력해 주세요.';
    }
    return errors;
}
export function validateOptionalInfo(draft) {
    const errors = {};
    if (draft.phone && !/^[0-9]{10,11}$/.test(normalizePhone(draft.phone))) {
        errors.phone = '전화번호는 숫자 10–11자리로 입력해 주세요.';
    }
    if (draft.grade && !/^[1-6]$/.test(draft.grade))
        errors.grade = '학년을 1–6학년 중 선택해 주세요.';
    if (draft.enrollment && !['ENROLLED', 'LEAVE'].includes(draft.enrollment)) {
        errors.enrollment = '재학 또는 휴학을 선택해 주세요.';
    }
    if (draft.birthDate) {
        const date = new Date(`${draft.birthDate}T00:00:00Z`);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.birthDate) ||
            !Number.isFinite(date.getTime()) ||
            date.toISOString().slice(0, 10) !== draft.birthDate)
            errors.birthDate = '올바른 생년월일을 입력해 주세요.';
    }
    return errors;
}
export function buildSchoolSignupRequest(draft, password, profile) {
    return buildAcademicSignupRequest(draft, password, {
        name: profile.name,
        studentNo: profile.studentNo,
        department: profile.department,
        academicInfoSource: 'SCHOOL_SSO',
    });
}
export function buildManualSignupRequest(draft, password, academic) {
    return buildAcademicSignupRequest(draft, password, {
        name: normalizeManualName(academic.name),
        studentNo: normalizeManualStudentNo(academic.studentNo),
        department: resolveManualDepartment(academic),
        academicInfoSource: 'MANUAL',
    });
}
export function buildAcademicSignupRequest(draft, password, academic) {
    return {
        loginId: draft.loginId,
        password,
        email: draft.email.trim(),
        name: academic.name,
        studentNo: academic.studentNo,
        department: academic.department,
        academicInfoSource: academic.academicInfoSource,
        ...(draft.phone ? { phone: normalizePhone(draft.phone) } : {}),
        ...(draft.grade ? { grade: Number(draft.grade) } : {}),
        ...(draft.enrollment ? { enrollment: draft.enrollment } : {}),
        ...(draft.birthDate ? { birthDate: draft.birthDate } : {}),
    };
}
export function parseSchoolSsoResult(search) {
    const params = new URLSearchParams(search);
    if (params.has('schoolVerification') || params.getAll('schoolSso').length !== 1)
        return 'invalid';
    const result = params.get('schoolSso');
    return result === 'success' ||
        result === 'access_denied' ||
        result === 'invalid_state' ||
        result === 'failed'
        ? result
        : 'invalid';
}
export const schoolSsoMessages = {
    access_denied: '학교 정보 제공에 동의하지 않아 인증이 취소되었습니다. 다시 인증할 수 있습니다.',
    invalid_state: '학교 인증 요청이 만료되었거나 다른 인증 요청으로 변경되었습니다. 처음부터 다시 인증해 주세요.',
    failed: '학교 인증을 완료하지 못했습니다. 잠시 후 다시 인증해 주세요.',
    invalid: '유효하지 않은 학교 인증 결과입니다. SU-Wings 인증을 다시 시작해 주세요.',
};
