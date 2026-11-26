import { getBoothMarkerIcon } from './category';
const MARKER_HIT_SIZE = 44;
const MARKER_SIZE = 32;
/** 기존 부스별 아이콘을 유지하고 선택 상태와 키보드 조작을 표시한다. */
export function createBoothMarkerIcon(maps, booth, isSelected, labelWidth, onKeyboardSelect) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className =
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue';
    Object.assign(button.style, {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${MARKER_HIT_SIZE}px`,
        height: `${MARKER_HIT_SIZE}px`,
        padding: '0',
        margin: '0',
        border: '0',
        borderRadius: '50%',
        background: 'transparent',
        overflow: 'visible',
        cursor: 'pointer',
        fontFamily: "'Pretendard Variable', sans-serif",
    });
    updateBoothMarkerIcon(button, booth, isSelected, labelWidth);
    // 기본 버튼 클릭과 SDK 클릭이 중복되지 않도록 키보드 선택만 직접 처리한다.
    const id = booth.id;
    button.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ')
            return;
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat && id !== null)
            onKeyboardSelect(id);
    });
    // 같은 마커를 빠르게 재선택해도 지도 배경의 더블클릭 확대가 실행되지 않는다.
    button.addEventListener('dblclick', (event) => event.stopPropagation());
    return {
        content: button,
        size: new maps.Size(MARKER_HIT_SIZE, MARKER_HIT_SIZE),
        anchor: new maps.Point(MARKER_HIT_SIZE / 2, MARKER_HIT_SIZE / 2),
    };
}
/** 같은 마커 버튼을 유지하면서 표시만 바꿔 데이터 갱신 중에도 포커스를 보존한다. */
export function updateBoothMarkerIcon(button, booth, isSelected, labelWidth) {
    const name = booth.name ?? '부스';
    button.setAttribute('aria-label', `${name} 지도에서 보기`);
    button.setAttribute('aria-pressed', String(isSelected));
    button.style.boxShadow = isSelected
        ? '0 0 0 2px #fff, 0 0 0 4px #2D7DC8, 0 2px 8px #2A315B55'
        : 'none';
    let image = button.querySelector('[data-booth-marker-image]');
    if (!image) {
        image = document.createElement('img');
        image.setAttribute('data-booth-marker-image', '');
        button.append(image);
    }
    image.src = getBoothMarkerIcon(booth.category);
    image.alt = '';
    image.draggable = false;
    // image.width는 이전 CSS 표시 너비를 반환할 수 있으므로 목표 크기를 직접 사용한다.
    const imageSize = isSelected ? MARKER_HIT_SIZE : MARKER_SIZE;
    image.width = imageSize;
    image.height = imageSize;
    Object.assign(image.style, {
        display: 'block',
        width: `${imageSize}px`,
        height: `${imageSize}px`,
        maxWidth: 'none',
        borderRadius: '50%',
        pointerEvents: 'none',
    });
    let label = button.querySelector('[data-booth-marker-label]');
    if (isSelected) {
        if (!label) {
            label = document.createElement('span');
            label.setAttribute('data-booth-marker-label', '');
            button.append(label);
        }
        label.textContent = name;
        label.setAttribute('aria-hidden', 'true');
        Object.assign(label.style, {
            position: 'absolute',
            top: `${MARKER_HIT_SIZE + 4}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${Math.max(64, Math.min(196, labelWidth - 24))}px`,
            boxSizing: 'border-box',
            display: '-webkit-box',
            maxHeight: '34px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            overflowWrap: 'anywhere',
            padding: '3px 8px',
            borderRadius: '8px',
            background: '#fff',
            color: '#2A315B',
            fontSize: '12px',
            fontWeight: '600',
            lineHeight: '14px',
            textAlign: 'center',
            boxShadow: '0 2px 8px #2A315B33',
            pointerEvents: 'none',
        });
        label.style.setProperty('-webkit-line-clamp', '2');
        label.style.setProperty('-webkit-box-orient', 'vertical');
    }
    else {
        label?.remove();
    }
}
