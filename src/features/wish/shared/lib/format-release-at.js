export function formatReleaseAt(releaseAt) {
    const date = new Date(releaseAt);
    if (Number.isNaN(date.getTime()))
        return releaseAt;
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(date);
    const valueOf = (type) => parts.find((part) => part.type === type)?.value ?? '';
    return `${valueOf('year')}.${valueOf('month')}.${valueOf('day')} (${valueOf('weekday').toUpperCase()}) ${valueOf('hour')}:${valueOf('minute')}`;
}
