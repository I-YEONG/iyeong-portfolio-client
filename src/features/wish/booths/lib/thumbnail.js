/** 부스 이미지가 올라가는 CDN. Cloudflare 이미지 리사이즈가 켜져 있다. */
const CDN_ORIGIN = 'https://cdn.syu-likelion.org';
const RESIZE_PREFIX = '/cdn-cgi/image/';
/**
 * 카드처럼 작게 보여 줄 이미지를 CDN에서 줄여 받는다.
 * 원본은 장당 최대 2MB가 넘어 70px 원에 쓰기엔 너무 무겁다. (192px avif 기준 수 KB)
 * CDN 밖 주소나 이미 변환된 주소는 그대로 돌려준다.
 */
export function toThumbnailUrl(url, width) {
    if (!url.startsWith(`${CDN_ORIGIN}/`))
        return url;
    const path = url.slice(CDN_ORIGIN.length);
    if (path.startsWith(RESIZE_PREFIX))
        return url;
    return `${CDN_ORIGIN}${RESIZE_PREFIX}width=${width},quality=80,format=auto${path}`;
}
