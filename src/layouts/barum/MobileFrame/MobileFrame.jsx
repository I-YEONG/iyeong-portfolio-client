/** @jsxImportSource @emotion/react */
import { background, mobileContainer } from "./MobileFrame.style";

const MobileFrame = ({ children }) => {
  return (
    <div css={background}>
      <main css={mobileContainer}>{children}</main>
    </div>
  );
};

export default MobileFrame;
