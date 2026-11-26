import { getMoyangMock } from '@/features/moyang/api/getMoyangMock';
import { getNextActivityDate, getToday } from '@/features/moyang/personal-program/programSchedule';
import { getWoolBalance, readReflections } from '@/features/moyang/lib/mock-reflections';
import { mockOptions } from '@/features/moyang/lib/mock-options';

const key = 'moyang:portfolio-demo';
let memory = {};
let memoryOnly = false;
const read = () => {
  if (memoryOnly) return memory;
  try { return JSON.parse(sessionStorage.getItem(key) || '{}'); } catch { return memory; }
};
const write = (value) => {
  memory = value;
  if (memoryOnly) return;
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { memoryOnly = true; }
};
const imageData = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(reader.error);
  reader.readAsDataURL(blob);
});
const success = (data) => ({ success: true, data });
const unwrap = async (path, signal) => {
  const result = await getMoyangMock(path, signal);
  signal?.throwIfAborted();
  if (!result.success) throw new Error('목업 데이터를 불러오지 못했습니다.');
  return result.data;
};
const detailPath = (id) => `/api/meetings/${id}`;
const getMeeting = async (state, id, signal) => state.meetings?.[id] ?? unwrap(detailPath(id), signal);
const meetingLists = ['/api/meetings?type=LIVE', '/api/meetings?type=SCHEDULED', '/api/meetings/me'];
const dayCodes = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const readDemo = async (path, signal) => {
  const state = read();
  if (path === '/api/sheep') {
    const balance = await unwrap(path, signal);
    return success({ ...balance, balance: balance.balance + getWoolBalance(readReflections()) });
  }
  if (path === '/api/users/me' && state.user) return success(state.user);
  if (path === '/api/shapes/me' && state.shape) return success(state.shape);
  if (path.startsWith('/api/topics/recommended?')) return getMoyangMock('/api/topics/recommended', signal);
  const detail = path.match(/^\/api\/meetings\/(\d+)$/);
  if (detail) {
    const meeting = state.meetings?.[detail[1]] ?? await unwrap(path, signal);
    return success(meeting.status === 'IN_PROGRESS' ? { ...meeting, canSkip: true } : meeting);
  }
  const chat = path.match(/^\/api\/meetings\/(\d+)\/messages$/);
  if (chat && state.chats?.[chat[1]]) return success(state.chats[chat[1]]);
  const reflection = path.match(/^\/api\/meetings\/(\d+)\/reflection$/);
  if (reflection && state.chats?.[reflection[1]]?.status === 'ENDED') {
    const chat = state.chats[reflection[1]];
    const drawing = chat.messages.findLast((message) => message.mine && message.type === 'DRAWING');
    return success({ meetingId: Number(reflection[1]), recordId: Number(reflection[1]), drawing: { drawingId: drawing?.messageId ?? Number(reflection[1]), imageUrl: drawing?.imageUrl ?? null, topicTitle: chat.topic }, card: { todaysStory: '함께 그림을 그리고 이야기를 나누었어요.' } });
  }
  if (path.startsWith('/api/records?') || path.startsWith('/api/records/calendar?')) {
    const base = await unwrap('/api/records?size=20', signal);
    const local = readReflections().records.map((record) => ({ recordId: record.recordId ?? record.drawingId, recordDate: record.recordDate, title: record.title, imageUrl: record.imageUrl ?? null }));
    const items = [...local, ...base.items].sort((a, b) => b.recordDate.localeCompare(a.recordDate));
    const params = new URLSearchParams(path.split('?')[1]);
    if (path.startsWith('/api/records/calendar?')) {
      return success({ items: items.filter((item) => item.recordDate.startsWith(params.get('month'))).map(({ recordDate, ...item }) => ({ ...item, date: recordDate })) });
    }
    const size = Number(params.get('size')) || 20;
    return success({ ...base, items: items.slice(0, size), nextCursor: null, hasNext: false });
  }
  if (meetingLists.includes(path) && state.meetings) {
    const base = await unwrap(path, signal);
    const items = new Map(base.meetings.map((item) => [String(item.meetingId), item]));
    for (const meeting of Object.values(state.meetings)) {
      const id = String(meeting.meetingId);
      const belongs = path.endsWith('/me') ? meeting.joined || meeting.isHost : path.endsWith(`type=${meeting.type}`);
      if (belongs && !['CANCELED', 'ENDED'].includes(meeting.status)) items.set(id, { ...items.get(id), ...meeting, summary: meeting.summary ?? meeting.description });
      else items.delete(id);
    }
    return success({ ...base, meetings: [...items.values()] });
  }
  return getMoyangMock(path, signal);
};

const initialChat = (meeting) => ({
  status: meeting.status, phase: meeting.phase ?? 'INTRO', currentStep: 1,
  topic: meeting.topic ?? '오늘의 마음', submittedDrawingCount: 0,
  participantCount: meeting.participantCount, endAgreed: false, endAgreedCount: 0,
  endAt: null, deleteAt: null, messages: [],
});
const readChat = async (state, id, meeting, signal) => {
  if (state.chats?.[id]) return state.chats[id];
  try { return await unwrap(`${detailPath(id)}/messages`, signal); }
  catch (error) {
    if (error.response?.status !== 404 && !state.meetings?.[id]) throw error;
    return initialChat(meeting);
  }
};

export const updateDemo = async (url, method, input, config) => {
  const state = read();
  const signal = config.signal;
  if (url === '/api/users/me/onboarding' || url === '/api/users/me/nickname' || url === '/api/users/me/sheep-color') {
    const user = state.user ?? await unwrap('/api/users/me', signal);
    state.user = url.endsWith('/onboarding') ? { ...user, onboarding: input, onboardingCompleted: true } : { ...user, ...input };
    if (url.endsWith('/onboarding') && input.themeCode) {
      const shape = state.shape ?? await unwrap('/api/shapes/me', signal);
      if (shape && shape.themeCode !== input.themeCode) {
        const themeName = input.themeCode === 'DIRECT' ? input.themeText : mockOptions.themes.find((item) => item.code === input.themeCode)?.label;
        state.shape = { ...shape, themeCode: input.themeCode, themeName: themeName || '나의 고민', completedRounds: 0, nextRound: 1, weekdays: [], nextActivityDate: null };
      }
    }
    write(state);
    return success(url.endsWith('/onboarding') ? input : state.user);
  }
  if (url === '/api/shapes/me/schedule') {
    const shape = state.shape ?? await unwrap('/api/shapes/me', signal);
    const days = input.weekdays.map((day) => dayCodes.indexOf(day)).filter((day) => day >= 0);
    const today = getToday();
    state.shape = { ...shape, weekdays: input.weekdays, nextActivityDate: getNextActivityDate(days, today, shape.nextActivityDate === today) };
    write(state);
    return success(state.shape);
  }
  if (url === '/api/meetings' && method === 'post') {
    const id = Date.now();
    const meeting = { ...input, meetingId: id, summary: input.description, participantCount: 2, status: 'RECRUITING', joined: true, isHost: true, myMeetingNickname: input.meetingNickname, minParticipants: 2, canStart: true, canSkip: true, phase: null, tags: [], steps: [], recommendedFor: [], topic: null, enterOpenAt: input.startAt ?? null, cancelRefundUntil: input.startAt ?? null };
    state.meetings = { ...state.meetings, [id]: meeting };
    write(state);
    return success({ meetingId: id, status: meeting.status });
  }
  const match = url.match(/^\/api\/meetings\/(\d+)(.*)$/);
  if (match) {
    const [, id, action] = match;
    const meeting = { ...await getMeeting(state, id, signal) };
    state.meetings ??= {};
    if (action === '/participants' && method === 'post') {
      meeting.joined = true; meeting.myMeetingNickname = input.meetingNickname || '나'; meeting.participantCount += 1;
    } else if (action === '/participants/me' || (!action && method === 'delete')) {
      meeting.joined = false; meeting.status = meeting.isHost ? 'CANCELED' : meeting.status; meeting.participantCount = Math.max(0, meeting.participantCount - 1);
    } else if (action === '/enter') {
      meeting.joined = true; meeting.status = meeting.status === 'IN_PROGRESS' ? 'IN_PROGRESS' : 'OPEN';
    } else if (action === '/start') {
      meeting.status = 'IN_PROGRESS'; meeting.phase = 'INTRO'; meeting.joined = true;
      state.chats = { ...state.chats, [id]: initialChat(meeting) };
    } else if (action === '/messages' || action === '/phase/next' || action === '/end') {
      const chat = { ...await readChat(state, id, meeting, signal) };
      if (action === '/messages') {
        const messageId = Math.max(0, ...chat.messages.map((message) => message.messageId)) + 1;
        const message = { messageId, type: input.type, senderNickname: meeting.myMeetingNickname || '나', content: input.content ?? null, imageUrl: input.type === 'DRAWING' ? state.drawings?.[input.drawingId]?.imageUrl ?? null : null, mine: true, createdAt: new Date().toISOString() };
        chat.messages = [...chat.messages, message];
        if (input.type === 'DRAWING') {
          chat.submittedDrawingCount = chat.participantCount;
          chat.phase = 'SHARING'; chat.currentStep = 3; meeting.phase = 'SHARING'; meeting.canSkip = true;
        }
        state.chats = { ...state.chats, [id]: chat }; state.meetings[id] = meeting; write(state);
        return success({ messageId });
      }
      if (action === '/phase/next') {
        const phases = ['INTRO', 'DRAWING', 'SHARING', 'CLOSING'];
        chat.phase = phases[Math.min(phases.indexOf(chat.phase) + 1, phases.length - 1)];
        chat.currentStep = phases.indexOf(chat.phase) + 1; meeting.phase = chat.phase; meeting.canSkip = true;
      } else {
        chat.status = 'ENDED'; chat.endAgreed = true; chat.endAt = new Date().toISOString(); chat.deleteAt = new Date(Date.now() + 86400000).toISOString(); meeting.status = 'ENDED';
      }
      state.chats = { ...state.chats, [id]: chat };
    }
    state.meetings[id] = meeting;
    write(state);
    return success({ ...meeting, sheepUsed: 1, refunded: true, hostRefunded: true });
  }
  if (url === '/api/drawings' && method === 'post') {
    const id = Date.now();
    const image = input instanceof FormData ? input.get('image') : null;
    const imageUrl = image instanceof Blob ? await imageData(image) : null;
    state.drawings = { ...state.drawings, [id]: { imageUrl } };
    write(state);
    return success({ drawingId: id, recordId: id });
  }
  throw new Error(`지원하지 않는 데모 동작: ${method.toUpperCase()} ${url}`);
};

export const completeDemoActivity = (activity) => {
  const state = read();
  const shape = state.shape;
  if (!shape || shape.themeCode !== activity.concern.id) return false;
  if (shape.completedRounds >= activity.round) return true;
  if (shape.nextRound !== activity.round) return false;
  const completedRounds = activity.round;
  const nextRound = completedRounds >= shape.totalRounds ? null : completedRounds + 1;
  const days = shape.weekdays.map((day) => dayCodes.indexOf(day)).filter((day) => day >= 0);
  state.shape = { ...shape, completedRounds, nextRound, nextActivityDate: nextRound ? getNextActivityDate(days, getToday()) : null };
  write(state);
  return true;
};
