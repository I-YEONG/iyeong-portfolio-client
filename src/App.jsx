import { Route, Routes } from "react-router-dom";
import useScrollToTop from "@/hooks/useScrollToTop";

// 페이지 임포트
import { PortfolioHome } from "@/pages";

function App() {
  useScrollToTop();

  return (
    <Routes>
      <Route path="/" element={<PortfolioHome />} />
    </Routes>
  );
}

export default App;
