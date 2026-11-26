import { useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
export function useLogout() {
  const { logout } = useAuth();
  return useMutation({ mutationFn: async () => logout(), retry: false });
}
