import fixture from '@/mockup/moyang/my-info-api.json';
import { mockOptions } from './mock-options';
const storageKey = 'moyang.mock-user';
export const readMockUser = () => {
    try {
        const saved = sessionStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : structuredClone(fixture.getMe.response.data);
    }
    catch {
        return structuredClone(fixture.getMe.response.data);
    }
};
/** 내 정보 요청을 브라우저에 저장되는 가상 사용자 데이터로 처리한다. */
export const mockUserRequest = (config) => {
    const method = config.method?.toLowerCase() ?? 'get';
    const url = config.url?.split('?')[0];
    if (url === '/api/auth/login' || !url?.startsWith('/api/'))
        return config;
    if (method === 'get' &&
        (url === '/api/onboarding/options' || url === '/api/sheep' || url === '/api/topics/recommended')) {
        config.adapter = async () => {
            const topics = [
                '내 마음속 방',
                '관계 속 나의 자리',
                '편안함을 느끼는 순간',
                '엉켜버린 마음의 실타래',
                '내 어깨 위의 짐',
                '마음에 작은 창문 만들기',
                '마음의 배터리',
                '마음속 걱정 구름',
                '나만의 작은 쉼터',
            ].map((title, index) => ({
                topicId: index + 1,
                title,
                description: `${title}을 자유롭게 표현해 보세요.`,
                hints: [],
            }));
            const data = url === '/api/onboarding/options'
                ? mockOptions
                : url === '/api/sheep'
                    ? { balance: 5 }
                    : { topics };
            return { data: { success: true, data }, status: 200, statusText: 'OK', headers: {}, config };
        };
        return config;
    }
    if (!(method === 'get' && url === '/api/users/me') &&
        !(method === 'put' && url === '/api/users/me/onboarding') &&
        !(method === 'patch' && url === '/api/users/me/nickname') &&
        !(method === 'patch' && url === '/api/users/me/sheep-color')) {
        config.adapter = async () => {
            throw new Error(`지원하지 않는 목업 요청: ${method.toUpperCase()} ${url}`);
        };
        return config;
    }
    const input = config.data;
    config.adapter = async () => {
        const user = readMockUser();
        let data = user;
        if (method === 'put') {
            user.onboarding = input;
            user.onboardingCompleted = true;
            data = user.onboarding;
        }
        else if (method === 'patch' && input && typeof input === 'object') {
            if (url?.endsWith('/nickname') && 'nickname' in input && typeof input.nickname === 'string') {
                user.nickname = input.nickname;
                data = { userId: user.userId, nickname: user.nickname };
            }
            else if ('sheepColor' in input && typeof input.sheepColor === 'string') {
                user.sheepColor = input.sheepColor;
                data = { userId: user.userId, sheepColor: user.sheepColor };
            }
        }
        if (method !== 'get')
            sessionStorage.setItem(storageKey, JSON.stringify(user));
        return { data: { success: true, data }, status: 200, statusText: 'OK', headers: {}, config };
    };
    return config;
};
