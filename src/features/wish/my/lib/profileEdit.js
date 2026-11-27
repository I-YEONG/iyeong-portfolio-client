/** 알 수 없거나 비어 있는 재학 상태는 사용자가 선택할 때까지 유지한다. */
export function toProfileEditValues(profile) {
    return {
        phone: profile.phone === '-' ? '' : profile.phone,
        department: profile.department === '-' ? '' : profile.department,
        grade: profile.grade === '-' ? '' : profile.grade,
        enrollment: profile.enrollment === '재학' ? 'ENROLLED' : profile.enrollment === '휴학' ? 'LEAVE' : null,
    };
}
/** PATCH는 변경한 비어 있지 않은 값만 보내고, 생략한 필드는 서버의 기존 값을 보존한다. */
export function buildProfileUpdate(initial, values) {
    const body = {};
    const phone = values.phone.replace(/\D/g, '');
    if (phone && phone !== initial.phone.replace(/\D/g, ''))
        body.phone = phone;
    if (values.department && values.department !== initial.department) {
        body.department = values.department;
    }
    if (values.grade && values.grade !== initial.grade)
        body.grade = Number(values.grade);
    if (values.enrollment !== null && values.enrollment !== initial.enrollment) {
        body.enrollment = values.enrollment;
    }
    return body;
}
