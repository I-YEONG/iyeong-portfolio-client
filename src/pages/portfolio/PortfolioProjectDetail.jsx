import { getProjectDetailApi } from "@/features/portfolio/projectDetail/api/projectApi";

import { ProjectDetailHero, ProjectDetailImgs, ProjectDetailContent } from "@/features/portfolio/projectDetail/components";

import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

import { Footer, Header } from "@/layouts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFormatDate from "@/hooks/useFormatDate";
import Tags from "@/components/Tags/Tags";

const PortfolioProjectDetail = () => {
  const [projectDetail, setProjectDetail] = useState(null);
  const formatDate = useFormatDate();
  const { id: projectId } = useParams();

  useEffect(() => {
    // 프로젝트 상세 API 호출
    const fetchProjectDetail = async () => {
      try {
        const data = await getProjectDetailApi(projectId);
        setProjectDetail(data);
      } catch (error) {
        console.error("프로젝트 상세 정보 불러오기 실패:", error);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  return (
    <main>
      <Header />
      <section css={portfolioProjectDetailCss}>
        <div className="content-center">
          <div className="content-box">
            <ProjectDetailHero data={projectDetail} />
            <ProjectDetailImgs data={projectDetail} />
            <ProjectDetailContent data={projectDetail} />
          </div>
          {projectDetail && (
            <div className="info-box">
              {/* data box */}
              <div className="data-box">
                {/* 기간 */}
                <div>
                  <p>기간</p>
                  <p>
                    {formatDate(projectDetail.startDate)} ~ {formatDate(projectDetail.endDate)}
                  </p>
                </div>
                {/* 역할 */}
                <div className="tags-box">
                  <p>역할</p>
                  <div>
                    <Tags tagList={projectDetail.tags} className="tags" />
                  </div>
                </div>
                {/* team */}
                <div className="team-size-box">
                  <p>팀원</p>
                  <p>{projectDetail.teamSize}인</p>
                </div>
                {/* 제출 */}
                {projectDetail.submitContest && (
                  <div className="submit-contest-box">
                    <p>제출</p>
                    <p>{projectDetail.submitContest}</p>
                  </div>
                )}
                {/* 도메인 */}
                <div className="domain-box">
                  <p>도메인</p>
                  <p css={projectDetailHeroInfoDomainCss(projectDetail.domain)}>{projectDetail.domain === "null" ? "도메인 없음" : projectDetail.domain}</p>
                </div>
                {/* 상태 */}
                <div className="status-box">
                  <p>상태</p>
                  <div css={projectDetailHeroInfoStatusCss(projectDetail.status)}>
                    <div></div>
                    <span>{projectDetail.status?.replaceAll("_", " ")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};
export default PortfolioProjectDetail;

const portfolioProjectDetailCss = () => css({});

const projectDetailHeroInfoDomainCss = (domain) =>
  css({
    color: domain === "null" ? theme.colors.orange : theme.colors.green,
  });

const projectDetailHeroInfoStatusCss = (status) =>
  css({
    color: status === "기획" ? theme.colors.black600 : status === "제작_중" ? theme.colors.orange : theme.colors.green,
  });
