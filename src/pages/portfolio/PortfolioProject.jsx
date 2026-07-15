import { useParams, Routes, Route } from "react-router-dom"; // Routes, Route 임포트 추가
import { useAuth } from "@/hooks/useAuth";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { ProjectHeader, ProjectSideBox, ProjectView } from "@/features/portfolio/project/components";
import { theme } from "@/styles/theme";

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
} from "@/pages";
import { useEffect } from "react";
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

  return (
    <div>
      <ProjectHeader isPcMode={isPc} onChangeDevice={toggleDeviceMode} isLogin={isLogin} onChangeLogin={toggleAuth} />
      <div css={{ ...theme.flex.between, width: "100%", height: "calc(100vh - 62px)", overflow: "hidden" }}>
        {/* 왼쪽 박스 */}
        <ProjectSideBox />

        {/* 시뮬레이션 박스 (레이아웃 역할) */}
        <ProjectView isPc={isPc}>
          {/* 커리어하이 프로젝트 라우터 */}
          {projectName === "careerhi" && (
            <Routes>
              {/* 기본 주소: /careerhi/ */}
              <Route path="/" element={<CareerHiMainPage />} />
              <Route path="/roadmap/list" element={<CareerHiListPage />} />
              <Route path="/roadmap/create" element={<CareerHiCreatePage />} />
              <Route path="/roadmap/result" element={<CareerHiResultPage />} />
              <Route path="*" element={<CareerHiError404Page />} />
            </Routes>
          )}

          {/* 살펴 프로젝트 라우터 */}
          {projectName === "univnotice" && (
            <Routes className="univnotice">
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
          )}
          {/* 살펴 프로젝트 라우터 */}
          {projectName === "domo" && (
            <Routes>
              <Route path="/" element={<DomoHomePage />} />
              <Route path="/benefix" element={<DomoBenefix />} />
              <Route path="/recs" element={<DomoRecs />} />
              <Route path="/recs/info" element={<DomoRecsInfo />} />
              <Route path="/recs/result" element={<DomoRecsResult />} />

              <Route path="*" element={<DomoNotFoundPage />} />
            </Routes>
          )}
        </ProjectView>
      </div>
    </div>
  );
};
export default PortfolioProject;
