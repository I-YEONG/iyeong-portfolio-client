import { useLocation, useNavigate } from "react-router-dom";
import { menuStyle } from "./Menu.style";
import { theme } from "@/styles/theme";

const Menu = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  const urlCheck = (url) => {
    const barumPath = pathname.replace(/^.*\/project\/barum/, "") || "/";
    const isMatch = url === "/" ? barumPath === "/" || barumPath.startsWith("/routine") : barumPath.startsWith(url);

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
      <span onClick={() => nav("/project/barum")} css={urlCheck("/")}>
        오늘
      </span>
      <span onClick={() => nav("/project/barum/makeup")} css={urlCheck("/makeup")}>
        화장대
      </span>
      <span onClick={() => nav("/project/barum/record")} css={urlCheck("/record")}>
        기록
      </span>
      <div className="bg-box"></div>
    </nav>
  );
};
export default Menu;
