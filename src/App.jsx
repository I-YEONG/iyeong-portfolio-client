import { Route, Routes } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";

// 페이지 임포트
import { MouseFollower } from "@/components";
import { PortfolioAbout, PortfolioHome } from "@/pages";

function App() {
  useScrollToTop();

  return (
    <>
      <MouseFollower />
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/about" element={<PortfolioAbout />} />
      </Routes>
    </>
  );
}

export default App;
