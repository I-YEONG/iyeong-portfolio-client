import { useEffect, useState } from "react";
import { theme } from "@/styles/theme";
import { projectsBoxCss } from "./ProjectsBox.styles";
import useFormatDate from "@/hooks/useFormatDate";
import Tags from "@/components/Tags/Tags";
import { Link } from "react-router-dom";
import GOTO from "@/assets/portfolio/icon/goto.svg?react";

// "2099-12-30"
const ProjectsBox = ({ data }) => {
  const mainImg = data?.images?.find((img) => img.isMain);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const formatDate = useFormatDate();

  useEffect(() => {
    setIsImageLoaded(false);
  }, [mainImg?.imageUrl]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Link css={projectsBoxCss} className="cursor-reactive is-green projectCard" to={`/projects/${data.id}`}>
      {/* 프로젝트 카드 */}
      <div className="img-box">
        {/* 이미지 */}
        {mainImg && (
          <>
            {!isImageLoaded && <div className="img-skeleton" aria-hidden="true" />}
            <img
              src={mainImg.imageUrl}
              alt={"메인 이미지 로딩 오류"}
              onLoad={handleImageLoad}
              onError={handleImageLoad}
              style={{ opacity: isImageLoaded ? 1 : 0 }}
            />
          </>
        )}
      </div>
      <div className="content-box">
        {/* 콘텐츠 */}
        <div className="date-box">
          {data.endDate !== "2099-12-30" ? (
            <span className="date">{formatDate(data.endDate)}</span>
          ) : (
            <span className="date" style={{ color: theme.colors.green }}>
              제작 중
            </span>
          )}
          {/* TAG */}
          <Tags tagList={data.tags} className="tags" />
        </div>
        <p className="title">{data.name}</p>
        <p className="description">{data.description}</p>
        <p className="goto ">
          프로젝트 상세보기
          <GOTO />
        </p>
      </div>
    </Link>
  );
};
export default ProjectsBox;
