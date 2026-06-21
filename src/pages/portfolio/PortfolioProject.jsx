import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { ProjectHeader, ProjectSideBox } from "@/features/portfolio/project/components";
import { theme } from "@/styles/theme";

const PortfolioProject = () => {
  const { projectName: projectName, "*": restPath } = useParams();

  const { isPc, toggleDeviceMode } = useDeviceMode();
  const { isLoggedIn, toggleAuth } = useAuth();

  return (
    <div>
      <ProjectHeader isPcMode={isPc} onChangeDevice={toggleDeviceMode} isLogin={isLoggedIn} onChangeLogin={toggleAuth} />
      <div css={{ ...theme.flex.between, width: "100%", height: "calc(100vh - 62px)", overflow: "hidden" }}>
        <ProjectSideBox />
        <div></div>
      </div>
    </div>
  );
};
export default PortfolioProject;
