export function normalizePerformance(performance) {
    const category = performance.category;
    return {
        id: performance.id ?? null,
        category: category === 'CELEBRITY' ||
            category === 'CLUB' ||
            category === 'INDIVIDUAL' ||
            category === 'MC'
            ? category
            : null,
        categoryLabel: performance.categoryLabel ?? null,
        teamName: performance.teamName ?? null,
        memberNames: performance.memberNames ?? [],
        description: performance.description ?? null,
        imageUrl: performance.images?.find(({ kind, url }) => kind === 'IMAGE' && url)?.url ?? null,
        startsAt: performance.startsAt ?? null,
        endsAt: performance.endsAt ?? null,
        publishedAt: performance.publishedAt ?? null,
    };
}
