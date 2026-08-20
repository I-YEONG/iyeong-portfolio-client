import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { menuButtonStyle } from "./BarumMenuButton.style";
import { useNavigate } from "react-router-dom";

const BarumMenuButton = () => {
  const nav = useNavigate();
  return (
    <div onClick={() => nav("/")} css={menuButtonStyle}>
      <FontAwesomeIcon icon={faHouse} />
    </div>
  );
};
export default BarumMenuButton;
