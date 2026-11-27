import { apiClient } from '@/features/wish/shared/lib/api-client';
export async function getPolls(signal) {
    const { data } = await apiClient.get('/api/polls', { signal });
    return data;
}
export async function getPoll(id, signal) {
    const { data } = await apiClient.get(`/api/polls/${id}`, { signal });
    return data;
}
export async function getPollResults(id, signal) {
    const { data } = await apiClient.get(`/api/polls/${id}/results`, { signal });
    return data;
}
export async function getMyPollSubmissions(id, signal) {
    const { data } = await apiClient.get(`/api/polls/${id}/submissions/me`, {
        signal,
    });
    return data;
}
export async function submitPoll(id, answers, signal) {
    const { data } = await apiClient.post(`/api/polls/${id}/submissions`, { answers }, { signal });
    return data;
}
