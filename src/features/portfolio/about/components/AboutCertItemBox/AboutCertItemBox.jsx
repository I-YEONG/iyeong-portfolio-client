import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";
// {
//             "id": 1,
//             "type": "engineering",
//             "name": "정보처리기사",
//             "organization": "한국산업인력공단",
//             "status": false,
//             "acquiredDate": null,
//             "logoUrl": "https://hiqyqzmyoxafmrrspntv.supabase.co/storage/v1/object/public/iyeong-portfolio-file-bucket/portfolio/certifications/HRDK_CI.png"
//         },

const AboutCertItemBox = ({ data }) => {
  return (
    <div css={aboutCertItemBoxCss(data.status, data.id)}>
      <div className="content-box">
        <div className="text-box">
          <p className="title">{data.name}</p>
          <p className="sub-title">{data.organization}</p>
        </div>
        {data.id !== 999 && <img src={data.logoUrl} alt="ci" />}
      </div>
      {data.id !== 999 && (
        <p className="status">
          {data.status ? `취득` : "취득 준비"}
          {data.status && <span>({data.acquiredDate})</span>}
        </p>
      )}
    </div>
  );
};

export default AboutCertItemBox;

const aboutCertItemBoxCss = (status, id) =>
  css({
    width: "50%",
    height: "120px",
    padding: "16px 22px",

    borderRight: `1px solid ${theme.colors.lightLine}`,
    borderBottom: `1px solid ${theme.colors.lightLine}`,
    backgroundColor: id === 999 ? "#FDFDFD" : "#fff",

    ...theme.flex.colBetween,

    [mq("mobile")]: {
      width: "100%",
      borderRight: "none",
    },

    "& > .content-box": {
      width: "100%",
      ...theme.flex.rowBetween,
      alignItems: "center",

      "& > .text-box": {
        "& > .title": {
          ...theme.fonts.textLg_B,
        },
        "& > .sub-title": {
          ...theme.fonts.captionXl_L,
          color: theme.colors.black600,
        },
      },
      "& > img": {
        height: "32px",
        width: "auto",
        display: "block",
      },
    },

    "& > .status": {
      width: "100%",
      textAlign: "right",
      ...theme.fonts.captionXl_B,
      color: status ? theme.colors.green : theme.colors.black400,

      "& > span": {
        ...theme.fonts.captionLg_L,
      },
    },
  });
