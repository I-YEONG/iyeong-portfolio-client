import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { ProjectHeader, ProjectSideBox, ProjectView } from "@/features/portfolio/project/components";
import { theme } from "@/styles/theme";
import CareerhiMainPage from "../careerhi/MainPage";

const PortfolioProject = () => {
  const { projectName: projectName, "*": restPath } = useParams();

  const { isPc, toggleDeviceMode } = useDeviceMode();
  const { isLoggedIn, toggleAuth } = useAuth();

  return (
    <div>
      <ProjectHeader isPcMode={isPc} onChangeDevice={toggleDeviceMode} isLogin={isLoggedIn} onChangeLogin={toggleAuth} />
      <div css={{ ...theme.flex.between, width: "100%", height: "calc(100vh - 62px)", overflow: "hidden" }}>
        {/* 왼쪽 박스 */}
        <ProjectSideBox />

        {/* 시뮬레이션 박스 */}
        <ProjectView isPc={isPc}>
          {`${projectName}/${restPath}` === "/careerhi" && <CareerhiMainPage />}
          {/* 메인 페이지
          <Route path="/" element={<MainPage />} />

          로그인 페이지
          <Route path="/login" element={<LoginPage />} />
          회원가입 페이지
          <Route path="/signup" element={<SignUpPage />} />
          비밀번호 찾기
          <Route path="/change-password" element={<ChangePasswordPage />} />

          마이 로드맵
          생성
          <Route path="/roadmap/create" element={<MyRoadmapCreatePage />} />
          목록
          <Route path="/roadmap/list" element={<MyRoadmapListPage />} />
          결과
          <Route path="/roadmap/result" element={<MyRoadmapResultPage />} /> */}
        </ProjectView>
      </div>
    </div>
  );
};
export default PortfolioProject;
