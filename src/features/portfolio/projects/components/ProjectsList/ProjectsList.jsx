import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { Loading } from "@/components";

// 스타일
import { projectsListCss } from "./ProjectsList.styles";
import ProjectsListHeader from "../ProjectsListHeader/ProjectsListHeader";
import { useGetProjectListQuery } from "../../hooks/useGetProjects";
import ProjectsBanner from "../ProjectsBanner/ProjectsBanner";
import { PROJECT_FILTER, PROJECT_SORT, projectsFilterAtom, projectsSortAtom } from "@/atoms/projectsListAtoms";

const ProjectsList = () => {
  const { data: projectsList, isLoading: isProjectsListLoading } = useGetProjectListQuery();
  const filter = useAtomValue(projectsFilterAtom);
  const sort = useAtomValue(projectsSortAtom);

  const visibleProjects = useMemo(() => {
    const list = Array.isArray(projectsList) ? projectsList : [];
    const filtered = filter === PROJECT_FILTER.ALL ? list : list.filter((project) => project.tags?.includes(filter));

    const toTime = (value) => {
      const time = value ? new Date(value).getTime() : 0;
      return Number.isNaN(time) ? 0 : time;
    };

    return [...filtered].sort((left, right) => {
      const leftTime = toTime(left.startDate);
      const rightTime = toTime(right.startDate);
      return sort === PROJECT_SORT.LATEST ? rightTime - leftTime : leftTime - rightTime;
    });
  }, [projectsList, filter, sort]);

  return (
    <section css={projectsListCss}>
      {/* 리스트 */}
      <ProjectsListHeader />
      {/* 베너 */}
      <ProjectsBanner />
      {/* 갭 */}
      <div className="gap-box">
        <div></div>
      </div>
      {/* 프로젝트 반복 3개씩 */}
      {isProjectsListLoading && <Loading />}
      {!isProjectsListLoading && <section>로딩 완료 ({visibleProjects.length})</section>}
    </section>
  );
};
export default ProjectsList;
