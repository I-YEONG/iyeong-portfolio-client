import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UnivNoticeLogoCP from "@/features/univNotice/components/_common/UnivNoticeLogoCP";
import "./style.css";
import { useEffect } from "react";
import { useDeviceMode } from "@/hooks/useDeviceMode";

const UnivNoticeMyPageHeader = () => {
  // const [isLogin, setIsLogin] = useState(null);
  const { isPc, isMobile } = useDeviceMode();
  const nav = useNavigate();
  const location = useLocation();

  // 현재 경로가 /project/univnotice/mypage/info인지 확인
  const myPageType = location.pathname;

  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        // const result = await loginCheck();
        // setIsLogin(result);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLoginCheck();
  }, []);
  return (
    <header className="MyPageHeader univnoticeFlexBetween">
      <UnivNoticeLogoCP />
      <div className="MyPageHeader-content univnoticeFlexBetween">
        {!isPc && myPageType !== "/project/univnotice/mypage/info" && <p onClick={() => nav("/project/univnotice/mypage/info")}>내 정보</p>}
        {!isMobile && !isPc && myPageType !== "/project/univnotice/mypage/device" && <p onClick={() => nav("/project/univnotice/mypage/device")}>기기 관리</p>}
        {!isPc && myPageType !== "/project/univnotice/mypage/setting" && <p onClick={() => nav("/project/univnotice/mypage/setting")}>공지 설정</p>}

        {isPc && <p onClick={() => nav("/project/univnotice/mypage/info")}>내 정보</p>}
        {!isMobile && isPc && <p onClick={() => nav("/project/univnotice/mypage/device")}>기기 관리</p>}
        {isPc && <p onClick={() => nav("/project/univnotice/mypage/setting")}>공지 설정</p>}
      </div>
    </header>
  );
};
export default UnivNoticeMyPageHeader;
