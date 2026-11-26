const EMPTY = '-';
/** 전화번호는 서버에서 숫자만 오므로 화면에서 하이픈을 넣는다. */
export function formatPhone(phone) {
    if (!phone)
        return EMPTY;
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 11)
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    if (digits.length === 10)
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
    return phone;
}
function formatEnrollment(enrollment) {
    if (enrollment === 'ENROLLED')
        return '재학';
    if (enrollment === 'LEAVE')
        return '휴학';
    return enrollment ?? EMPTY;
}
/** 기존 SSO 계정은 학적 필드가 null일 수 있어 화면용 값으로 정리한다. */
export function toMyProfile(me) {
    return {
        name: me.name ?? EMPTY,
        studentNo: me.studentNo ?? EMPTY,
        department: me.department ?? EMPTY,
        grade: me.grade == null ? EMPTY : String(me.grade),
        enrollment: formatEnrollment(me.enrollment),
        phone: formatPhone(me.phone),
        schoolVerified: me.schoolVerified === true,
        studentFeePaid: me.studentFeePaid === true,
    };
}
