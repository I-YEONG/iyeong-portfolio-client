import UnivNoticeLogoCP from "@/features/univNotice/componentes/_common/UnivNoticeLogoCP";
import { useMedia } from "../../hook/useMedia";
import { useWeb } from "../../hook/useWeb";
import Header from "../UnivNoticeHeader";

const UnivNoticeLogoLayout = ({ children }) => {
  const isPc = useMedia().isPc;
  const isApp = useWeb().isApp;
  return (
    <section style={{ width: "100%", height: "100vh", paddingTop: !isApp ? 0 : "18px" }}>
      <header style={{ width: "100%", height: "64px", zIndex: "999", padding: isPc ? "0 2rem" : "0 1rem", position: "absolute" }} className="flexHeightCenter">
        <UnivNoticeLogoCP />
      </header>
      <div style={{ width: "100%", height: isPc ? "100vh" : "96vh" }}>{children}</div>
    </section>
  );
};
export default UnivNoticeLogoLayout;
