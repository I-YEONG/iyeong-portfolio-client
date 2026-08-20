import { useParams, Routes, Route } from "react-router-dom"; // Routes, Route 임포트 추가
import { useAuth } from "@/hooks/useAuth";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { ProjectHeader, ProjectSideBox, ProjectView } from "@/features/portfolio/project/components";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { mq } from "@/styles/mq";

// 커리어하이 페이지들
import {
  CareerHiMainPage,
  CareerHiListPage,
  CareerHiError404Page,
  CareerHiCreatePage,
  CareerHiResultPage,
  UnivNoticeMainPage,
  UnivNoticePhoneSelectPage,
  UnivNoticeError404Page,
  UnivNoticeHomeAppPage,
  UnivNoticeInfoPage,
  UnivNoticeCategoryPage,
  UnivNoticeSettingPage,
  UnivNoticePhonePage,
  UnivNoticeGooglePage,
  UnivNoticeIssuancePage,
  UnivNoticeEndPage,
  UnivNoticeHelloPage,
  UnivNoticeDeviceAppendPage,
  UnivNoticeNoticePage,
  UnivNoticeUserDeletePage,
  UnivNoticeMyInfoPage,
  UnivNoticeMyDevicePage,
  UnivNoticeMySettingPage,
  DomoHomePage,
  DomoNotFoundPage,
  DomoBenefix,
  DomoRecs,
  DomoRecsInfo,
  DomoRecsResult,
  DomoRecsSave,
  FoodMainPage,
  FoodError404Page,
  FoodRegisterPage,
  FoodReportPage,
  FoodFaqPage,
  FoodMapPage,
  FoodMyPage,
  BarumHomePage,
  BarumMakeupListPage,
  BarumMakeupSelectPage,
  BarumMakeupSearchPage,
  BarumMakeupCameraPage,
  BarumMakeupCameraResultPage,
  BarumMakeupCameraErrorPage,
  BarumRoutineSelfiePage,
  BarumRoutineLoadingPage,
  BarumRoutineErrorPage,
  BarumRoutineResultPage,
  BarumRecordListPage,
  BarumRecordResultPage,
  BarumNotFoundPage,
} from "@/pages";
import { useEffect, useState } from "react";
import { FixMobile } from "@/components";
import UnivNoticeTermsPage from "../univNotice/UnivNoticeTermsPage";
import UnivNoticeKakaoPage from "../univNotice/UnivNoticeKakaoPage";

const PortfolioProject = () => {
  // 이제 restPath는 내부 Routes가 알아서 처리하므로 projectName만 가져옵니다.
  const { projectName } = useParams();

  const { isPc, toggleDeviceMode, setPcMode, setMobileMode } = useDeviceMode();
  const { isLogin, toggleAuth } = useAuth();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1180px)");

    const handleScreenChange = (e) => {
      if (e.matches) {
        setMobileMode();
      } else {
        setPcMode();
      }
    };

    handleScreenChange(mediaQuery);

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, [setMobileMode, setPcMode]);

  const [menuToggle, setMenuToggle] = useState(false);

  const isOffMenu = () => {
    setMenuToggle(false);
  };

  const isOnMenu = () => {
    setMenuToggle(true);
  };

  const style = css({
    ...theme.flex.between,
    width: "100%",
    height: "calc(100vh - 62px)",
    overflow: "hidden",

    [mq("mobile")]: {
      height: "100%",
      width: "100vw",
      overflow: "hidden",
      "& .menu-box": {
        position: "absolute",
        right: "0px",
        bottom: "0px",
        display: !menuToggle ? "none" : "block",
      },

      "& .project-view-box": {
        width: "100vw",
        overflow: "hidden",
        position: "relative",
      },
    },
  });

  return (
    <div>
      <ProjectHeader
        isPcMode={isPc}
        onChangeDevice={toggleDeviceMode}
        isLogin={isLogin}
        onChangeLogin={toggleAuth}
        menuToggle={menuToggle}
        isOffMenu={isOffMenu}
        isOnMenu={isOnMenu}
      />
      <div css={style}>
        {/* <div css={{ ...theme.flex.between, width: "100%", height: "calc(100vh - 62px)", overflow: "hidden" }}> */}
        {/* 왼쪽 박스 */}
        <ProjectSideBox />

        {/* 시뮬레이션 박스 (레이아웃 역할) */}
        <ProjectView isPc={isPc}>
          {/* 커리어하이 프로젝트 라우터 */}
          {projectName === "careerhi" && (
            <div className="careerhi">
              <Routes>
                {/* 기본 주소: /careerhi/ */}
                <Route path="/" element={<CareerHiMainPage />} />
                <Route path="/roadmap/list" element={<CareerHiListPage />} />
                <Route path="/roadmap/create" element={<CareerHiCreatePage />} />
                <Route path="/roadmap/result" element={<CareerHiResultPage />} />
                <Route path="*" element={<CareerHiError404Page />} />
              </Routes>
            </div>
          )}

          {/* univnotice 프로젝트 라우터 */}
          {projectName === "univnotice" && (
            <div className="univnotice">
              <Routes>
                <Route path="/" element={<UnivNoticeMainPage />} />

                <Route path="/signup/0" element={<UnivNoticeHelloPage />} />
                <Route path="/signup/1" element={<UnivNoticePhoneSelectPage />} />
                <Route path="/signup/2" element={<UnivNoticeInfoPage />} />
                <Route path="/signup/3" element={<UnivNoticeCategoryPage />} />
                <Route path="/signup/4/:setting_id" element={<UnivNoticeSettingPage />} />
                <Route path="/signup/5" element={<UnivNoticePhonePage />} />
                <Route path="/signup/6" element={<UnivNoticeGooglePage />} />
                <Route path="/signup/7" element={<UnivNoticeIssuancePage />} />
                <Route path="/signup/8" element={<UnivNoticeEndPage />} />
                <Route path="/login/append" element={<UnivNoticeDeviceAppendPage />} />

                <Route path="/mypage/info" element={<UnivNoticeMyInfoPage />} />
                <Route path="/mypage/device" element={<UnivNoticeMyDevicePage />} />
                <Route path="/mypage/setting" element={<UnivNoticeMySettingPage />} />

                <Route path="/notice" element={<UnivNoticeNoticePage />} />
                <Route path="/withdraw" element={<UnivNoticeUserDeletePage />} />
                <Route path="/terms" element={<UnivNoticeTermsPage />} />
                <Route path="/kakao" element={<UnivNoticeKakaoPage />} />

                <Route path="/ios" element={<UnivNoticeHomeAppPage />} />
                <Route path="*" element={<UnivNoticeError404Page />} />
              </Routes>
            </div>
          )}

          {/* 살펴 프로젝트 라우터 */}
          {projectName === "domo" && (
            <div className="domo">
              <Routes>
                <Route path="/" element={<DomoHomePage />} />
                <Route path="/benefix" element={<DomoBenefix />} />
                <Route path="/recs" element={<DomoRecs />} />
                <Route path="/recs/info" element={<DomoRecsInfo />} />
                <Route path="/recs/result" element={<DomoRecsResult />} />
                <Route path="/recs/save" element={<DomoRecsSave />} />

                <Route path="*" element={<DomoNotFoundPage />} />
              </Routes>
            </div>
          )}

          {projectName === "foodmap" && (
            <div className="food">
              <Routes>
                <Route path="/" element={<FoodMainPage />} />
                <Route path="/register" element={<FoodRegisterPage />} />
                <Route path="/report" element={<FoodReportPage />} />
                <Route path="/faq" element={<FoodFaqPage />} />
                <Route path="/map" element={<FoodMapPage />} />
                <Route path="/my-page" element={<FoodMyPage />} />

                <Route path="*" element={<FoodError404Page />} />
              </Routes>
            </div>
          )}

          {projectName === "barum" && (
            <div className="barum">
              <Routes>
                <Route path="/" element={<BarumHomePage />} />

                <Route path="routine/create/selfie" element={<BarumRoutineSelfiePage />} />
                <Route path="routine/create/loading" element={<BarumRoutineLoadingPage />} />
                <Route path="routine/create/error" element={<BarumRoutineErrorPage />} />
                <Route path="routine/result" element={<BarumRoutineResultPage />} />

                <Route path="makeup" element={<BarumMakeupListPage />} />
                <Route path="makeup/create/select" element={<BarumMakeupSelectPage />} />
                <Route path="makeup/create/search" element={<BarumMakeupSearchPage />} />
                <Route path="makeup/create/camera" element={<BarumMakeupCameraPage />} />
                <Route path="makeup/create/camera/result" element={<BarumMakeupCameraResultPage />} />
                <Route path="makeup/create/error" element={<BarumMakeupCameraErrorPage />} />

                <Route path="record" element={<BarumRecordListPage />} />
                <Route path="record/result" element={<BarumRecordResultPage />} />
                <Route path="setting" element={<BarumHomePage />} />
                <Route path="*" element={<BarumNotFoundPage />} />
              </Routes>
            </div>
          )}
        </ProjectView>
      </div>
    </div>
  );
};
export default PortfolioProject;
