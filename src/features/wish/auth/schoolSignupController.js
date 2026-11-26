import { ApiError } from '@/features/wish/shared/lib/api-client';
import * as schoolApi from './api/schoolSignup';
import * as signupApi from './api/signup';
import { clearSignupDraft, saveSignupDraft } from './signupDraft';
import { failureMessage, SignupController } from './signupController';
import { buildAcademicSignupRequest, schoolSsoMessages } from './signupValidation';
export class SchoolSignupController extends SignupController {
    result;
    constructor(storage, now = Date.now, result, timers) {
        const issue = result !== undefined && result !== 'success';
        super({
            source: 'SCHOOL_SSO',
            storage,
            now,
            timers,
            initialProfileStatus: issue ? 'error' : 'loading',
            initialNotice: issue ? schoolSsoMessages[result] : null,
            callbackIssue: issue,
        });
        this.result = result;
    }
    activateAcademic() {
        if (this.result && this.result !== 'success') {
            this.patch({
                profileStatus: 'error',
                callbackIssue: true,
                notice: schoolSsoMessages[this.result],
                noticeTone: 'error',
            });
            return Promise.resolve();
        }
        return this.loadProfile();
    }
    loadProfile = async () => {
        if (!this.canEdit() || this.requests.has('profile'))
            return;
        this.abortAll();
        this.resetSensitive();
        this.patch({
            step: 'profile',
            profileStatus: 'loading',
            profile: null,
            notice: null,
            callbackIssue: false,
        });
        await this.request('profile', async (signal) => {
            const profile = await schoolApi.getSchoolProfile(signal);
            if (Date.parse(profile.expiresAt) <= this.now())
                throw new ApiError(400, 'SCHOOL_SSO_VERIFICATION_REQUIRED', '');
            const available = await signupApi.checkAvailability('student-no', profile.studentNo, signal);
            return { profile, available };
        }, ({ profile, available }) => {
            this.patch({
                profile,
                profileStatus: available ? 'ready' : 'duplicate',
                notice: available ? null : '이미 가입된 정보입니다. 기존 계정으로 로그인해 주세요.',
                noticeTone: 'error',
            });
            this.tick();
        }, (error) => this.patch({
            profileStatus: error instanceof ApiError && error.code === 'SCHOOL_SSO_VERIFICATION_REQUIRED'
                ? 'expired'
                : 'error',
            notice: error instanceof ApiError && error.code === 'SCHOOL_SSO_VERIFICATION_REQUIRED'
                ? failureMessage(error)
                : '학적 정보와 학번 중복 여부를 확인하지 못했습니다. 다시 확인해 주세요.',
            noticeTone: 'error',
        }));
    };
    tickAcademic() {
        if (this.state.profile &&
            this.state.profileStatus !== 'expired' &&
            this.state.submission !== 'success' &&
            !this.requests.has('submit') &&
            Date.parse(this.state.profile.expiresAt) <= this.now()) {
            this.abortAll();
            this.resetSensitive();
            this.patch({
                profileStatus: 'expired',
                notice: '학교 인증이 만료되었습니다. SU-Wings에서 다시 인증해 주세요.',
                noticeTone: 'error',
            });
        }
    }
    validAcademic() {
        return (this.state.profileStatus === 'ready' &&
            this.state.profile !== null &&
            Date.parse(this.state.profile.expiresAt) > this.now());
    }
    buildSignupRequest() {
        return buildAcademicSignupRequest(this.state.draft, this.state.password, {
            name: this.state.profile.name,
            studentNo: this.state.profile.studentNo,
            department: this.state.profile.department,
            academicInfoSource: 'SCHOOL_SSO',
        });
    }
    prepareReauthorization = () => {
        if (!this.canEdit())
            return false;
        saveSignupDraft(this.state.draft, this.storage, 'SCHOOL_SSO');
        this.abortAll();
        this.resetSensitive({
            profile: null,
            profileStatus: 'expired',
            notice: 'SU-Wings에서 학교 인증을 완료해 주세요.',
            noticeTone: 'info',
        });
        return true;
    };
    async cancelAcademic() {
        await this.request('cancel', (signal) => schoolApi.clearSchoolProfile(signal), () => this.patch({ cancelled: true, profile: null }), () => this.patch({
            notice: '임시 학교 정보를 삭제하지 못했습니다. 닫기를 다시 눌러 주세요.',
            noticeTone: 'error',
        }));
    }
    switchToManual = async () => {
        if (!this.canEdit())
            return false;
        this.abortAll();
        let deleted = false;
        const succeeded = await this.request('cancel', (signal) => schoolApi.clearSchoolProfile(signal), () => {
            deleted = true;
            clearSignupDraft(this.storage, 'SCHOOL_SSO');
            this.patch({ profile: null, notice: null });
        }, () => this.patch({
            notice: '임시 학교 정보를 삭제하지 못했습니다. 다시 시도해 주세요.',
            noticeTone: 'error',
        }));
        return this.active && succeeded && deleted;
    };
    handleSubmitFailure(failure) {
        if (failure instanceof ApiError && failure.code === 'SCHOOL_SSO_VERIFICATION_REQUIRED') {
            this.patch({ profileStatus: 'expired', notice: failureMessage(failure), noticeTone: 'error' });
            return;
        }
        super.handleSubmitFailure(failure);
    }
}
