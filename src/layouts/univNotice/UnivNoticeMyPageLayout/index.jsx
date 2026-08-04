import { useDeviceMode } from "@/hooks/useDeviceMode";

import UnivNoticeMyPageHeader from "./UnivNoticeHeader";
const UnivNoticeMyPageLayout = ({ children }) => {
  const { isPc, isMobile } = useDeviceMode();

  return (
    <section style={{ width: "100%", height: "100%", paddingTop: !isMobile ? 0 : "18px" }}>
      <UnivNoticeMyPageHeader />
      <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>{children}</div>
    </section>
  );
};
export default UnivNoticeMyPageLayout;
