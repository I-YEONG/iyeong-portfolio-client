import axios from 'axios';
import { apiClient, isMoyangLoggedIn } from './api-client';
export const hasMoyangApi = true;
export class MoyangApiError extends Error {
    code;
    status;
    constructor(code, status) {
        super(code);
        this.code = code;
        this.status = status;
    }
}
export const moyangRequest = (signal, token = isMoyangLoggedIn()) => {
    const assertCurrent = () => {
        if (signal?.aborted || token !== isMoyangLoggedIn()) {
            throw new DOMException('Request cancelled', 'AbortError');
        }
    };
    const request = async (url, config) => {
        assertCurrent();
        if (!token)
            throw new MoyangApiError('UNAUTHORIZED', 401);
        try {
            const response = await apiClient.request({
                ...config,
                url,
                signal,
            });
            assertCurrent();
            return response.data;
        }
        catch (error) {
            assertCurrent();
            if (axios.isAxiosError(error)) {
                throw new MoyangApiError(error.response?.data?.error?.code ?? error.code ?? 'REQUEST_FAILED', error.response?.status);
            }
            throw error;
        }
    };
    return {
        async json(url, config) {
            const body = await request(url, config);
            if (!body?.success)
                throw new MoyangApiError(body?.error?.code ?? 'INVALID_RESPONSE');
            return body.data;
        },
        image(url) {
            if (!/^\/api\/drawings\/\d+\/image$/.test(url))
                throw new MoyangApiError('INVALID_IMAGE_PATH');
            return request(url, { responseType: 'blob' });
        },
    };
};
