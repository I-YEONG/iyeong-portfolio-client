import { theme } from "@/styles/theme";
// 비디오
import { Button } from "@/components";

// 스타일
import { projectsListCss } from "./ProjectsList.styles";
import { useMedia } from "@/hooks/useMedia";
import ProjectsListHeader from "../ProjectsListHeader/ProjectsListHeader";

const ProjectsList = () => {
  const { isPc } = useMedia();

  return (
    <section css={projectsListCss}>
      {/* 리스트 */}
      <ProjectsListHeader />
    </section>
  );
};
export default ProjectsList;
