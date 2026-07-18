import { foodInputCPMainStyle } from "./style";

/**
 * InputCP - 텍스트 입력 폼 컴포넌트
 * <InputCP title="타이틀" essential="true" ex="예시문입니다" onChangeHandler={onChangeFTName} />
 *
 * @param {string} title - input의 placeholder 텍스트
 * @param {boolean} essential - 필수 입력 여부
 * @param {string} ex - 예시 텍스트
 * @param {boolean} pw - 비밀번호 입력 여부
 * @param {function} onChangeHandler - 입력 값 변경 핸들러
 * @param {string} value - input의 현재 값
 * @param {boolean} lock - 입력 잠금 여부
 * @returns {JSX.Element} 텍스트 입력 폼
 *
 */
const FoodInputCP = ({ title, essential = false, ex, pw = false, onChangeHandler, value, className, lock = false }) => {
  return (
    <div css={foodInputCPMainStyle()}>
      <label htmlFor="FoodInputCP">
        {title && title}
        {essential && <span className="essential">*</span>}
      </label>
      <input
        type={pw ? "password" : "text"}
        id="FoodInputCP"
        name="FoodInputCP"
        onChange={onChangeHandler}
        placeholder={ex || ""}
        value={value}
        className={className}
        disabled={lock}
      />
    </div>
  );
};

export default FoodInputCP;
