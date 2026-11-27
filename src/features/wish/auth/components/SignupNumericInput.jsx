import { useRef, useState } from 'react';
import { formatSignupInputEdit } from '../signupInputFormatting';
/** 숫자 서식과 커서를 함께 갱신하며 조합 입력은 완료 후 정리한다. */
export function SignupNumericInput({ value, type = 'text', format, onValueChange, onCompositionStart, onCompositionEnd, ...inputProps }) {
    const composing = useRef(false);
    const [compositionValue, setCompositionValue] = useState(null);
    const formattedValue = format(value);
    const update = (input, inputType) => {
        const edit = formatSignupInputEdit(input.value, input.selectionStart, inputType, format);
        input.value = edit.value;
        input.setSelectionRange(edit.caret, edit.caret);
        // 숫자가 바뀌지 않은 입력은 이미 완료된 전화번호 중복 확인을 유지한다.
        if (edit.value !== formattedValue)
            onValueChange(edit.value);
    };
    return (<input {...inputProps} type={type} inputMode="numeric" value={compositionValue ?? formattedValue} onChange={(event) => {
            if (composing.current) {
                setCompositionValue(event.currentTarget.value);
                return;
            }
            update(event.currentTarget, event.nativeEvent.inputType ?? '');
        }} onCompositionStart={(event) => {
            composing.current = true;
            setCompositionValue(event.currentTarget.value);
            onCompositionStart?.(event);
        }} onCompositionEnd={(event) => {
            composing.current = false;
            setCompositionValue(null);
            update(event.currentTarget, 'insertCompositionText');
            onCompositionEnd?.(event);
        }}/>);
}
