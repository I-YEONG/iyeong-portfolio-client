import { Button, Loading } from "@/components";
import { projectHeroCss, projectInfoDomainCss, projectInfoStatusCss } from "./ProjectHero.styles";
import { theme } from "@/styles/theme";
import useFormatDate from "@/hooks/useFormatDate";
import Tags from "@/components/Tags/Tags";

const ProjectHero = ({ data }) => {
  const formatDate = useFormatDate();
  return (
    <div>
      {!data && <Loading />}
      {data && (
        <section css={projectHeroCss} className="content-box">
          <div className="content-center">
            <div className="title-box">
              {/* title box */}
              <p className="path">Home / Projects /</p>
              <p className="title">{data.name}</p>
              <p className="description">{data.description}</p>
              <div className="button-box">
                <Button buttonType="goto" cssObj={{ width: "fit-content", backgroundColor: theme.colors.green, color: "white" }}>
                  페이지 바로가기
                </Button>
                <Button
                  buttonType="pdf"
                  cssObj={{ width: "fit-content", backgroundColor: theme.colors.redBG, color: theme.colors.red, border: `1px solid ${theme.colors.red}` }}>
                  PDF 다운로드
                </Button>
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
                <Button buttonType="git" cssObj={{ width: "fit-content", padding: "16px", gap: "0px", border: `1px solid ${theme.colors.darkBG}` }} />
              </div>
            </div>

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
                  <p css={projectInfoDomainCss(data.domain)}>{data.domain === "null" ? "도메인 없음" : data.domain}</p>
                </div>
                {/* 상태 */}
                <div className="status-box">
                  <p>상태</p>
                  <div css={projectInfoStatusCss(data.status)}>
                    <div></div>
                    <span>{data.status?.replaceAll("_", " ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
export default ProjectHero;
