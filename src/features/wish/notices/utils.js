export function formatDate(value) {
    if (!value)
        return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return value.slice(0, 10);
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
        .format(date)
        .replaceAll('. ', '-')
        .replace('.', '');
}
export function withNoticePrefix(title) {
    return title.startsWith('[') ? title : `[공지] ${title}`;
}
export function withLostItemPrefix(title) {
    return title.startsWith('[') ? title : `[분실] ${title}`;
}
export function getNextPageParam(page) {
    const nextPage = page.page + 1;
    return nextPage < page.totalPages ? nextPage : undefined;
}
export function isImageAttachment(contentType, url = '') {
    const type = contentType.trim().toLowerCase();
    if (type)
        return type.startsWith('image/');
    return /\.(avif|gif|jpe?g|png|webp)$/i.test(url.split('?')[0] ?? '');
}
export function isVideoAttachment(contentType, url = '') {
    const type = contentType.trim().toLowerCase();
    if (type)
        return type.startsWith('video/');
    return /\.(mp4|mov|m4v|webm)$/i.test(url.split('?')[0] ?? '');
}
export function getBannerImage(notice) {
    return notice.media.find((attachment) => attachment.url && isImageAttachment(attachment.contentType, attachment.url));
}
export function getLostItemStatus(item) {
    if (item.statusLabel)
        return item.statusLabel;
    if (item.status === 'RETURNED')
        return '반환 완료';
    if (item.status === 'HOLDING')
        return '보관 중';
    return '';
}
