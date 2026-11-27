import { useAuth } from '@/hooks/useAuth';
export function useLogin() {
  const { login } = useAuth();
  return { submit: async () => { login(); return 'success'; }, isPending: false, error: null, resetError: () => {} };
}
