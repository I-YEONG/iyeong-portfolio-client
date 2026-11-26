export function nextForVerificationResult(result) {
    if (result === 'success')
        return 'done';
    if (result === 'department_update_required')
        return 'department';
    if (result === 'pending_approval')
        return 'pendingApproval';
    if (result === 'already_linked')
        return 'unavailable';
    // invalid_state · access_denied · failed · 알 수 없는 값은 다시 시도하면 된다.
    return 'retry';
}
