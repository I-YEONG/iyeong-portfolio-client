import { getWishData } from '@/features/wish/hooks/useGetWishQuery';

export class ApiError extends Error {
  constructor(status, code, message, retryAfterSeconds = null) {
    super(message);
    this.status = status;
    this.code = code;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

async function get(path, config = {}) {
  if (path.startsWith('/api/auth/check/')) return { data: { available: true }, status: 200 };
  const params = new URLSearchParams();
  Object.entries(config.params || {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) params.append(key, String(value));
  });
  const mockPath = `${path}${params.size ? `?${params}` : ''}`;
  try {
    const data = await getWishData(mockPath, config.signal);
    return { data: path === '/api/users/me' ? { ...data, studentFeePaid: true, schoolVerified: true, schoolVerificationStatus: 'VERIFIED' } : data, status: 200 };
  } catch (error) {
    if (error.name === 'CanceledError' || error instanceof ApiError) throw error;
    throw new ApiError(error.response?.status || 0, 'MOCK_REQUEST_FAILED', '데모 데이터를 불러오지 못했습니다.');
  }
}

async function mutate(method, path, body = {}) {
  const now = new Date().toISOString();
  let data = {};
  if (path.includes('/school-verification/authorize')) {
    throw new ApiError(403, 'DEMO_ONLY', '데모에서는 학교 인증을 진행하지 않습니다.');
  } else if (path === '/api/bamboo/nickname') {
    data = { nickname: body.nickname };
  } else if (path === '/api/bamboo/messages') {
    data = { id: Date.now(), seq: Date.now(), anonName: '나', content: body.content, status: 'VISIBLE', createdAt: now, mine: true };
  } else if (path === '/api/birthday-messages') {
    data = { id: Date.now(), content: body.content, designNo: body.designNo ?? 1, author: null, heartCount: 0, heartedByMe: false, mine: true, createdAt: now };
  } else if (/^\/api\/birthday-messages\/\d+\/heart$/.test(path)) {
    data = { messageId: Number(path.split('/')[3]), heartCount: method === 'put' ? 1 : 0, heartedByMe: method === 'put' };
  } else if (/^\/api\/polls\/\d+\/submissions$/.test(path)) {
    data = { submissionId: Date.now(), submittedAt: now, mySubmissionCount: 1 };
  } else if (path === '/api/qr/tokens') {
    data = { token: 'PORTFOLIO-DEMO-ONLY', expiresAt: new Date(Date.now() + 60000).toISOString() };
  } else if (path === '/api/auth/signup') {
    data = { userUuid: '00000000-0000-0000-0000-000000000001' };
  } else if (path === '/api/auth/email/find-id/verify') {
    data = { loginId: 'demo' };
  } else if (path === '/api/users/me/profile' || path === '/api/users/me/school-verification/department/confirm') {
    data = { ...(await get('/api/users/me')).data, ...body };
  }
  return { data, status: method === 'delete' ? 204 : 200 };
}

export const apiClient = {
  get,
  post: (path, body) => mutate('post', path, body),
  put: (path, body) => mutate('put', path, body),
  patch: (path, body) => mutate('patch', path, body),
  delete: (path, body) => mutate('delete', path, body),
};
