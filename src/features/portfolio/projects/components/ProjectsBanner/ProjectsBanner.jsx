import { useMedia } from "@/hooks/useMedia";
import { projectsBannerCss } from "./ProjectsBanner.styles";
import Tags from "@/components/Tags/Tags";
import useFormatDate from "@/hooks/useFormatDate";
import StackListColor from "@/components/StackList/StackListColor";
import GOTO from "@/assets/portfolio/icon/goto.svg?react";
import { Link } from "react-router-dom";
import { theme } from "@/styles/theme";

const ProjectsBanner = ({ project }) => {
  const { isTablet, isPc } = useMedia();
  console.log(project);
  // mainImg는 배열이므로, 첫 번째 이미지만 사용해야 함
  const mainImg = project?.images?.find((img) => img.isMain);

  // 날짜 포맷 훅 사용
  const formatDate = useFormatDate();

  return (
    <section className="content-box">
      <div className="content-center" css={projectsBannerCss}>
        {!isTablet && !isPc && (
          <div className="img-box cursor-reactive is-green">
            {/* 이미지 */}
            {mainImg && <img src={mainImg.imageUrl} alt={"메인 이미지 로딩 오류"} />}
          </div>
        )}

        <div className="content">
          {/* 콘텐츠 */}
          <div className="date-box">
            {/* Date */}
            {project.endDate !== "2099-12-30" && (
              <span className="date">
                {formatDate(project.startDate)} ~ {formatDate(project.endDate)}
              </span>
            )}
            {project.endDate === "2099-12-30" && (
              <span className="date" style={{ color: theme.colors.green }}>
                제작 중
              </span>
            )}
            {/* TAG */}
            <Tags tagList={project.tags} className="tags" />
          </div>
          <div className="title-box">
            <p className="title">{project.name}</p>
            <p className="sub-title">{project.subTitle}</p>
            <div className="description">{project.description}</div>
          </div>
          <StackListColor list={project.stacks} />
          <Link className="goto cursor-reactive is-orange" to={`/projects/${project.id}`}>
            프로젝트 상세보기
            <GOTO />
          </Link>
        </div>

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
