import { portfolioApi } from "@/api";

/**
 * const { data: cert, isLoading: isCertLoading, isError: isCertError } = useCertificationsQuery();
 * @param {*} param0
 * @returns JSON 데이터
 */
export const getDataApi = async (project, path) => {
  const { data } = await portfolioApi.get(`/api/projects/${project}/mocks?path=${path}`);
  return data.data;
};
