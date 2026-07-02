import { Button, Loading } from "@/components";
import { theme } from "@/styles/theme";
import useFormatDate from "@/hooks/useFormatDate";
import Tags from "@/components/Tags/Tags";
import { useNavigate } from "react-router-dom";
import { projectDetailHeroCss, projectDetailHeroInfoDomainCss, projectDetailHeroInfoStatusCss } from "./ProjectDetailHero.styles";

const ProjectDetailHero = ({ data }) => {
  const isUrlCss = { ...theme.fonts.captionXl, width: "fit-content", backgroundColor: theme.colors.green, color: "white" };
  const isNotUrlCss = {
    ...theme.fonts.captionXl,
    width: "fit-content",
    border: "1px solid" + theme.colors.green,
    color: theme.colors.green,
    cursor: "not-allowed",
  };

  const isPdf = {
    ...theme.fonts.captionXl,
    width: "fit-content",
    backgroundColor: theme.colors.redBG,
    color: theme.colors.red,
    border: `1px solid ${theme.colors.red}`,
  };

  const isNotPdf = { ...theme.fonts.captionXl, width: "fit-content", color: theme.colors.red, border: `1px solid ${theme.colors.red}`, cursor: "not-allowed" };
  const nav = useNavigate();
  const formatDate = useFormatDate();
  return (
    <div>
      {!data && <Loading />}
      {data && (
        <section css={projectDetailHeroCss} className="content-box">
          <div className="content-center">
            <div className="title-box">
              {/* title box */}
              <p className="path">Home / Projects /</p>
              <p className="title">{data.name}</p>
              <p className="description">{data.description}</p>
              <div className="button-box">
                <div
                  onClick={() => {
                    if (!data.url) {
                      alert("구현이 안 되어 있는 페이지입니다.");
                      return;
                    }
                    nav(`/project/${data.url}`);
                  }}
                  className="cursor-reactive is-green">
                  <Button buttonType="goto" cssObj={data?.url ? isUrlCss : isNotUrlCss}>
                    페이지 바로 가기
                  </Button>
                </div>

                {data.pdfUrl !== null && data.pdfUrl !== "null" && (
                  <a href={data.pdfUrl} role="button">
                    <Button buttonType="pdf" cssObj={data.pdfUrl !== null && data.pdfUrl !== "null" ? isPdf : isNotPdf}>
                      PDF 다운로드
                    </Button>
                  </a>
                )}
                <a href={data.gitUrl} target="_blank" rel="noreferrer">
                  <Button
                    buttonType="git"
                    cssObj={{
                      width: "fit-content",
                      padding: "16px",
                      gap: "0px",
                      backgroundColor: theme.colors.darkBG,
                      color: "white",
                      border: `1px solid ${theme.colors.darkBG}`,
                    }}
                  />
                </a>
                <a href={import.meta.env.VITE_GITHUB_URL} target="_blank" rel="noreferrer">
                  <Button
                    buttonType="git"
                    cssObj={{ ...theme.fonts.captionXl, width: "fit-content", padding: "16px", gap: "0px", border: `1px solid ${theme.colors.darkBG}` }}
                  />
                </a>
              </div>
            </div>
            {data && (
              <div className="info-box">
                {/* data box */}
                <div className="data-box">
                  {/* 기간 */}
                  <div>
                    <p>기간</p>
                    <p>
                      {formatDate(data.startDate)} ~ {formatDate(data.endDate)}
                    </p>
                  </div>
                  {/* 역할 */}
                  <div className="tags-box">
                    <p>역할</p>
                    <div>
                      <Tags tagList={data.tags} className="tags" />
                    </div>
                  </div>
                  {/* team */}
                  <div className="team-size-box">
                    <p>팀원</p>
                    <p>{data.teamSize}인</p>
                  </div>
                  {/* 제출 */}
                  {data.submitContest && (
                    <div className="submit-contest-box">
                      <p>제출</p>
                      <p>{data.submitContest}</p>
                    </div>
                  )}

                  {/* 도메인 */}
                  <div className="domain-box">
                    <p>도메인</p>
                    <p css={projectDetailHeroInfoDomainCss(data.domain)}>{data.domain === "null" ? "도메인 없음" : data.domain}</p>
                  </div>
                  {/* 상태 */}
                  <div className="status-box">
                    <p>상태</p>
                    <div css={projectDetailHeroInfoStatusCss(data.status)}>
                      <div></div>
                      <span>{data.status?.replaceAll("_", " ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
export default ProjectDetailHero;
