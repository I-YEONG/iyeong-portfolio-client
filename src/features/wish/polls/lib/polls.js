export function filterPolls(polls, state) {
    return polls.filter((poll) => poll.state === state);
}
export function formatPollTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime()))
        return '시간 미정';
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Seoul',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
    }).formatToParts(date);
    const part = (type) => parts.find((item) => item.type === type)?.value ?? '';
    return `${part('month')}/${part('day')} ${part('hour')}:${part('minute')}`;
}
export function canSubmit(poll) {
    return poll.state === 'OPEN' && !poll.hasSubmitted;
}
/** 서버의 질문/선택지 ID를 기준으로 검증하고 선택 질문의 빈 답은 생략한다. */
export function serializeAnswers(questions, draft) {
    const errors = {};
    const answers = [];
    for (const question of questions) {
        const value = draft[question.id];
        const isText = question.type === 'SHORT_TEXT' || question.type === 'LONG_TEXT';
        if (isText) {
            const text = value?.text.trim() ?? '';
            const limit = question.type === 'SHORT_TEXT' ? 500 : 5000;
            if (text.length > limit)
                errors[question.id] = `${limit}자 이내로 입력해 주세요.`;
            else if (!text && question.required)
                errors[question.id] = '필수 질문입니다.';
            else if (text)
                answers.push({ questionId: question.id, optionIds: [], text });
            continue;
        }
        const allowed = new Set(question.options.map((option) => option.id));
        const selected = value?.optionIds ?? [];
        const unique = [...new Set(selected)];
        if (unique.some((id) => !allowed.has(id)) ||
            (question.type === 'SINGLE_CHOICE' && unique.length > 1)) {
            errors[question.id] = '선택지를 다시 확인해 주세요.';
        }
        else if (!unique.length && question.required) {
            errors[question.id] = '필수 질문입니다.';
        }
        else if (unique.length) {
            answers.push({ questionId: question.id, optionIds: unique, text: null });
        }
    }
    return { answers, errors, valid: Object.keys(errors).length === 0 };
}
/** 선택 횟수가 같은 최대값은 모두 강조한다. */
export function isTopResult(option, options) {
    const maximum = Math.max(0, ...options.map((item) => item.count));
    return option.count === maximum;
}
/** 불확실한 POST는 요청 전 제출 ID와 다른 서버 내역이 있을 때만 성공으로 확정한다. */
export function findNewSubmission(before, after, expected) {
    const known = new Set(before.map((submission) => submission.id));
    return (after.find((submission) => !known.has(submission.id) && (!expected || sameAnswers(submission.answers ?? [], expected))) ?? null);
}
function sameAnswers(actual, expected) {
    if (actual.length !== expected.length)
        return false;
    const normalize = (answers) => answers
        .map((answer) => ({
        questionId: answer.questionId,
        optionIds: [...answer.optionIds].sort((a, b) => a - b),
        text: answer.text,
    }))
        .sort((a, b) => a.questionId - b.questionId);
    return JSON.stringify(normalize(actual)) === JSON.stringify(normalize(expected));
}
