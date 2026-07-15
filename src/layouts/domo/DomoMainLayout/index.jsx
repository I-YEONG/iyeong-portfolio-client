import "@/styles/domo.global.css";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { DomoMobileFooter, DomoMobileHeader, DomoPcFooter, DomoPcHeader } from "@/layouts";

const DomoMainLayout = ({ children, onChangeMobileToggle }) => {
  const { isPc } = useDeviceMode();

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", backgroundColor: "white" }}>
      {isPc && <DomoPcHeader style={{ zIndex: "9999" }} />}
      {!isPc && <DomoMobileHeader style={{ zIndex: "9999" }} onChangeMobileToggle={onChangeMobileToggle} />}
      <section
        style={{
          height: isPc ? "calc(100% - min(12%, 89px))" : `calc(100% - 64px - min(12%, 89px))`,
          width: "100%",
          marginTop: isPc ? "min(12%, 89px)" : "64px",
          overflowY: "scroll",
          position: "relative",
          // padding: isPc ? "" : "0 5%",
        }}>
        {children}
        {isPc && <DomoPcFooter style={{ zIndex: "9999" }} />}
      </section>
      {!isPc && <DomoMobileFooter style={{ zIndex: "9999" }} />}
    </div>
  );
};
export default DomoMainLayout;
