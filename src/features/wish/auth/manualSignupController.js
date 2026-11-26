import { OTHER_DEPARTMENT_OPTION } from '@/features/wish/shared/constants/departments';
import * as signupApi from './api/signup';
import { buildManualSignupRequest, normalizeManualStudentNo, validateManualStudentNo, } from './signupValidation';
import { SignupController } from './signupController';
import { validateManualAcademicInfo } from './signupValidation';
export class ManualSignupController extends SignupController {
    constructor(storage, now = Date.now, timers) {
        super({ source: 'MANUAL', storage, now, timers, initialProfileStatus: 'ready' });
    }
    activateAcademic() {
        return Promise.resolve();
    }
    tickAcademic() { }
    scheduleStudentNo() {
        if (this.state.step === 'profile' &&
            !validateManualStudentNo(this.state.manualAcademic.studentNo) &&
            this.state.checkedStudentNo !== normalizeManualStudentNo(this.state.manualAcademic.studentNo))
            this.queueCheck('studentNo', this.checkStudentNo);
    }
    changeManualAcademic = (key, value) => {
        if (!this.canEdit())
            return;
        const next = { ...this.state.manualAcademic, [key]: value };
        if (key === 'studentNo') {
            this.invalidateCheck('studentNo');
        }
        if (key === 'department')
            next.departmentOther = '';
        const errors = validateManualAcademicInfo(next);
        this.patch({
            manualAcademic: next,
            fieldErrors: {
                ...this.state.fieldErrors,
                [key]: errors[key],
                ...(key === 'department'
                    ? {
                        departmentOther: value === OTHER_DEPARTMENT_OPTION ? errors.departmentOther : undefined,
                    }
                    : {}),
            },
            notice: null,
        });
        if (key === 'studentNo')
            this.scheduleCheck('studentNo');
    };
    validAcademic() {
        const errors = validateManualAcademicInfo(this.state.manualAcademic);
        return (!Object.values(errors).some(Boolean) &&
            this.state.checkedStudentNo === normalizeManualStudentNo(this.state.manualAcademic.studentNo));
    }
    confirmProfile = () => {
        if (!this.canEdit() || this.state.step !== 'profile')
            return;
        const errors = validateManualAcademicInfo(this.state.manualAcademic);
        const studentNo = normalizeManualStudentNo(this.state.manualAcademic.studentNo);
        const fieldErrors = {
            ...errors,
            studentNo: errors.studentNo ??
                (this.state.checkedStudentNo !== studentNo ? '학번 중복 확인을 완료해 주세요.' : undefined),
        };
        this.patch({ fieldErrors, notice: null });
        if (this.isProfileReady())
            this.enterStep('account');
    };
    checkStudentNo = async () => {
        if (!this.canEdit() || this.state.step !== 'profile' || this.composing.has('studentNo'))
            return;
        this.cancelQueued('studentNo');
        if (this.requests.has('studentNo'))
            return;
        const studentNo = normalizeManualStudentNo(this.state.manualAcademic.studentNo);
        if (this.state.checkedStudentNo === studentNo)
            return;
        const errors = validateManualAcademicInfo(this.state.manualAcademic);
        const studentNoError = errors.studentNo;
        this.patch({
            checkedStudentNo: null,
            fieldErrors: { ...this.state.fieldErrors, studentNo: studentNoError },
            retryFields: this.state.retryFields.filter((field) => field !== 'studentNo'),
            notice: null,
        });
        if (studentNoError)
            return;
        await this.request('studentNo', (signal) => signupApi.checkAvailability('student-no', studentNo, signal), (available) => this.patch({
            checkedStudentNo: available ? studentNo : null,
            fieldErrors: {
                ...this.state.fieldErrors,
                studentNo: available ? undefined : '이미 가입된 학번입니다.',
            },
            notice: available ? '중복 확인이 되었습니다.' : null,
            noticeTone: 'success',
        }), (failure) => this.checkFailed('studentNo', failure));
    };
    buildSignupRequest() {
        return buildManualSignupRequest(this.state.draft, this.state.password, this.state.manualAcademic);
    }
    async cancelAcademic() {
        this.patch({ cancelled: true });
    }
}
