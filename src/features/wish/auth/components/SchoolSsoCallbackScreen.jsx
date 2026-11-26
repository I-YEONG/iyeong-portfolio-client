import { Navigate, useLocation } from 'react-router';
import { ROUTES } from '@/features/wish/shared/constants/routes';
import { parseSchoolSsoResult } from '../signupValidation';
export function SchoolSsoCallbackScreen() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    // 마이페이지에서 시작한 학생인증은 schoolVerification으로 돌아온다.
    // 결과값 해석은 마이페이지가 하므로 값만 그대로 넘긴다.
    const verification = params.get('schoolVerification');
    if (verification !== null) {
        return (<Navigate replace to={`${ROUTES.MY}?schoolVerification=${encodeURIComponent(verification)}`}/>);
    }
    // replace로 콜백 쿼리를 제거한다. 인증 성공 여부는 가입 화면에서 서버 프로필로 확인한다.
    return (<Navigate replace to={`${ROUTES.SIGNUP}?source=school`} state={{ schoolSso: parseSchoolSsoResult(search) }}/>);
}
