import { Loading } from "@/components";
import { projectDetailContentCss } from "./ProjectDetailContent.styles";

const ProjectDetailContent = ({ data }) => {
  return (
    <div>
      {!data && <Loading />}
      {data && (
        <section css={projectDetailContentCss} className="content-box">
          <div className="content-center"></div>
        </section>
      )}
    </div>
  );
};
export default ProjectDetailContent;
