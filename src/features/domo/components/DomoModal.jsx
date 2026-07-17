import { useEffect } from "react";
import "./styles/modal.js";

import { useDeviceMode } from "@/hooks/useDeviceMode";
import { domoModalStyle } from "./styles/modal.js";

const DomoModal = ({ children }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const { isPc } = useDeviceMode();

  return (
    <section css={domoModalStyle(isPc)} className="modal_background flexCenter">
      <div className="modal_content">{children}</div>
    </section>
  );
};
export default DomoModal;
