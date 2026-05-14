import { theme } from "@/styles/theme";
// 비디오
import { Button } from "@/components";

// 스타일
import { projectsListCss } from "./ProjectsList.styles";
import { useMedia } from "@/hooks/useMedia";
import ProjectsListHeader from "../ProjectsListHeader/ProjectsListHeader";
import { useGetProjectListQuery } from "../../hooks/useGetProjects";

const ProjectsList = () => {
  const { isPc } = useMedia();

  const { projectsList, isProjectLoading: isProjectsListLoading, isProjectError: isProjectsListError } = useGetProjectListQuery();

  return (
    <section css={projectsListCss}>
      {/* 리스트 */}
      <ProjectsListHeader />
    </section>
  );
};
export default ProjectsList;
