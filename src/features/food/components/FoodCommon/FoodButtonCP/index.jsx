import { useDeviceMode } from "@/hooks/useDeviceMode";
import { buttonCPStyle } from "./style";

/**
 *
 * @param children 태그 속 내용
 * @param {ReactNode} icon 버튼 좌측에 표시할 아이콘 컴포넌트 (props: icon={<FontAwesomeIcon icon={faStar} />} )
 * @param {boolean} [pcOnly=false] PC에서만 배경을 유지 할 예정인지 (기본값: F)
 * @param {string} color 글자, 테두리 색을 정한다. (기본값: --food-brown-light:)
 * @param {string} fontColor 글자 색을 정한다. (기본값: --food-gray-0)
 * @param {boolean} [disabled=false] 클릭 비활성화를 할 것인지 (기본값: F)
 * @returns BrownButtonCP 는 _common에 속하며, 해당 태그로 감싼 글자를 span으로 갈색 css 적용
 */
const FoodButtonCP = ({
  onClick,
  children,
  icon,
  pcOnly = false,
  color = "--food-brown-light",
  fontColor = "--food-gray-0",
  disabled = false,
  className = "",
}) => {
  const { isPc } = useDeviceMode();

  return (
    <div css={buttonCPStyle({ disabled, pcOnly, isPc, color, fontColor })} onClick={disabled ? undefined : onClick} className={className}>
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
    </div>
  );
};

export default FoodButtonCP;
