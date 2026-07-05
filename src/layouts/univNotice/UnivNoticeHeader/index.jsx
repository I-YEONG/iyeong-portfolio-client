import UnivNoticeLogoCP from "@/features/univNotice/components/_common/UnivNoticeLogoCP";
import "./style.css";
import "@/styles/univNotice.global.css";
import { useNavigate } from "react-router-dom";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useAuth } from "@/hooks/useAuth";

const UnivNoticeHeader = () => {
  // const [isLogin, setIsLogin] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const isApp = useWeb().isApp;

  const { isPc } = useDeviceMode();
  const { isLogin, login } = useAuth();

  const nav = useNavigate();

  return (
    <header className="MainLayoutHeader univnoticeFlexBetween">
      <UnivNoticeLogoCP />
      {isLogin !== null && (
        <div className="MainLayoutHeader-content univnoticeFlexBetween">
          {isLogin && <p onClick={() => nav("/project/univnotice/notice")}>공지 보기</p>}
          {!isPc && !isLogin && <p onClick={() => nav("/project/univnotice/login/append")}>기기 등록</p>}
          {!isLogin && <p onClick={() => login()}>로그인</p>}
          {isLogin && <p onClick={() => nav("/project/univnotice/mypage/info")}>마이페이지</p>}
        </div>
      )}
    </header>
  );
};
export default UnivNoticeHeader;
