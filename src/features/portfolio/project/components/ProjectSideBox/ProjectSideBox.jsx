import Tags from "@/components/Tags/Tags";
import { useCommentQuery } from "../../hooks/useComment";
import useFormatDate from "@/hooks/useFormatDate";
import { useParams } from "react-router-dom";

import { projectSideBoxCss } from "./ProjectSideBox.styles";

const ProjectSideBox = () => {
  const { projectName, "*": restPath } = useParams();
  const { data } = useCommentQuery(projectName);
  const filterPath = "/" + restPath || "/";
  const commentList = data?.comments
    ?.slice()
    .filter((comment) => comment.detailUrl === filterPath || comment.detailUrl === "*")
    .sort((a, b) => a.sort - b.sort);

  console.log(filterPath);
  const formatDate = useFormatDate();

  return (
    <section css={projectSideBoxCss} className="menu-box">
      <div className="title-content">
        <div className="title-box">
          {/* 프로젝트 이름 */}
          <span className="title">{data?.name}</span>
          {/* 태그 */}
          <Tags tagList={data?.tags} />
        </div>
        <p className="date">
          {/* 제작 기간 */}
          {formatDate(data?.startDate)} ~ {formatDate(data?.endDate)}
        </p>
      </div>
      {commentList?.length > 0 && (
        <div className="comment-box">
          {commentList.map((comment) => (
            <div className="comment-item" key={comment.id}>
              <p className="comment-title">
                <span>{comment.sort === 0 ? "공통" : comment.sort}.</span>
                {comment.title}
              </p>
              <p className="comment-content">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
      {commentList?.length === 0 && <div css={{ color: "gray" }}>현재 페이지에 남겨진 코멘트가 없습니다.</div>}
    </section>
  );
};
export default ProjectSideBox;
