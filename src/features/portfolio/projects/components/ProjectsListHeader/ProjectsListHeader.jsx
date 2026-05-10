import { theme } from "@/styles/theme";
// 비디오
import { Button } from "@/components";

// 스타일
import { projectsListHeaderCss } from "./ProjectsListHeader.styles";
import { useMedia } from "@/hooks/useMedia";

const ProjectsListHeader = () => {
  const { isPc } = useMedia();

  return <section css={projectsListHeaderCss}></section>;
};
export default ProjectsListHeader;
