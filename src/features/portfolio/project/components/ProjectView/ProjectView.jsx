import { projectViewCss } from "./ProjectView.styles";

const ProjectView = ({ children, isPc }) => {
  return (
    <section css={projectViewCss(isPc)} className="project-view-box">
      <section className="project-view" data-lenis-prevent>
        {children}
      </section>
    </section>
  );
};
export default ProjectView;
