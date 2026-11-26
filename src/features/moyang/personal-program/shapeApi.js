import { moyangRequest } from '@/features/moyang/lib/moyang-api';
export const weekdayCodes = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const loadServerShape = (signal) => moyangRequest(signal).json('/api/shapes/me');
/** 기록이 하나뿐일 때만 해당 그림의 실제 주제를 확인한다. */
export const loadOnlyRecordTopic = async (signal) => {
    const api = moyangRequest(signal);
    const records = await api.json('/api/records', { params: { size: 2 } });
    if (!records ||
        !Array.isArray(records.items) ||
        records.items.length !== 1 ||
        records.hasNext !== false)
        return null;
    const record = records.items[0];
    const drawingId = /^\/api\/drawings\/(\d+)\/image$/.exec(record.imageUrl ?? '')?.[1];
    if (!drawingId)
        return null;
    const drawing = await api.json(`/api/drawings/${drawingId}`);
    return drawing?.recordId === record.recordId ? drawing.topic?.title?.trim() || null : null;
};
