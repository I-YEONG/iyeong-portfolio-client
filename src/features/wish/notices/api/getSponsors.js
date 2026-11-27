import { apiClient } from '@/features/wish/shared/lib/api-client';
import { normalizeSponsor } from '../types';
export async function getSponsors() {
    const { data } = await apiClient.get('/api/sponsors');
    return data.map(normalizeSponsor);
}
