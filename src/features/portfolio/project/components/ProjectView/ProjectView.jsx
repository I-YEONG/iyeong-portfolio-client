import { projectViewCss } from "./ProjectView.styles";

const ProjectView = ({ children, isPc }) => {
  return (
    <section css={projectViewCss(isPc)}>
      <section className="project-view" data-lenis-prevent>
        {children}
      </section>
    </section>
  );
};
export default ProjectView;
