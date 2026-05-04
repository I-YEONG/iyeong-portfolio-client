import { useState } from "react";
import { aboutTechnicalItemBoxCss, aboutTechnicalItemCss } from "./AboutTechnicalItemBox.styles";
import { theme } from "@/styles/theme";

const AboutTechnicalItemBox = ({ data = [], title, color }) => {
  const [pagination, setPagination] = useState(data.length > 5 ? true : false);

  console.log(data.length, pagination);

  return (
    <div css={aboutTechnicalItemBoxCss(color, pagination)}>
      {/* titleBox */}
      <div className="title-box">
        <p className="title">{title}</p>
        <div className="color-bar">{/* 컬러 바 */}</div>
      </div>
      <div className="data-list-box">
        {data
          .slice()
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((item, idx) => (
            <div key={idx}>
              <div className="item-title-box">
                <span>{item.name}</span>
                <div
                  style={{
                    color: `${item.expertise === "core" ? theme.colors.green : item.expertise === "expert" ? theme.colors.orange : theme.colors.black800}`,

                    backgroundColor:
                      item.expertise === "core" ? theme.colors.greenBG : item.expertise === "expert" ? theme.colors.orangeBG : `${theme.colors.black800}20`,
                  }}>
                  {item.expertise}
                </div>
              </div>
              <div className="item-color-bar" css={aboutTechnicalItemCss(item.proficiency, item.expertise)}></div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default AboutTechnicalItemBox;
