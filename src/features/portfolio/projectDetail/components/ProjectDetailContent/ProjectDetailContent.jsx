import { Loading } from "@/components";
import { projectDetailContentCss } from "./ProjectDetailContent.styles";

const ProjectDetailContent = ({ data }) => {
  const detailImg = data?.images?.find((img) => img.isDetail)?.imageUrl;
  return (
    <div>
      {!data && <Loading />}
      {data && (
        <section css={projectDetailContentCss} className="content-box">
          <div className="content-center">
            <img src={detailImg} alt="프로젝트 상세 이미지" />
          </div>
        </section>
      )}
    </div>
  );
};
export default ProjectDetailContent;
