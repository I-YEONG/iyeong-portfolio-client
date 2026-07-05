import { useNavigate } from "react-router-dom";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import "@/styles/univNotice.global.css";
const UnivNoticeLogoCP = () => {
  const nav = useNavigate();
  const { isMobile } = useDeviceMode();
  return (
    <div onClick={() => nav("/")} style={{ fontSize: isMobile ? "22px" : "24px", fontWeight: "normal", cursor: "pointer" }}>
      <span style={{ fontWeight: "bold" }}>UNIV N</span>otice
    </div>
  );
};
export default UnivNoticeLogoCP;
