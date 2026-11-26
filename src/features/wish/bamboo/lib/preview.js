export function getBambooPreview(searchParams) {
    if (!import.meta.env.DEV)
        return null;
    const preview = searchParams.get('preview');
    return preview === 'released' || preview === 'error' || preview === 'ban' ? preview : null;
}
