import axios from 'axios';
import { readDemo, updateDemo } from './demo-session';
import exampleDrawing from '@/assets/moyang/drawing/drawing-2.png';

// 라우트에서 공통 인증 상태를 전달받아 비동기 작업 중에도 확인한다.
let loggedIn = false;
export const setMoyangLoginState = (value) => { loggedIn = Boolean(value); };
export const isMoyangLoggedIn = () => loggedIn;

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
      if (config.responseType === 'blob' && /^\/api\/drawings\/\d+\/image$/.test(url)) {
        const response = await fetch(exampleDrawing, { signal: config.signal });
        if (!response.ok) throw new Error('예시 그림을 불러오지 못했습니다.');
        data = await response.blob();
      } else {
        data = await readDemo(path, config.signal);
      }
    } else {
      let input = config.data;
      if (typeof input === 'string') { try { input = JSON.parse(input); } catch { input = {}; } }
      data = await updateDemo(url, method, input, config);
    }
    return { data, status: 200, statusText: 'OK', headers: {}, config };
  },
});
