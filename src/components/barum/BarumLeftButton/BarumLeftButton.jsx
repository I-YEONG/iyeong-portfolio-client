import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { menuButtonStyle } from "./BarumLeftButton.style";

const BarumLeftButton = () => {
  return (
    <div css={menuButtonStyle}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </div>
  );
};
export default BarumLeftButton;
