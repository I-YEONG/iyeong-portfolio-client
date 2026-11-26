import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile } from '../api/updateProfile';
/** 개인정보 수정. 성공하면 내 정보 캐시를 다시 불러온다. */
export function useUpdateProfile() {
    const client = useQueryClient();
    return useMutation({
        mutationFn: updateProfile,
        retry: false,
        onSuccess: () => {
            void client.invalidateQueries({ queryKey: ['auth'] });
        },
    });
}
