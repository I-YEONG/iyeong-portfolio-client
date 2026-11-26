import { getDataApi } from '@/api/getDataApi';

export const getMoyangMock = async (path, signal) => {
  const data = await getDataApi('moyang', path, { signal });
  if (data === undefined) throw new Error('목업 데이터를 불러오지 못했습니다.');
  return data && typeof data.success === 'boolean' ? data : { success: true, data };
};
