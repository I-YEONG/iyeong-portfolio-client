import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/styles/careerhi.global.css";

/**
 * AlertCP 컴포넌트
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} [props.titleText="AlertTitle"] - 알림창 제목 텍스트
 * @param {string} [props.buttonText="AlertButton"] - 버튼 텍스트
 * @param {function} props.closeButton - 닫기(X) 버튼 클릭 핸들러
 * @param {function} props.okButton - 확인 버튼 클릭 핸들러
 * @returns {JSX.Element} 알림창 컴포넌트
 */
const AlertCP = ({ titleText = "AlertTitle", buttonText = "AlertButton", closeButton, onCloseButton = false, okButton }) => {
  return (
    <div css={{ width: "100cqw", height: "100cqh" }} className="fixed top-0 left-0 select-none z-2000 bg-[#171C20BF] flexCenter">
      <div className="relative flex flex-col justify-between p-10 bg-white rounded-lg w-80 h-45 min-h-50">
        {/* xMark */}
        {onCloseButton && (
          <div onClick={() => closeButton()} className="absolute text-gray-400 cursor-pointer top-6 right-6">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        )}

        {/* title */}
        <p className="w-full leading-6 text-center H3_bold">{titleText}</p>
        <div className="w-full py-4 text-center text-white rounded-lg cursor-pointer H4_bold bg-point-main" onClick={okButton}>
          {buttonText}
        </div>
      </div>
    </div>
  );
};
export default AlertCP;
