import { getProjectDetailApi } from "@/features/portfolio/projects/api/projectApi";
import { ProjectHero } from "@/features/portfolio/projects/components";
import { Footer, Header } from "@/layouts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PortfolioProjectDetail = () => {
  const [projectDetail, setProjectDetail] = useState(null);
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
      <ProjectHero data={projectDetail} />
      <div style={{ height: "200vh", backgroundColor: "lightgray" }}>{/* 임시 */}</div>
      <Footer />
    </main>
  );
};
export default PortfolioProjectDetail;
