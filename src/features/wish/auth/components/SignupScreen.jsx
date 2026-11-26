import { useEffect } from 'react';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router';
import { DEPARTMENT_OPTIONS, OTHER_DEPARTMENT_OPTION } from '@/features/wish/shared/constants/departments';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { useManualSignup } from '../hooks/useManualSignup';
import { useAuthSession } from '../hooks/useAuthSession';
import { useSchoolAuthorization } from '../hooks/useSchoolAuthorization';
import { useSchoolSignup } from '../hooks/useSchoolSignup';
import { normalizePhone, validateSignupCode, validateSignupEmail, validateSignupPassword, validateSignupPasswordConfirmation, } from '../signupValidation';
import { formatSignupBirthDateInput, formatSignupPhoneInput } from '../signupInputFormatting';
import { SignupActions, SignupField, SignupFrame, SignupProgress } from './SignupFrame';
import { SignupNumericInput } from './SignupNumericInput';
import { AuthFeedback } from './AuthFeedback';
import styles from './entry.module.css';
const signupInputClass = styles.signupInput;
const fieldOrder = [
    'name',
    'studentNo',
    'department',
    'departmentOther',
    'email',
    'code',
    'loginId',
    'password',
    'passwordConfirmation',
    'phone',
    'grade',
    'enrollment',
    'birthDate',
];
function fieldStatus(state, field, valid = false, hint = false) {
    const invalid = Boolean(state.fieldErrors[field]);
    return {
        'aria-invalid': invalid,
        'aria-describedby': [invalid ? `signup-${field}-error` : '', hint ? `signup-${field}-hint` : '']
            .filter(Boolean)
            .join(' ') || undefined,
        'data-valid': valid && !invalid,
    };
}
function SignupFeedback({ state, controller, locked, onStudentRetry, children, }) {
    const retryActions = {
        studentNo: { label: '학번 다시 시도', onClick: () => void onStudentRetry?.() },
        loginId: { label: '아이디 다시 시도', onClick: () => void controller.checkLoginId() },
        phone: { label: '전화번호 다시 시도', onClick: () => void controller.checkPhone() },
        code: { label: '인증번호 다시 시도', onClick: () => void controller.verifyEmail() },
    };
    const items = fieldOrder.flatMap((field) => {
        const text = state.fieldErrors[field];
        if (!text)
            return [];
        const action = field in retryActions && state.retryFields.includes(field)
            ? {
                ...retryActions[field],
                disabled: locked || state.pending.length > 0,
            }
            : undefined;
        return [{ id: `signup-${field}-error`, text, tone: 'error', action }];
    });
    if (state.notice)
        items.push({ id: 'signup-notice', text: state.notice, tone: state.noticeTone });
    if (state.step === 'profile' &&
        state.source === 'MANUAL' &&
        state.checkedStudentNo !== null &&
        state.checkedStudentNo === state.manualAcademic.studentNo.trim())
        items.push({ id: 'signup-studentNo-success', text: '중복 확인이 되었습니다.', tone: 'success' });
    if (state.step === 'account' &&
        state.verifiedEmail !== null &&
        state.verifiedEmail === state.draft.email.trim())
        items.push({ id: 'signup-email-success', text: '인증번호가 확인되었습니다.', tone: 'success' });
    return <AuthFeedback items={items}>{children}</AuthFeedback>;
}
export function SignupScreen() {
    const [params] = useSearchParams();
    const { isAuthenticated } = useAuthSession();
    if (isAuthenticated)
        return <Navigate to={ROUTES.HOME} replace/>;
    return params.get('source') === 'school' ? <SchoolSignupFlow /> : <ManualSignupFlow />;
}
function ManualSignupFlow() {
    const navigate = useNavigate();
    const { controller, state } = useManualSignup();
    const { fieldErrors, pending } = state;
    const locked = pending.includes('submit') || pending.includes('cancel');
    const departmentInvalid = Boolean(fieldErrors.department);
    useEffect(() => {
        if (state.submission === 'success')
            navigate(ROUTES.LOGIN, { replace: true, state: { signupComplete: true } });
        else if (state.cancelled)
            navigate(ROUTES.LOGIN, { replace: true });
    }, [navigate, state.submission, state.cancelled]);
    return (<SignupFrame manual step={state.step} busy={locked} onClose={() => void controller.cancel()} feedback={<SignupFeedback state={state} controller={controller} locked={locked} onStudentRetry={controller.checkStudentNo}>
          {state.suggestLogin && (<button type="button" onClick={() => void controller.cancel()} disabled={locked} className={styles.feedbackAction}>
              로그인으로 이동
            </button>)}
        </SignupFeedback>}>
      {state.step === 'profile' && (<form noValidate className={styles.signupForm} onSubmit={(event) => {
                event.preventDefault();
                controller.confirmProfile();
            }}>
          <fieldset disabled={locked} className={styles.signupFields}>
            <legend className="sr-only">학적 정보 입력</legend>
            <SignupField id="signup-name" label="이름">
              <input id="signup-name" autoComplete="name" value={state.manualAcademic.name} className={signupInputClass} placeholder="이름 입력" {...fieldStatus(state, 'name')} onChange={(event) => controller.changeManualAcademic('name', event.target.value)}/>
            </SignupField>
            <SignupField id="signup-studentNo" label="학번">
              <input id="signup-studentNo" inputMode="numeric" value={state.manualAcademic.studentNo} className={signupInputClass} placeholder="학번 입력" {...fieldStatus(state, 'studentNo', state.checkedStudentNo !== null &&
            state.checkedStudentNo === state.manualAcademic.studentNo.trim())} onCompositionStart={() => controller.setComposing('studentNo', true)} onCompositionEnd={() => controller.setComposing('studentNo', false)} onChange={(event) => controller.changeManualAcademic('studentNo', event.target.value)}/>
            </SignupField>
            <SignupField id="signup-department" label="학과">
              <select id="signup-department" className={signupInputClass} value={state.manualAcademic.department} data-empty={!state.manualAcademic.department} title={state.manualAcademic.department || undefined} aria-invalid={departmentInvalid} aria-describedby={departmentInvalid ? 'signup-department-error' : undefined} onChange={(event) => controller.changeManualAcademic('department', event.target.value)}>
                <option value="" disabled>
                  학과 선택
                </option>
                {DEPARTMENT_OPTIONS.map((department) => (<option key={department} value={department}>
                    {department}
                  </option>))}
              </select>
              <IconChevronDown size={24} className={styles.selectChevron} aria-hidden/>
              {state.manualAcademic.department &&
                state.manualAcademic.department !== OTHER_DEPARTMENT_OPTION && (<p aria-hidden className={styles.departmentExpanded}>
                    {state.manualAcademic.department}
                  </p>)}
              {state.manualAcademic.department === OTHER_DEPARTMENT_OPTION && (<input id="signup-departmentOther" className={`${signupInputClass} mt-2`} value={state.manualAcademic.departmentOther} placeholder="학과 직접입력" aria-label="학과 직접입력" {...fieldStatus(state, 'departmentOther')} onChange={(event) => controller.changeManualAcademic('departmentOther', event.target.value)}/>)}
              {state.manualAcademic.department === '자유전공학부(글로벌)' && (<p className={styles.departmentNote}>외국인 전용</p>)}
            </SignupField>
          </fieldset>
          <SignupProgress step={state.step}/>
          <button type="submit" disabled={locked || !controller.isProfileReady()} className={styles.profileNext}>
            <span>다음으로</span>
            <IconChevronRight size={24} aria-hidden/>
          </button>
        </form>)}
      {state.step !== 'profile' && (<SignupSharedSteps state={state} controller={controller} locked={locked}/>)}
    </SignupFrame>);
}
function SignupSharedSteps({ state, controller, locked, }) {
    const { draft, pending } = state;
    const emailVerified = state.verifiedEmail !== null && state.verifiedEmail === draft.email.trim();
    const emailSent = state.sentEmail !== null && state.sentEmail === draft.email.trim();
    const sendLabel = emailSent ? '재전송' : '전송';
    const sending = pending.includes('emailSend');
    const sendDisabled = locked || sending || state.resendSeconds > 0 || Boolean(validateSignupEmail(draft.email));
    const verifyCode = () => {
        if (!state.code)
            return;
        if (validateSignupCode(state.code))
            controller.checkCode();
        else
            void controller.verifyEmail();
    };
    return (<>
      {state.step === 'account' && (<form noValidate className={styles.signupForm} onSubmit={(event) => {
                event.preventDefault();
                controller.confirmAccount();
            }}>
          <fieldset disabled={locked} className={styles.signupFields}>
            <legend className="sr-only">축제 계정 정보</legend>
            <SignupField id="signup-email" label="E-mail">
              <input id="signup-email" name="signup-email" type="email" autoComplete="section-signup-contact email" value={draft.email} className={signupInputClass} placeholder="이메일 입력" {...fieldStatus(state, 'email', emailVerified)} onBlur={() => controller.checkDraftField('email')} onChange={(event) => controller.changeDraft('email', event.target.value)}/>
            </SignupField>
            <SignupField id="signup-code" label={<>
                  E-mail
                  <br />
                  인증번호
                </>}>
              <div className={styles.codeControl}>
                <input id="signup-code" autoComplete="one-time-code" value={state.code} maxLength={12} className={`${signupInputClass} ${styles.codeInput}`} placeholder={emailVerified ? '인증 완료' : '인증번호 입력'} disabled={!emailSent || emailVerified || sending} {...fieldStatus(state, 'code', emailVerified, true)} onCompositionStart={() => controller.setComposing('code', true)} onCompositionEnd={() => controller.setComposing('code', false)} onChange={(event) => controller.changeCode(event.target.value)} onBlur={(event) => {
                if (!(event.relatedTarget instanceof HTMLElement &&
                    event.relatedTarget.closest('[data-email-send]')))
                    verifyCode();
            }} onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    if (!event.nativeEvent.isComposing)
                        verifyCode();
                }
            }}/>
                <button id="signup-email-send" data-email-send type="button" className={styles.emailSend} data-sent={emailSent} disabled={sendDisabled} aria-label={sending
                ? '인증번호 발송 중'
                : state.resendSeconds > 0
                    ? `인증번호 재전송 (${state.resendSeconds}초 후 가능)`
                    : `인증번호 ${sendLabel}`} title={state.resendSeconds > 0
                ? `${state.resendSeconds}초 후 재전송할 수 있습니다.`
                : undefined} onClick={() => void controller.sendEmail()}>
                  {sending ? '발송 중' : sendLabel}
                </button>
              </div>
              <p id="signup-code-hint" className={styles.codeHint}>
                {emailVerified ? '인증이 완료되었습니다.' : '다른 칸 이동 시 자동 확인'}
              </p>
            </SignupField>
            <SignupField id="signup-loginId" label="아이디">
              <input id="signup-loginId" name="signup-login-id" type="text" 
        // 이메일 자동완성이 새로 정하는 축제 아이디까지 채우지 않도록 분리한다.
        autoComplete="off" autoCapitalize="none" spellCheck={false} value={draft.loginId} className={signupInputClass} placeholder="아이디 입력 (4–50자)" {...fieldStatus(state, 'loginId', state.checkedLoginId !== null && state.checkedLoginId === draft.loginId)} onCompositionStart={() => controller.setComposing('loginId', true)} onCompositionEnd={() => controller.setComposing('loginId', false)} onBlur={() => controller.checkDraftField('loginId')} onChange={(event) => controller.changeDraft('loginId', event.target.value)}/>
            </SignupField>
            <SignupField id="signup-password" label="비밀번호" hint={<>
                  *8–20자 영문 대소문자, 숫자, 특수문자 포함
                  <span className="sr-only"> (공백 제외)</span>
                </>}>
              <input id="signup-password" type="password" autoComplete="new-password" maxLength={20} value={state.password} className={signupInputClass} placeholder="비밀번호 입력" {...fieldStatus(state, 'password', Boolean(state.password) && !validateSignupPassword(state.password), true)} onBlur={controller.checkPassword} onChange={(event) => controller.changePassword(event.target.value)}/>
            </SignupField>
            <SignupField id="signup-passwordConfirmation" label="비밀번호 확인">
              <input id="signup-passwordConfirmation" type="password" autoComplete="new-password" maxLength={20} required value={state.passwordConfirmation} className={signupInputClass} placeholder="비밀번호 다시 입력" {...fieldStatus(state, 'passwordConfirmation', !validateSignupPasswordConfirmation(state.password, state.passwordConfirmation))} onBlur={controller.checkPasswordConfirmation} onChange={(event) => controller.changePasswordConfirmation(event.target.value)}/>
            </SignupField>
          </fieldset>
          <SignupProgress step={state.step}/>
          <SignupActions previous={controller.previous} disabled={locked || !controller.isAccountReady()}/>
        </form>)}
      {state.step === 'optional' && (<form noValidate className={styles.signupForm} onSubmit={(event) => {
                event.preventDefault();
                void controller.confirmOptional();
            }}>
          <fieldset disabled={locked} className={styles.signupFields}>
            <legend className="sr-only">선택 정보 입력</legend>
            <SignupField id="signup-phone" label="전화번호">
              <SignupNumericInput id="signup-phone" type="tel" autoComplete="tel" value={draft.phone} format={formatSignupPhoneInput} className={signupInputClass} placeholder="전화번호 입력 (선택)" {...fieldStatus(state, 'phone', Boolean(draft.phone) && state.checkedPhone === normalizePhone(draft.phone))} onCompositionStart={() => controller.setComposing('phone', true)} onCompositionEnd={() => controller.setComposing('phone', false)} onBlur={() => controller.checkDraftField('phone')} onValueChange={(value) => controller.changeDraft('phone', value)}/>
            </SignupField>
            <SignupField id="signup-grade" label="학년">
              <div className={styles.gradeControl} data-invalid={Boolean(state.fieldErrors.grade || state.fieldErrors.enrollment)}>
                <select id="signup-grade" value={draft.grade} {...fieldStatus(state, 'grade')} onChange={(event) => controller.changeDraft('grade', event.target.value)}>
                  <option value="">선택</option>
                  {[1, 2, 3, 4, 5, 6].map((grade) => (<option key={grade} value={grade}>
                      {grade}
                    </option>))}
                </select>
                <IconChevronDown size={24} className={styles.gradeChevron} aria-hidden/>
                <div role="group" aria-label="재학 상태 (선택)" aria-invalid={Boolean(state.fieldErrors.enrollment)} aria-describedby={state.fieldErrors.enrollment ? 'signup-enrollment-error' : undefined}>
                  {[
                ['ENROLLED', '재학'],
                ['LEAVE', '휴학'],
            ].map(([value, label]) => (<button key={value} type="button" aria-pressed={draft.enrollment === value} onClick={() => controller.changeDraft('enrollment', draft.enrollment === value ? '' : value)}>
                      {label}
                    </button>))}
                </div>
              </div>
            </SignupField>
            <SignupField id="signup-birthDate" label="생년월일">
              <SignupNumericInput id="signup-birthDate" type="text" autoComplete="bday" value={draft.birthDate} format={formatSignupBirthDateInput} className={signupInputClass} placeholder="yyyy.mm.dd" {...fieldStatus(state, 'birthDate', false, true)} onBlur={() => controller.checkDraftField('birthDate')} onValueChange={(value) => controller.changeDraft('birthDate', value.replaceAll('.', '-'))}/>
              <span id="signup-birthDate-hint" className="sr-only">
                생년월일을 연도 네 자리, 월 두 자리, 일 두 자리로 입력하세요. 예: 2005.01.01. 선택
                항목입니다.
              </span>
            </SignupField>
          </fieldset>
          <p className={styles.optionalGuidance}>
            경품 수령을 원하시는 경우,
            <br />
            선택정보까지 모두 입력해주세요.
          </p>
          <SignupProgress step={state.step}/>
          <SignupActions previous={controller.previous} disabled={locked || !controller.isOptionalReady()}/>
        </form>)}
      {state.step === 'terms' && (<form className={styles.signupForm} onSubmit={(event) => {
                event.preventDefault();
                void controller.submit();
            }}>
          <div className="space-y-5 text-center text-sm text-blue underline underline-offset-2">
            <a className="flex min-h-11 items-center justify-center" href="https://festa.syu-likelion.org/terms/privacy" target="_blank" rel="noopener noreferrer">
              개인정보 처리 방침 확인하기<span className="sr-only"> (새 탭)</span>
            </a>
            <a className="flex min-h-11 items-center justify-center" href="https://festa.syu-likelion.org/terms/service" target="_blank" rel="noopener noreferrer">
              이용약관 확인하기<span className="sr-only"> (새 탭)</span>
            </a>
          </div>
          <SignupProgress step={state.step}/>
          <SignupActions previous={controller.previous} final pending={pending.includes('submit')} disabled={locked ||
                state.submission !== 'idle' ||
                !controller.isAccountReady() ||
                !controller.isOptionalReady()}/>
        </form>)}
    </>);
}
function SchoolSignupFlow() {
    const location = useLocation();
    const navigate = useNavigate();
    const value = location.state?.schoolSso;
    const result = typeof value === 'string' &&
        ['success', 'access_denied', 'invalid_state', 'failed', 'invalid'].includes(value)
        ? value
        : undefined;
    const { controller, state } = useSchoolSignup(result);
    const authorization = useSchoolAuthorization();
    const { pending } = state;
    const closing = pending.includes('cancel');
    const locked = pending.includes('submit') || closing || authorization.isStarting;
    useEffect(() => {
        if (state.submission === 'success')
            navigate(ROUTES.LOGIN, { replace: true, state: { signupComplete: true } });
        else if (state.cancelled)
            navigate(ROUTES.LOGIN, { replace: true });
    }, [navigate, state.submission, state.cancelled]);
    function reauthorize() {
        if (controller.prepareReauthorization())
            authorization.start();
    }
    async function switchToManual() {
        if (await controller.switchToManual())
            navigate(ROUTES.SIGNUP, { replace: true });
    }
    return (<SignupFrame step={state.step} busy={locked} onClose={() => void controller.cancel()} feedback={<SignupFeedback state={state} controller={controller} locked={locked}>
          {state.profileStatus === 'error' && !state.callbackIssue && (<button type="button" onClick={() => void controller.loadProfile()} disabled={locked} className={styles.feedbackAction}>
              학적정보 다시 확인
            </button>)}
          {(state.profileStatus === 'error' || state.profileStatus === 'expired') && (<button type="button" onClick={reauthorize} disabled={locked} className={styles.feedbackAction}>
              {authorization.isStarting ? '학교 로그인으로 이동 중…' : 'SU-Wings 다시 인증'}
            </button>)}
          {state.step === 'profile' && (<button type="button" onClick={() => void switchToManual()} disabled={locked} className={styles.feedbackAction}>
              직접 입력으로 가입
            </button>)}
          {(state.profileStatus === 'duplicate' || state.suggestLogin) && (<button type="button" onClick={() => void controller.cancel()} disabled={locked} className={styles.feedbackAction}>
              로그인으로 이동
            </button>)}
          {closing && (<AuthFeedback items={[
                    {
                        id: 'signup-school-cleanup',
                        text: '임시 학교 정보를 정리하고 있습니다.',
                        tone: 'info',
                    },
                ]}/>)}
        </SignupFeedback>}>
      {state.step === 'profile' && (<div className={styles.signupForm}>
          <p className={styles.schoolProfileHint}>내 정보가 정확한지 확인해주세요.</p>
          <div className={styles.signupFields} aria-busy={pending.includes('profile')}>
            {[
                ['name', '이름'],
                ['studentNo', '학번'],
                ['department', '학과'],
            ].map(([key, label]) => (<SignupField key={key} id={`school-${key}`} label={label}>
                <input id={`school-${key}`} className={signupInputClass} readOnly value={state.profile?.[key] ?? ''} placeholder="—"/>
              </SignupField>))}
          </div>
          <SignupProgress step={state.step}/>
          <button type="button" disabled={locked || !controller.isProfileReady()} onClick={controller.confirmProfile} className={styles.profileNext}>
            <span>{pending.includes('profile') ? '학적정보 확인 중…' : '다음으로'}</span>
            <IconChevronRight size={24} aria-hidden/>
          </button>
        </div>)}
      {state.step !== 'profile' && (<SignupSharedSteps state={state} controller={controller} locked={locked}/>)}
    </SignupFrame>);
}
