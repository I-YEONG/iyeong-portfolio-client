import { useNavigate } from "react-router-dom";
import "./style.css";
import "@/styles/univNotice.global.css";
import { useDeviceMode } from "@/hooks/useDeviceMode";

const UnivNoticeFooter = () => {
  const nav = useNavigate();
  const gotoGit = () => {
    window.open("https://github.com/iyeonggyu0/univNotice-Client", "_blank");
  };

  const { isPc } = useDeviceMode();

  return (
    <footer className="footer univnoticeFlexBetween">
      {isPc && <p>@2025 UnivNotice. All rights reserved.</p>}
      <p>
        <span onClick={() => nav("/terms")}>이용약관</span>
        <span onClick={() => nav("/kakao")}>문의하기</span>
        <span onClick={gotoGit}>
          {isPc && "Git. iyeonggyu0"}
          {!isPc && "Git"}
        </span>
      </p>
      {!isPc && <p className="mobile-copy">@UnivNotice. All rights reserved.</p>}
    </footer>
  );
};
export default UnivNoticeFooter;
