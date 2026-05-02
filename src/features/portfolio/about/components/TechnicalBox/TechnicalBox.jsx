import { technicalBoxCss } from "./TechnicalBox.styles";

const TechnicalBox = ({ data, title, color }) => {
  console.log(data);
  return (
    <div css={technicalBoxCss(color)}>
      {/* titleBox */}
      <div className="title-box">
        <p className="title">{title}</p>
        <div className="color-bar">{/* 컬러 바 */}</div>
      </div>
      <div className="data-list-box">
        {data.map((item, idx) => (
          <div key={idx}></div>
        ))}
      </div>
    </div>
  );
};
export default TechnicalBox;
