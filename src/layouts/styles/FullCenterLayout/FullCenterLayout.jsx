import TitleLayout from "../TitleLayout/TitleLayout";
import { fullCenterLayoutCss } from "./FullCenterLayout.styles";

const FullCenterLayout = ({ children, title = "", subTitle = "" }) => {
  return (
    <section css={fullCenterLayoutCss}>
      <TitleLayout title={title} subTitle={subTitle} />
      <section className="content">
        <section className="content-center">{children}</section>
      </section>
    </section>
  );
};

export default FullCenterLayout;
