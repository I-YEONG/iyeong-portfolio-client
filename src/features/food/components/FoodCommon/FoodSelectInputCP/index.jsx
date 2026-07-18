import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { foodSelectInputCPMainStyle } from "./style";

/**
 * SelectInputCP - 셀렉트 박스 입력 컴포넌트
 * @param {string} title - select의 라벨 텍스트
 * @param {boolean} essential - 필수 입력 여부
 * @param {Array<{value: string, data: string}>} listData - 옵션 데이터 배열
 * @param {function} onChangeHandler - 선택값 변경 핸들러
 * @returns {JSX.Element} 셀렉트 입력 폼
 */
const FoodSelectInputCP = ({ title = "이름을 입력하세요", essential = false, listData, onChangeHandler }) => {
  return (
    <form css={foodSelectInputCPMainStyle()}>
      <label htmlFor="InputCP">
        {title}
        {essential && <span className="essential">*</span>}
      </label>
      <div className="select-wrapper">
        <select onChange={onChangeHandler} defaultValue="">
          <option value="" disabled>
            선택하세요
          </option>
          {Array.isArray(listData) &&
            listData.map((item, idx) => (
              <option key={idx} value={item.value}>
                {item.data}
              </option>
            ))}
        </select>
        <span className="select-icon">
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
    </form>
  );
};

export default FoodSelectInputCP;
