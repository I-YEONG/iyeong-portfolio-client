import { projectViewCss } from "./ProjectView.styles";

const ProjectView = ({ children, isPc }) => {
  return (
    <section css={projectViewCss(isPc)} className="project-view-box">
      <section className="project-view" data-lenis-prevent css={{ "& > div": { width: "100%", height: "100%" } }}>
        {children}
      </section>
    </section>
  );
};
export default ProjectView;
