import { getProjectDetailApi } from "@/features/portfolio/projectDetail/api/projectApi";

import { ProjectDetailHero, ProjectDetailImgs, ProjectDetailContent } from "@/features/portfolio/projectDetail/components";

import { css } from "@emotion/react";

import { Footer, Header } from "@/layouts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFormatDate from "@/hooks/useFormatDate";
import Tags from "@/components/Tags/Tags";

const PortfolioProjectDetail = () => {
  const [projectDetail, setProjectDetail] = useState(null);
  const _formatDate = useFormatDate();
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
        </div>
      </section>
      <Footer />
    </main>
  );
};
export default PortfolioProjectDetail;

const portfolioProjectDetailCss = () => css({});
