import { useParams, Routes, Route } from "react-router-dom"; // Routes, Route 임포트 추가
import { useAuth } from "@/hooks/useAuth";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { ProjectHeader, ProjectSideBox, ProjectView } from "@/features/portfolio/project/components";
import { theme } from "@/styles/theme";

// 커리어하이 페이지들
import { CareerHiMainPage, CareerHiListPage, CareerHiError404Page, CareerHiCreatePage, CareerHiResultPage } from "@/pages/careerhi";

const PortfolioProject = () => {
  // 이제 restPath는 내부 Routes가 알아서 처리하므로 projectName만 가져옵니다.
  const { projectName } = useParams();

  const { isPc, toggleDeviceMode } = useDeviceMode();
  const { isLogin, toggleAuth } = useAuth();

  return (
    <div>
      <ProjectHeader isPcMode={isPc} onChangeDevice={toggleDeviceMode} isLogin={isLogin} onChangeLogin={toggleAuth} />
      <div css={{ ...theme.flex.between, width: "100%", height: "calc(100vh - 62px)", overflow: "hidden" }}>
        {/* 왼쪽 박스 */}
        <ProjectSideBox />

        {/* 시뮬레이션 박스 (레이아웃 역할) */}
        <ProjectView isPc={isPc}>
          {/* 커리어하이 프로젝트일 때의 라우터 */}
          {projectName === "careerhi" && (
            <Routes>
              {/* 기본 주소: /careerhi/ */}
              <Route path="/" element={<CareerHiMainPage />} />
              <Route path="/roadmap/list" element={<CareerHiListPage />} />
              <Route path="/roadmap/create" element={<CareerHiCreatePage />} />
              <Route path="/roadmap/result/:id" element={<CareerHiResultPage />} />
              <Route path="*" element={<CareerHiError404Page />} />
            </Routes>
          )}
        </ProjectView>
      </div>
    </div>
  );
};
export default PortfolioProject;
