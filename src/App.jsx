import { Route, Routes } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";

// 페이지 임포트
import { MouseFollower } from "@/components";
import { NotFound, PortfolioAbout, PortfolioHome, PortfolioProjectDetail, PortfolioProjects } from "@/pages";
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

        {/* common */}
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
