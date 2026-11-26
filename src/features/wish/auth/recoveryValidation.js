import { validateSignupEmail, validateSignupPassword } from './signupValidation';
/** 복구 DTO는 가입의 4–12자 코드와 달리 ASCII 숫자 6자리만 허용한다. */
export function validateRecoveryCode(value) {
    return /^[0-9]{6}$/.test(value) ? undefined : '이메일로 받은 숫자 6자리 인증번호를 입력해 주세요.';
}
/** 기존 로그인 아이디 원문을 유지하며 가입의 4–50자 제한을 적용하지 않는다. */
export function validateRecoveryId(value) {
    if (!value.trim())
        return '아이디를 입력해 주세요.';
    return value.length > 100 ? '아이디는 100자 이내로 입력해 주세요.' : undefined;
}
export const validateRecoveryEmail = validateSignupEmail;
export const validateRecoveryPassword = validateSignupPassword;
