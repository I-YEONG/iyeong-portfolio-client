import { apiClient } from '@/features/moyang/lib/api-client';
export const loadProgramConcern = async (signal) => {
    const { data: profile } = await apiClient.get('/api/users/me', { signal });
    const onboarding = profile.success ? profile.data?.onboarding : null;
    if (!onboarding?.themeCode)
        return;
    const { themeCode, themeText } = onboarding;
    if (themeCode === 'DIRECT') {
        const label = themeText?.trim();
        return label ? { id: `DIRECT:${label}`, label } : undefined;
    }
    const { data: options } = await apiClient.get('/api/onboarding/options', {
        signal,
    });
    const theme = options.success
        ? options.data?.themes.find(({ code }) => code === themeCode)
        : undefined;
    if (theme)
        return { id: theme.code, label: theme.label };
};
