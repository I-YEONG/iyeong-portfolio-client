import RightArrowIcon from "@/assets/portfolio/icon/right.svg?react";
import DownloadIcon from "@/assets/portfolio/icon/download.svg?react";
import GitIcon from "@/assets/portfolio/skill/github.svg?react";
import EmailIcon from "@/assets/portfolio/icon/email.svg?react";
import PdfIcon from "@/assets/portfolio/icon/pdf.svg?react";
import GotoIcon from "@/assets/portfolio/icon/goto.svg?react";

import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

const Button = ({ cssObj, buttonType = "none", children }) => {
  return (
    <div css={buttonCss(cssObj)}>
      <span>{children}</span>
      {buttonType === "right" && <RightArrowIcon className="icon" />}
      {buttonType === "goto" && <GotoIcon className="icon" />}
      {buttonType === "email" && <EmailIcon className="icon" />}
      {buttonType === "pdf" && <PdfIcon className="icon" />}
      {buttonType === "git" && <GitIcon />}
      {buttonType === "download" && <DownloadIcon className="icon" />}
    </div>
  );
};
export default Button;

const buttonCss = (cssObj) =>
  css({
    ...theme.flex.rowBetween,

    // 공통 스타일
    transition: "all 0.5s",
    cursor: "pointer",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "16px 32px",
    gap: "12px",

    ...(cssObj || {
      // 기본 스타일
      border: "1px solid #fff",
      borderRadius: "6px",
      ...theme.fonts.textMd,

      // 호버 스타일
      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      },
    }),

    [mq("mobile")]: {
      padding: "12px 24px",
      ...theme.fonts.captionXl_B,
    },
  });
