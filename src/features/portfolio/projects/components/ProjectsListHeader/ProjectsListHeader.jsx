import { projectsListHeaderCss } from "./ProjectsListHeader.styles";
import { useAtom } from "jotai";
import { PROJECT_SORT, projectsSortAtom } from "@/atoms/projectsListAtoms";

const SORT_OPTIONS = [
  { label: "최신순", value: PROJECT_SORT.LATEST },
  { label: "오래된 순", value: PROJECT_SORT.OLDEST },
];

const ProjectsListHeader = () => {
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
