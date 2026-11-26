import { portfolioApi } from "@/api";

/**
 * const { data: cert, isLoading: isCertLoading, isError: isCertError } = useCertificationsQuery();
 * @param {*} param0
 * @returns JSON 데이터
 */
export const getDataApi = async (project, path, options = {}) => {
  const { data } = await portfolioApi.get(`/api/projects/${project}/mocks`, { ...options, params: { path } });

  if (!data || !data.data || !data.success) {
    return alert(data.message || "데이터를 불러오지 못했습니다.");
  }

  return data.data;
};
