import { useDeviceMode } from "@/hooks/useDeviceMode";
import { foodOutLineButtonCPStyle } from "./style";

/**
 *
 * @param children 태그 속 내용
 * @param {ReactNode} icon 버튼 좌측에 표시할 아이콘 컴포넌트 (props: icon={<FontAwesomeIcon icon={faStar} />})
 * @param {boolean} [pcOnly=false] PC에서만 배경을 유지 할 예정인지 (기본값: F)
 * @param {string} color 글자와 테두리 색을 정한다. (기본값: #FFF)
 * @param {string} borderColor 테두리 색을 정한다. (기본값: "color"와 동일)
 * @param {string} width 버튼의 너비를 정한다. (기본값: 자동)
 * @param {function} onClick 클릭 이벤트 핸들러
 * @returns FoodOutLineButtonCP 는 _common에 속하며, 해당 태그로 감싼 글자를 span으로 color의 테두리와 글자색을 만드는 css 적용
 */
const FoodOutLineButtonCP = ({ icon, children, pcOnly = false, color = "#FFF", borderColor, width, onClick }) => {
  const { isPc } = useDeviceMode();

  return (
    <span css={foodOutLineButtonCPStyle({ pcOnly, isPc, color, borderColor, width })} onClick={onClick}>
      {icon && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            marginRight: "0.5em",
          }}>
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};

export default FoodOutLineButtonCP;
