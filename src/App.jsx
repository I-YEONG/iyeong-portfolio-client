import { Route, Routes } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";
import "@/styles/careerhi.global.css";
import "@/styles/food.global.css";
import "@/styles/domo.global.css";
import "@/styles/univNotice.global.css";

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

        {/* 메인 페이지 */}
        <Route path="/project/:projectName/*" element={<PortfolioProject />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
