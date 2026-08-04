import { useEffect } from "react";
import AlertCP from "@/features/careerhi/components/_common/alertCP";
import useAlertCP from "@/features/careerhi/hooks/useAlertCP";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/careerhi";
import MainContentLayout from "@/layouts/careerhi/MainLayout";
import logo_3d from "@/assets/careerhi/image/3d_logo.png";

import "./style.css";
import { useAuth } from "@/hooks/useAuth";
import { useDeviceMode } from "@/hooks/useDeviceMode";

const CareerHiMainPage = () => {
  const [isAlertOpen, alertTitleText, alertButtonText, setAlertTitleText, setAlertButtonText, closeAlert, openAlert] = useAlertCP();
  const { isLogin, login } = useAuth();
  const nav = useNavigate();
  const { isPc } = useDeviceMode();

  useEffect(() => {
    if (!isLogin) {
      // 1. 로그인 상태가 거짓(false)으로 변하면 알림창을 띄웁니다.
      setAlertTitleText("로그인이 필요합니다.");
      setAlertButtonText("로그인/회원가입");
      openAlert();
    } else {
      // 2. 로그인 상태가 참(true)으로 변하면 알림창을 닫아줍니다. (필요시 사용)
      closeAlert();
    }
  }, [isLogin, setAlertTitleText, setAlertButtonText, openAlert, closeAlert]);

  return (
    <div className="careerhi-main-page">
      {/* AlertCP */}
      {isAlertOpen && (
        <AlertCP
          titleText={alertTitleText}
          buttonText={alertButtonText}
          okButton={() => {
            closeAlert();
            login();
          }}
        />
      )}
      <div
        style={{
          position: isAlertOpen ? "absolute" : "static",
          top: isAlertOpen ? "0" : "unset",
          left: isAlertOpen ? "0" : "unset",
          width: "100%",
          height: "100%",
          zIndex: isAlertOpen ? 50 : "auto",
          borderRadius: !isPc && isAlertOpen ? "12px" : "0",
          overflow: !isPc && isAlertOpen ? "hidden" : "visible",
        }}>
        <MainLayout mobile_block={true} page="main">
          <MainContentLayout page="main">
            <div className="relative flex flex-col items-center justify-center w-full h-full gap-4 select-none sm:pb-14 sm:gap-0">
              <img src={logo_3d} alt="이미지를 불러올 수 없습니다." className="h-2/10 sm:h-6/10 max-h-90 pb-1/5" />
              {/* 로그인 */}
              {isLogin && (
                <p className="sm:H2_bold font-semibold text-[1rem] text-center  leading-7 text-gray-400 sm:text-xl sm:text-black">
                  내 스펙을 입력하고
                  <br />단 <span className="dot-text">1</span>
                  <span className="dot-text">초</span> 만에 취업 준비 로드맵을 완성해요!
                </p>
              )}
              {isLogin && (
                <div
                  onClick={() => nav("/project/careerhi/roadmap/create")}
                  className="w-full sm:w-[unset] text-center px-14 py-5 rounded-[0.6rem] bg-point-text cursor-pointer text-white mt-[8%]">
                  나의 로드맵 알아보기
                </div>
              )}

              {/* 로그아웃 */}
              {!isLogin && (
                <p className="sm:font-kimm font-pretendard font-semibold text-[1rem] text-center leading-7 text-gray-400 sm:text-xl sm:text-black">
                  지금 Career-Hi 로그인하고
                  <br />
                  나에게 꼭 맞는 취업 준비 로드맵을 확인해요
                </p>
              )}
              {!isLogin && (
                <div
                  onClick={() => login()}
                  className="w-full sm:w-[unset] px-14 py-5 rounded-[0.6rem] text-center bg-point-text cursor-pointer text-white mt-[8%]">
                  로그인/회원가입
                </div>
              )}
            </div>
          </MainContentLayout>
        </MainLayout>
      </div>
    </div>
  );
};
export default CareerHiMainPage;
