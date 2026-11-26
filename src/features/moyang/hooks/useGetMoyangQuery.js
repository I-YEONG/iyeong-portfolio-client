import { useQuery } from '@tanstack/react-query';
import { getDataApi } from '@/api/getDataApi';

export const useGetMoyangQuery = (path, options = {}) => useQuery({
  queryKey: ['moyang', path],
  queryFn: async ({ signal }) => {
    const response = await getDataApi('moyang', path, { signal });
    if (response === undefined || response?.success === false) throw new Error('목업 데이터를 불러오지 못했습니다.');
    return response?.success === true ? response.data : response;
  },
  ...options,
});
