import { ApiError } from '@/features/wish/shared/lib/api-client';
import { DEFAULT_BIRTHDAY_MESSAGE_DESIGN_NO } from './lib/stationery';
export function normalizeBirthdayMessage(message) {
    const { id, content, heartCount, heartedByMe, mine, createdAt } = message;
    if (typeof id !== 'number' ||
        !Number.isSafeInteger(id) ||
        id <= 0 ||
        typeof content !== 'string' ||
        typeof heartCount !== 'number' ||
        !Number.isSafeInteger(heartCount) ||
        typeof heartedByMe !== 'boolean' ||
        typeof mine !== 'boolean' ||
        typeof createdAt !== 'string') {
        throw new ApiError(502, 'INVALID_BIRTHDAY_MESSAGE_RESPONSE', '축하 편지 응답 형식이 올바르지 않습니다.');
    }
    return {
        id,
        content,
        author: message.author
            ? {
                department: message.author.department,
                maskedStudentNo: message.author.maskedStudentNo,
                maskedName: message.author.maskedName,
            }
            : null,
        heartCount,
        heartedByMe,
        mine,
        createdAt,
        designNo: message.designNo ?? DEFAULT_BIRTHDAY_MESSAGE_DESIGN_NO,
    };
}
