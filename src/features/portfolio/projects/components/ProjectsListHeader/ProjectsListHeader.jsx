import { projectsListHeaderCss } from "./ProjectsListHeader.styles";
import { useAtom } from "jotai";
import { PROJECT_FILTER, PROJECT_SORT, projectsFilterAtom, projectsSortAtom } from "@/atoms/projectsListAtoms";

const FILTER_OPTIONS = [
  { label: "ALL", value: PROJECT_FILTER.ALL },
  { label: "FRONT", value: PROJECT_FILTER.FRONT },
  { label: "OPS", value: PROJECT_FILTER.OPS },
];

const SORT_OPTIONS = [
  { label: "최신순", value: PROJECT_SORT.LATEST },
  { label: "오래된 순", value: PROJECT_SORT.OLDEST },
];

const ProjectsListHeader = () => {
  const [filter, setFilter] = useAtom(projectsFilterAtom);
  const [sort, setSort] = useAtom(projectsSortAtom);

  const handleKeyDown = (value, setter) => (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setter(value);
    }
  };

  return (
    <section css={projectsListHeaderCss}>
      {/* 중간 박스 */}
      <div>
        {/* 1 */}
        <div className="cursor-reactive is-green">
          {FILTER_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={filter === option.value ? "is-active" : undefined}
              onClick={() => setFilter(option.value)}
              onKeyDown={handleKeyDown(option.value, setFilter)}
              role="button"
              tabIndex={0}
              aria-pressed={filter === option.value}>
              {option.label}
            </div>
          ))}
        </div>
        {/* 2 */}
        <div className="cursor-reactive is-green">
          {SORT_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={sort === option.value ? "is-active" : undefined}
              onClick={() => setSort(option.value)}
              onKeyDown={handleKeyDown(option.value, setSort)}
              role="button"
              tabIndex={0}
              aria-pressed={sort === option.value}>
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProjectsListHeader;
