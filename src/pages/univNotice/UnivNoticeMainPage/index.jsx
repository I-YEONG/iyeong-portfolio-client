import { useNavigate } from "react-router-dom";
import UnivNoticeMainLayout from "@/layouts/univNotice/index.jsx";
import "./style.css";
// import CircularProgress from "@mui/material/CircularProgress";

import { useAuth } from "@/hooks/useAuth";
import { useDeviceMode } from "@/hooks/useDeviceMode";

import is_pc_bg from "@/assets/univNotice/pc_main_bg.png";
import is_mobile_bg from "@/assets/univNotice/mobile_main_bg.png";

const UnivNoticeMainPage = () => {
  const nav = useNavigate();
  const { isLogin } = useAuth();
  const { isPc } = useDeviceMode();

  return (
    <UnivNoticeMainLayout>
      <section className="mainPage" css={{ backgroundImage: isPc ? `url(${is_pc_bg})` : `url(${is_mobile_bg})` }}>
        <div style={!isPc ? { width: "85%", top: "35%" } : undefined}>{/* 이미지 */}</div>
        {!isLogin && <p onClick={() => nav("/project/univnotice/signup/0")}>회원가입</p>}
        {isLogin && <p onClick={() => nav("/project/univnotice/notice")}>공지 보기</p>}
      </section>
    </UnivNoticeMainLayout>
  );
};
export default UnivNoticeMainPage;
