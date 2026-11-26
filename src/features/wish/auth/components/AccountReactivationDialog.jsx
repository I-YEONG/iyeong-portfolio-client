import { AuthDialog } from './AuthDialog';
export function AccountReactivationDialog({ onCancel, onConfirm, returnFocusRef, }) {
    return (<AuthDialog title="계정을 복구할까요?" onClose={onCancel} onConfirm={onConfirm} confirmLabel="복구하고 로그인" returnFocusRef={returnFocusRef}>
      탈퇴한 계정입니다. 이 계정을 다시 사용하려면 복구에 동의해 주세요. 취소하면 계정은 복구되지
      않습니다.
    </AuthDialog>);
}
