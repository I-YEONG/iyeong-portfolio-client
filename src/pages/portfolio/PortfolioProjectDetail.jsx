import { getProjectDetailApi } from "@/features/portfolio/projectDetail/api/projectApi";

import { ProjectDetailHero, ProjectDetailImgs, ProjectDetailContent } from "@/features/portfolio/projectDetail/components";

import { css } from "@emotion/react";

import { Footer, Header } from "@/layouts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDetailSkeleton from "@/features/portfolio/projectDetail/components/ProjectDetailSkeleton";

const PortfolioProjectDetail = () => {
  const [result, setResult] = useState(null);
  const { id: projectId } = useParams();
  const projectDetail = result?.id === projectId ? result.data : null;
  const error = result?.id === projectId && result.error;

  useEffect(() => {
    let active = true;
    // 프로젝트 상세 API 호출
    const fetchProjectDetail = async () => {
      try {
        const data = await getProjectDetailApi(projectId);
        if (active) setResult({ id: projectId, data });
      } catch (error) {
        console.error("프로젝트 상세 정보 불러오기 실패:", error);
        if (active) setResult({ id: projectId, error: true });
      }
    };

    fetchProjectDetail();
    return () => { active = false; };
  }, [projectId]);

  return (
    <main>
      <Header />
      <section css={portfolioProjectDetailCss}>
        <div className="content-center">
          <div className="content-box">
            {error ? <p role="alert">프로젝트 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</p> : projectDetail ? <>
              <ProjectDetailHero data={projectDetail} />
              <ProjectDetailImgs data={projectDetail} />
              <ProjectDetailContent data={projectDetail} />
            </> : <ProjectDetailSkeleton />}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};
export default PortfolioProjectDetail;

const portfolioProjectDetailCss = () => css({});
