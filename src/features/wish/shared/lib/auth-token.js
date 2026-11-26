import { useAuthStore } from '@/features/wish/auth/store';

// 데모 인증은 포트폴리오 상태만 사용하며 토큰을 보관하지 않습니다.
export const authToken = {
  get: () => null,
  getSessionVersion: () => useAuthStore.getState().sessionVersion,
  set: () => {},
  startSession: () => {},
  clear: () => {},
  subscribe: () => () => {},
};
