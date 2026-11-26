export function validateLogin(values) {
    const errors = {};
    // 빈 값 차단은 로그인 UX 규칙이다. 원문은 trim하거나 회원가입 형식으로 제한하지 않는다.
    if (!values.loginId.trim())
        errors.loginId = '아이디를 입력해 주세요.';
    else if (values.loginId.length > 100)
        errors.loginId = '아이디는 100자 이하로 입력해 주세요.';
    if (!values.password)
        errors.password = '비밀번호를 입력해 주세요.';
    else if (values.password.length > 128)
        errors.password = '비밀번호는 128자 이하로 입력해 주세요.';
    return errors;
}
