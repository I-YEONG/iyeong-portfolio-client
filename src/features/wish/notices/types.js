function normalizeNoticeAttachment(attachment) {
    return {
        id: attachment.id ?? null,
        url: attachment.url ?? '',
        originalFilename: attachment.originalFilename ?? '',
        contentType: attachment.contentType ?? '',
        size: attachment.size ?? null,
        displayOrder: attachment.displayOrder ?? 0,
    };
}
export function normalizeNotice(notice) {
    return {
        id: notice.id ?? 0,
        title: notice.title ?? '',
        content: notice.content ?? '',
        banner: notice.banner ?? false,
        pinned: notice.pinned ?? false,
        viewCount: notice.viewCount ?? 0,
        media: (notice.media ?? []).map(normalizeNoticeAttachment),
        files: (notice.files ?? []).map(normalizeNoticeAttachment),
        authorName: notice.authorName ?? '',
        createdAt: notice.createdAt ?? null,
        updatedAt: notice.updatedAt ?? null,
    };
}
function normalizeLostItemImage(image) {
    return {
        id: image.id ?? null,
        url: image.url ?? '',
        displayOrder: image.displayOrder ?? 0,
    };
}
export function normalizeLostItem(item) {
    return {
        id: item.id ?? 0,
        title: item.title ?? '',
        content: item.content ?? '',
        foundLocation: item.foundLocation ?? '',
        status: item.status ?? null,
        statusLabel: item.statusLabel ?? '',
        pinned: item.pinned ?? false,
        viewCount: item.viewCount ?? 0,
        images: (item.images ?? []).map(normalizeLostItemImage),
        authorName: item.authorName ?? '',
        createdAt: item.createdAt ?? null,
        updatedAt: item.updatedAt ?? null,
    };
}
export function normalizeSponsor(sponsor) {
    return {
        id: sponsor.id ?? 0,
        name: sponsor.name ?? '',
        description: sponsor.description ?? '',
        imageUrl: sponsor.imageUrl ?? '',
        boothId: sponsor.boothId ?? null,
        boothName: sponsor.boothName ?? '',
    };
}
