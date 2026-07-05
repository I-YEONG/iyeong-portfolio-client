import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UnivNoticeLogoCP from "@/features/univNotice/components/_common/UnivNoticeLogoCP";
import "./style.css";
import { useEffect } from "react";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import "@/styles/univNotice.global.css";
const UnivNoticeMyPageHeader = () => {
  // const [isLogin, setIsLogin] = useState(null);
  const { isPc, isMobile } = useDeviceMode();
  const nav = useNavigate();
  const location = useLocation();

  // 현재 경로가 /mypage/info인지 확인
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
        {!isPc && myPageType !== "/mypage/info" && <p onClick={() => nav("/mypage/info")}>내 정보</p>}
        {!isMobile && !isPc && myPageType !== "/mypage/device" && <p onClick={() => nav("/mypage/device")}>기기 관리</p>}
        {!isPc && myPageType !== "/mypage/setting" && <p onClick={() => nav("/mypage/setting")}>공지 설정</p>}

        {isPc && <p onClick={() => nav("/mypage/info")}>내 정보</p>}
        {!isMobile && isPc && <p onClick={() => nav("/mypage/device")}>기기 관리</p>}
        {isPc && <p onClick={() => nav("/mypage/setting")}>공지 설정</p>}
      </div>
    </header>
  );
};
export default UnivNoticeMyPageHeader;
