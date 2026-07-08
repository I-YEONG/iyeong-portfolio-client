import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "@/styles/careerhi.global.css";

const HeaderCP = ({ children }) => {
  const nav = useNavigate();

  return (
    <header className="w-full top-0 left-0 fixed text-[22px] border-b border-gray-200 caret-transparent bg-white z-999">
      <FontAwesomeIcon icon={faAngleLeft} className="absolute text-gray-400 -translate-y-1/2 cursor-pointer left-4 top-1/2" onClick={() => nav(-1)} />
      <p className="font-semibold text-center py-4.5 text-point-text">{children}</p>
    </header>
  );
};
export default HeaderCP;
