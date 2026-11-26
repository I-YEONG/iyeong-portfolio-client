import { useQuery } from '@tanstack/react-query';
import { getSponsors } from '../api/getSponsors';
export const sponsorKeys = {
    all: ['sponsors'],
};
export function useSponsors() {
    return useQuery({ queryKey: sponsorKeys.all, queryFn: getSponsors });
}
