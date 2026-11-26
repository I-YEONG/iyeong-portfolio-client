import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

test('DB 목업을 읽고 시연 변경은 세션에 반영한다', async () => {
  const data = new Map();
  globalThis.sessionStorage = { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value), removeItem: (key) => data.delete(key) };
  globalThis.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {}, get length() { return 0; }, key: () => null };
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { portfolioApi } = await server.ssrLoadModule('/src/api/index.js');
    const { apiClient } = await server.ssrLoadModule('/src/features/moyang/lib/api-client.js');
    const { completeDemoActivity } = await server.ssrLoadModule('/src/features/moyang/lib/demo-session.js');
    const fixtures = {
      '/api/users/me': { userId: 1, nickname: '이전 이름', onboarding: null },
      '/api/shapes/me': { themeCode: 'STUDY_CAREER', themeName: '진로', weekdays: [], completedRounds: 1, totalRounds: 3, nextRound: 2 },
      '/api/meetings/202': { meetingId: 202, type: 'LIVE', title: '모임', description: '소개', joined: true, status: 'IN_PROGRESS', phase: 'INTRO', participantCount: 2, canSkip: true },
      '/api/meetings/202/messages': { status: 'IN_PROGRESS', phase: 'INTRO', currentStep: 1, topic: '마음', submittedDrawingCount: 0, participantCount: 2, messages: [{ messageId: 1, type: 'SYSTEM', content: '시작' }] },
      '/api/meetings?type=LIVE': { meetings: [] },
      '/api/records?size=20': { items: [{ recordId: 101, recordDate: '2026-11-10', title: '그림', imageUrl: null }], hasNext: false, nextCursor: null },
    };
    const requests = [];
    portfolioApi.defaults.adapter = async (config) => {
      requests.push(config);
      const value = fixtures[config.params.path];
      if (!value) throw new Error(`등록되지 않은 경로: ${config.params.path}`);
      return { config, status: 200, statusText: 'OK', headers: {}, data: { success: true, data: { success: true, data: structuredClone(value) } } };
    };

    await apiClient.patch('/api/users/me/nickname', { nickname: '새 이름' });
    assert.equal((await apiClient.get('/api/users/me')).data.data.nickname, '새 이름');
    const saved = await apiClient.put('/api/shapes/me/schedule', { weekdays: ['MON'] });
    assert.equal(saved.data.data.themeName, '진로');
    assert.deepEqual((await apiClient.get('/api/shapes/me')).data.data.weekdays, ['MON']);
    assert.equal(completeDemoActivity({ round: 2, concern: { id: 'STUDY_CAREER' } }), true);
    assert.equal((await apiClient.get('/api/shapes/me')).data.data.completedRounds, 2);
    await apiClient.put('/api/users/me/onboarding', { themeCode: 'LOVE', emotions: [] });
    assert.equal((await apiClient.get('/api/users/me')).data.data.onboarding.themeCode, 'LOVE');
    assert.equal((await apiClient.get('/api/shapes/me')).data.data.themeCode, 'LOVE');
    await apiClient.post('/api/meetings/202/messages', { type: 'TEXT', content: '안녕하세요' });
    assert.equal((await apiClient.get('/api/meetings/202/messages')).data.data.messages.at(-1).content, '안녕하세요');
    await apiClient.post('/api/meetings/202/phase/next');
    assert.equal((await apiClient.get('/api/meetings/202/messages')).data.data.phase, 'DRAWING');
    await apiClient.post('/api/meetings/202/messages', { type: 'DRAWING', drawingId: 123 });
    assert.equal((await apiClient.get('/api/meetings/202/messages')).data.data.phase, 'SHARING');
    const created = await apiClient.post('/api/meetings', { type: 'LIVE', title: '새 모임', description: '소개', meetingNickname: '나', capacity: 4 });
    const id = created.data.data.meetingId;
    assert.ok((await apiClient.get('/api/meetings', { params: { type: 'LIVE' } })).data.data.meetings.some((item) => item.meetingId === id));
    await apiClient.post(`/api/meetings/${id}/start`);
    assert.equal((await apiClient.get(`/api/meetings/${id}/messages`)).data.data.status, 'IN_PROGRESS');
    await apiClient.post(`/api/meetings/${id}/end`);
    assert.equal((await apiClient.get(`/api/meetings/${id}/reflection`)).data.data.meetingId, id);
    assert.equal((await apiClient.get('/api/records/calendar', { params: { month: '2026-11' } })).data.data.items[0].date, '2026-11-10');
    await assert.rejects(apiClient.post('/api/unknown', {}), /지원하지 않는 데모 동작/);
    assert.ok(requests.every((request) => request.method === 'get'));
  } finally {
    await server.close();
    delete globalThis.sessionStorage;
    delete globalThis.localStorage;
  }
});
