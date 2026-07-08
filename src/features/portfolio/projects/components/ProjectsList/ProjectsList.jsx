import { useMemo } from "react";
import { useAtomValue } from "jotai";

// 스타일
import { projectsListCss } from "./ProjectsList.styles";
import ProjectsListHeader from "../ProjectsListHeader/ProjectsListHeader";
import { useGetProjectListQuery } from "../../hooks/useGetProjects";
import ProjectsBanner from "../ProjectsBanner/ProjectsBanner";
import { PROJECT_SORT, projectsSortAtom } from "@/atoms/projectsListAtoms";
import ProjectsBox from "../ProjectsBox/ProjectsBox";

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
      {isProjectsListLoading && (
        <section className="content-box">
          <div className="content-center">
            <div className="projects-banner-skeleton">
              <div className="banner-content">
                <div className="skeleton-line line-short" />
                <div className="skeleton-line line-wide" />
                <div className="skeleton-line line-mid" />
                <div className="skeleton-line line-wide" />
                <div className="skeleton-line line-short" />
              </div>
              <div className="banner-image skeleton-block" />
            </div>
          </div>
        </section>
      )}
      {!isProjectsListLoading && bannerProject && <ProjectsBanner project={bannerProject} />}
      {!isProjectsListLoading && restProjects.length > 0 && (
        <div className="gap-box">
          <div></div>
        </div>
      )}
      {/* 프로젝트 반복 3개씩 */}
      {isProjectsListLoading && (
        <section className="content-box">
          <div className="content-center project-row">
            {[0, 1, 2].map((index) => (
              <div key={`skeleton-${index}`} className="projects-box-skeleton">
                <div className="box-image skeleton-block" />
                <div className="box-content">
                  <div className="skeleton-line line-short" />
                  <div className="skeleton-line line-wide" />
                  <div className="skeleton-line line-mid" />
                  <div className="skeleton-line line-short" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {!isProjectsListLoading &&
        projectRows.map((row, index) => (
          <div key={`row-${index}`}>
            <section className="content-box">
              <div className="content-center project-row">
                {row.map((project) => (
                  <ProjectsBox key={project.id} data={project} />
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
