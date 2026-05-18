import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Loading } from "@/components";

// 스타일
import { projectsListCss } from "./ProjectsList.styles";
import ProjectsListHeader from "../ProjectsListHeader/ProjectsListHeader";
import { useGetProjectListQuery } from "../../hooks/useGetProjects";
import ProjectsBanner from "../ProjectsBanner/ProjectsBanner";
import { PROJECT_SORT, projectsSortAtom } from "@/atoms/projectsListAtoms";

const ProjectsList = () => {
  const { data: projectsList, isLoading: isProjectsListLoading } = useGetProjectListQuery();
  const sort = useAtomValue(projectsSortAtom);

  const visibleProjects = useMemo(() => {
    const list = Array.isArray(projectsList) ? projectsList : [];

    const toTime = (value) => {
      const time = value ? new Date(value).getTime() : 0;
      return Number.isNaN(time) ? 0 : time;
    };

    return [...list].sort((left, right) => {
      const leftTime = toTime(left.startDate);
      const rightTime = toTime(right.startDate);
      return sort === PROJECT_SORT.LATEST ? rightTime - leftTime : leftTime - rightTime;
    });
  }, [projectsList, sort]);

  const bannerProject = visibleProjects[0];
  const restProjects = visibleProjects.slice(1);
  const projectRows = [];

  for (let i = 0; i < restProjects.length; i += 3) {
    projectRows.push(restProjects.slice(i, i + 3));
  }

  return (
    <section css={projectsListCss}>
      {/* 리스트 */}
      <ProjectsListHeader />
      {/* 베너 */}
      {!isProjectsListLoading && bannerProject && <ProjectsBanner project={bannerProject} />}
      {!isProjectsListLoading && restProjects.length > 0 && (
        <div className="gap-box">
          <div></div>
        </div>
      )}
      {/* 프로젝트 반복 3개씩 */}
      {isProjectsListLoading && (
        <div className="loading-box">
          <Loading />
        </div>
      )}
      {!isProjectsListLoading &&
        projectRows.map((row, index) => (
          <div key={`row-${index}`}>
            <section className="content-box">
              <div className="content-center project-row">
                {row.map((project) => (
                  <div key={project.id} className="project-card">
                    <p className="project-title">{project.name}</p>
                    {project.subTitle && <p className="project-subtitle">{project.subTitle}</p>}
                  </div>
                ))}
              </div>
            </section>
            {index < projectRows.length - 1 && (
              <div className="gap-box">
                <div></div>
              </div>
            )}
          </div>
        ))}
    </section>
  );
};
export default ProjectsList;
