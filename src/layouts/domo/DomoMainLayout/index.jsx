import DomoMobileFooter from "./DomoMobileFooter";
import DomoMobileHeader from "./DomoMobileHeader";
import DomoPcFooter from "./DomoPcFooter";
import DomoPcHeader from "./DomoPcHeader";
import { useEffect, useState } from "react";
import "@/styles/domo.global.css";
import { useDeviceMode } from "@/hooks/useDeviceMode";

const DomoMainLayout = ({ children, onChangeMobileToggle }) => {
  const { isPc } = useDeviceMode();
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      {isPc && <PcHeader style={{ zIndex: "9999" }} />}
      {!isPc && <MobileHeader style={{ zIndex: "9999" }} onChangeMobileToggle={onChangeMobileToggle} />}
      <section
        style={{
          height: isPc ? "calc(100vh - min(12vh, 89px))" : `calc(${vh}px - 64px - min(12vh, 89px))`,
          width: "100%",
          marginTop: isPc ? "min(12vh, 89px)" : "64px",
          overflowY: "scroll",
          position: "relative",
        }}>
        {children}
        {isPc && <PcFooter style={{ zIndex: "9999" }} />}
      </section>
      {!isPc && <MobileFooter style={{ zIndex: "9999" }} />}
    </div>
  );
};
export default DomoMainLayout;
