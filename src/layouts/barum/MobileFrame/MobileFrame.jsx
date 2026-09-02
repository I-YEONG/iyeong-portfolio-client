/** @jsxImportSource @emotion/react */
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { background, mobileContainer } from "./MobileFrame.style";

const MobileFrame = ({ children }) => {
  const { isMobile } = useDeviceMode();

  return (
    <div css={!isMobile ? background : {}}>
      <main css={mobileContainer(isMobile)}>{children}</main>
    </div>
  );
};

export default MobileFrame;
