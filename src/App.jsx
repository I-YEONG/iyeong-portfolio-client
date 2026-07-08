import { Route, Routes } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";

// 페이지 임포트
import { MouseFollower } from "@/components";
import { NotFound, PortfolioAbout, PortfolioHome, PortfolioProject, PortfolioProjectDetail, PortfolioProjects } from "@/pages";
import ImageModal from "./components/ImageModal/ImageModal";

function App() {
  useScrollToTop();

  return (
    <>
      <MouseFollower />
      <ImageModal />
      {/* portfolio */}
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/about" element={<PortfolioAbout />} />
        <Route path="/projects" element={<PortfolioProjects />} />
        <Route path="/projects/:id" element={<PortfolioProjectDetail />} />
        경로 패스
        {/* 메인 페이지 */}
        <Route path="/project/:projectName/*" element={<PortfolioProject />} />
        {/* 
        마이 로드맵
        생성
        <Route path="/roadmap/create" element={<MyRoadmapCreatePage />} />
        목록
        <Route path="/roadmap/list" element={<MyRoadmapListPage />} />
        결과
        <Route path="/roadmap/result" element={<MyRoadmapResultPage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
