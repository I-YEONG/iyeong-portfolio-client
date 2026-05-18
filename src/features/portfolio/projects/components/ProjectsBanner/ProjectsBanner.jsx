import { projectsBannerCss } from "./ProjectsBanner.styles";

const ProjectsBanner = ({ project }) => {
  if (!project) {
    return null;
  }

  return (
    <section css={projectsBannerCss} className="content-box">
      <div className="content-center">
        <div className="banner-text">
          <p className="title">{project.name}</p>
          {project.subTitle && <p className="subtitle">{project.subTitle}</p>}
        </div>
      </div>
    </section>
  );
};
export default ProjectsBanner;
