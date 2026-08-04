import TextareaAutosize from "react-textarea-autosize";
import { foodTextAreaInputCPMainStyle } from "./style";

/**
 * TextAreaInputCP
 * @param {string} title - 라벨 텍스트
 * @param {boolean} essential - 필수 입력 여부
 * @param {string} ex - placeholder 예시
 * @param {function} onChangeHandler - 입력값 변경 핸들러
 * @param {string} value - 입력값
 * @param {number} maxRows - 최대 행 수
 * @param {number} minRows - 최소 행 수
 * @param {boolean} lock - 입력 잠금 여부
 */
const FoodTextAreaInputCP = ({ title = "이름을 입력하세요", essential = false, ex, onChangeHandler, value, maxRows, minRows, lock = false }) => {
  return (
    <form css={foodTextAreaInputCPMainStyle()}>
      <label htmlFor="FoodTextAreaInputCP">
        {title}
        {essential && <span className="essential">*</span>}
      </label>
      <TextareaAutosize
        id="FoodTextAreaInputCP"
        minRows={minRows}
        maxRows={maxRows}
        value={value}
        placeholder={ex}
        onChange={onChangeHandler}
        disabled={lock}
      />
    </form>
  );
};

export default FoodTextAreaInputCP;
