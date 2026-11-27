export const colors = ['white', 'pink', 'green', 'purple', 'blue'];
const sheepColorKey = (userId) => `moyang.sheepColor:user:${userId}`;
/** 선택한 색상은 이 브라우저에 계정별로 보관한다. */
export const readSheepColor = (userId) => {
    try {
        const value = userId !== null ? localStorage.getItem(sheepColorKey(userId)) : null;
        return colors.find((color) => color === value) ?? 'green';
    }
    catch {
        return 'green';
    }
};
export const writeSheepColor = (userId, color) => {
    try {
        if (userId === null)
            return false;
        localStorage.setItem(sheepColorKey(userId), color);
        return true;
    }
    catch {
        return false;
    }
};
/** 미리보기에서만 사용하는 프로필 값을 현재 브라우저 세션에 보관한다. */
export const readPreviewColor = () => {
    try {
        const value = sessionStorage.getItem('moyang.preview.sheepColor');
        return colors.find((color) => color === value) ?? 'green';
    }
    catch {
        return 'green';
    }
};
export const writePreviewValue = (key, value) => {
    try {
        sessionStorage.setItem(`moyang.preview.${key}`, value);
    }
    catch {
        /* 저장소를 사용할 수 없는 환경 */
    }
};
export const readPreviewNickname = () => {
    try {
        return sessionStorage.getItem('moyang.preview.nickname') ?? '딸기를 좋아하는 양';
    }
    catch {
        return '딸기를 좋아하는 양';
    }
};
