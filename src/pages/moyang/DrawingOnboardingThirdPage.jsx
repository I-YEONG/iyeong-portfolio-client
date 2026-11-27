import { Navigate, useSearchParams } from 'react-router-dom';
import { DrawingInstructions } from '@/features/moyang/drawing-onboarding';
/** 쿼리의 그림 방식에 맞는 안내 화면을 연결한다. */
export const DrawingOnboardingThirdPage = () => {
    const [params] = useSearchParams();
    const type = params.get('type');
    if (type !== 'paper' && type !== 'canvas')
        return <Navigate to="/project/moyang/drawing/onboarding/2" replace/>;
    return <DrawingInstructions type={type}/>;
};
