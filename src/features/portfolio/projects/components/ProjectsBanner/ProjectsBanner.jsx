import { useMedia } from "@/hooks/useMedia";
import { projectsBannerCss } from "./ProjectsBanner.styles";

const ProjectsBanner = ({ project }) => {
  const { isTablet, isPc } = useMedia();
  console.log(project);
  // mainImg는 배열이므로, 첫 번째 이미지만 사용해야 함
  const mainImg = project?.images?.find((img) => img.isMain);

  return (
    <section className="content-box">
      <div className="content-center" css={projectsBannerCss}>
        {!isTablet && !isPc && (
          <div className="img-box cursor-reactive is-green">
            {/* 이미지 */}
            {mainImg && <img src={mainImg.imageUrl} alt={"메인 이미지 로딩 오류"} />}
          </div>
        )}
        <div className="content">{/* 콘텐츠 */}</div>
        {(isTablet || isPc) && (
          <div className="img-box cursor-reactive is-green">
            {/* 이미지 */}
            {mainImg && <img src={mainImg.imageUrl} alt={"메인 이미지 로딩 오류"} />}
          </div>
        )}
      </div>
    </section>
  );
};
export default ProjectsBanner;
