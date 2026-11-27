export function getEarliestPublishedAt(performances) {
    return performances
        .flatMap(({ publishedAt }) => {
        const time = publishedAt ? new Date(publishedAt).getTime() : Number.NaN;
        return Number.isFinite(time) && publishedAt ? [{ publishedAt, time }] : [];
    })
        .sort((left, right) => left.time - right.time)[0]?.publishedAt;
}
export function hasReleaseStarted(releaseAt, now = Date.now()) {
    const releaseTime = new Date(releaseAt).getTime();
    return Number.isFinite(releaseTime) && releaseTime <= now;
}
export function getTimetablePublishedAt(performances) {
    return getEarliestPublishedAt(performances.filter(({ category }) => category === 'INDIVIDUAL'));
}
