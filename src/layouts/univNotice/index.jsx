import { useDeviceMode } from "@/hooks/useDeviceMode";
import UnivNoticeFooter from "./UnivNoticeFooter";
import UnivNoticeHeader from "./UnivNoticeHeader";

const UnivNoticeMainLayout = ({ children }) => {
  // const isApp = useWeb().isApp;
  // const isPc = useMedia().isPc;

  const { isPc } = useDeviceMode();

  return (
    <section style={{ width: "100%", height: "100%", paddingTop: isPc ? 0 : "18px", backgroundColor: "#F3F3F3" }}>
      <UnivNoticeHeader />
      <div style={{ width: "100%", height: isPc ? "100%" : "96%" }}>{children}</div>
      {isPc && <UnivNoticeFooter />}
    </section>
  );
};
export default UnivNoticeMainLayout;
