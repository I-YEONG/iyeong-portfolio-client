import UnivNoticeLogoCP from "@/features/univNotice/components/_common/UnivNoticeLogoCP";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import "@/styles/univNotice.global.css";
const UnivNoticeLogoLayout = ({ children }) => {
  const { isPc } = useDeviceMode();

  return (
    <section style={{ width: "100%", height: "100%" }}>
      <header
        style={{ width: "100%", height: "64px", zIndex: "999", padding: isPc ? "0 2rem" : "0 1rem", position: "absolute" }}
        className="univnoticeFlexHeightCenter">
        <UnivNoticeLogoCP />
      </header>
      <div style={{ width: "100%", height: "100%" }}>{children}</div>
    </section>
  );
};
export default UnivNoticeLogoLayout;
