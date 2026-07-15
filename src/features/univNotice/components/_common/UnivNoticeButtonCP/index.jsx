import "./style.css";
import "@/styles/univNotice.global.css";
/**
 * 공통 버튼 컴포넌트
 * @param {React.ReactNode} children 버튼 내부에 들어갈 내용
 * @param {string} color 텍스트 색상 (기본값: --black-0)
 * @param {string} bgColor 배경 색상 (기본값: --univ-main-color)
 * @param {string} activateBgColor 활성화 배경 색상 (기본값: --univ-main-color-2)
 * @param {boolean} activate 활성화 여부 (true면 활성화, false면 비활성화)
 * @returns JSX.Element
 */
const UnivNoticeButtonCP = ({ children, color = "--black-0", bgColor = "--univ-main-color", activateBgColor = "--univ-main-color-2", activate = true }) => {
  return (
    <div
      className="buttonCp univnoticeFlexCenter"
      style={{
        width: "100%",
        color: `var(${color})`,
        backgroundColor: activate ? `var(${bgColor})` : `var(${activateBgColor})`,
        cursor: activate ? "pointer" : "not-allowed",
        minHeight: "3rem",
      }}>
      {children}
    </div>
  );
};
export default UnivNoticeButtonCP;
