/** 해제 여부는 서버의 muted 값을 따르고, 해제 예정 시각은 한국시간 기준으로 표시한다. */
export function getBambooMuteMessage(mutedUntil) {
    const date = mutedUntil ? new Date(mutedUntil) : null;
    if (!date || Number.isNaN(date.getTime())) {
        return '대나무숲 이용이 정지된 상태입니다.\n해제 예정 시간이 안내되지 않았습니다.\n관리자에게 문의해주세요.';
    }
    const until = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    }).format(date);
    return `대나무숲 이용이 정지된 상태입니다.\n해제 예정: ${until}`;
}
