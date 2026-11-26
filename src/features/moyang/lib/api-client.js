import axios from 'axios';
import { getMoyangMock } from '@/features/moyang/api/getMoyangMock';
import meetings from '@/mockup/moyang/meeting-api.json';

// 라우트에서 공통 인증 상태를 전달받아 비동기 작업 중에도 확인한다.
let loggedIn = false;
export const setMoyangLoginState = (value) => { loggedIn = Boolean(value); };
export const isMoyangLoggedIn = () => loggedIn;

const mutationResult = (url, method, input) => {
  const rules = [
    [/^\/api\/meetings$/, 'post', 'create'], [/\/participants\/me$/, 'delete', 'leave'],
    [/\/participants$/, 'post', 'join'], [/\/enter$/, 'post', 'enter'],
    [/\/start$/, 'post', 'start'], [/\/phase\/next$/, 'post', 'nextPhase'],
    [/\/end$/, 'post', 'end'], [/\/messages$/, 'post', input?.type === 'DRAWING' ? 'sendDrawing' : 'sendText'],
    [/^\/api\/meetings\/\d+$/, 'delete', 'cancel'],
  ];
  const match = rules.find(([pattern, verb]) => verb === method && pattern.test(url));
  if (match) return structuredClone(meetings[match[2]].response);
  if (url === '/api/drawings') return { success: true, data: { drawingId: 101 } };
  return { success: true, data: input || {} };
};

export const apiClient = axios.create({
  adapter: async (config) => {
    const method = (config.method || 'get').toLowerCase();
    const url = config.url || '';
    let data;
    if (method === 'get') {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(config.params || {})) {
        if (value !== undefined && value !== null) params.append(key, value);
      }
      const query = params.toString();
      const path = query ? `${url}${url.includes('?') ? '&' : '?'}${query}` : url;
      data = await getMoyangMock(path, config.signal);
    } else {
      let input = config.data;
      if (typeof input === 'string') { try { input = JSON.parse(input); } catch { input = {}; } }
      data = mutationResult(url, method, input);
    }
    return { data, status: 200, statusText: 'OK', headers: {}, config };
  },
});
