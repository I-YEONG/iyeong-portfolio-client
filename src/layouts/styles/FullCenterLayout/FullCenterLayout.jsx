import { fullCenterLayoutCss } from "./FullCenterLayout.styles";

const FullCenterLayout = ({ children, title = "", subTitle = "" }) => {
  return (
    <section css={fullCenterLayoutCss}>
      <div className="title-box">
        <p className="title">{title}</p>
        <div className="sub-title">{subTitle}</div>
      </div>
      <section className="content">
        <section className="content-center">{children}</section>
      </section>
    </section>
  );
};

export default FullCenterLayout;
