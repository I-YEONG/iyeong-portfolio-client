// import DownloadIcon from "@/assets/portfolio/icon/download.svg?react";
import GitIcon from "@/assets/portfolio/skill/github.svg?react";

// 스타일
import { footerCss } from "./Footer.styles";
import { useMedia } from "@/hooks/useMedia";

const Footer = () => {
  const { isTablet } = useMedia();
  const email = import.meta.env.VITE_EMAIL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;

  return (
    <footer css={footerCss}>
      <section className="sub-title">
        <div>
          <p>
            <span>새로운 제안은 언제나 </span>
            <span className="point">환영</span>
            <span>합니다 :&gt;</span>
          </p>
          {isTablet && <div className="line"></div>}
          {isTablet && <a href={`mailto:${email}`}>메일 발송하기</a>}
        </div>
      </section>
      <section className="footer">
        {/* 첫줄 */}
        <div className="row">
          <div className="title">IYEONG; Protfolio</div>
          <div className="row">
            {/* 이력서 다운로드 임시 숨김
            <a download href="/">
              <DownloadIcon style={{ width: 18, height: 18 }} />
            </a> */}
            <a href={githubUrl} target="_blank" rel="noreferrer">
              <GitIcon style={{ width: 18, height: 18 }} />
            </a>
          </div>
        </div>
        <div className="row row-2">
          {/* 왼쪽 */}
          <div>
            {/* 두번째 줄 */}
            <p>
              <span className="gray">UXㆍFrontㆍBackㆍOps</span>
              <span>이영규</span>
            </p>
            {/* 세번째 줄 */}
            <p>
              <span className="gray">Email</span>
              <span>{email}</span>
            </p>
          </div>
          {/* 오른쪽 */}
          <div className="copyrights">
            <p>© 2026 IYEONG; Portfolio All rights reserved.</p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
