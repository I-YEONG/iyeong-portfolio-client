import { useLocation, useNavigate } from "react-router-dom";
import { menuStyle } from "./Menu.style";
import { theme } from "@/styles/theme";

const Menu = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  const urlCheck = (url) => {
    let isMatch = false;

    // '오늘' 탭에 대한 검사 조건
    if (url === "/project/barum") {
      isMatch = pathname.includes("/routine") || pathname === "/project/barum" || pathname === "/project/barum/";
    } else {
      // '화장대', '기록' 등 다른 탭에 대한 검사 조건
      isMatch = pathname.startsWith(url);
    }

    if (isMatch) {
      return {
        color: theme.barum.colors.greenInk,
        backgroundColor: theme.barum.colors.greenSoft,
        fontWeight: "900 !important",
      };
    } else {
      return {};
    }
  };

  return (
    <nav css={menuStyle}>
      <span onClick={() => nav("/project/barum")} css={urlCheck("/project/barum")}>
        오늘
      </span>
      <span onClick={() => nav("/project/barum/makeup")} css={urlCheck("/project/barum/makeup")}>
        화장대
      </span>
      <span onClick={() => nav("/project/barum/record")} css={urlCheck("/project/barum/record")}>
        기록
      </span>
      <div className="bg-box"></div>
    </nav>
  );
};

export default Menu;
