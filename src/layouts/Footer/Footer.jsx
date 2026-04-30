import DownloadIcon from "@/assets/portfolio/icon/download.svg?react";
import GitIcon from "@/assets/portfolio/skill/github.svg?react";

// 스타일
import { footerCss } from "./Footer.styles";
import { useMedia } from "@/hooks/useMedia";

const Footer = () => {
  const { isTablet } = useMedia();

  return (
    <footer css={footerCss}>
      <section className="sub-title">
        <div>
          <p>
            <span className="point">함께</span>
            <span>다음 결과를 만들어 가고 싶습니다 :&gt;</span>
          </p>
          {isTablet && <div className="line"></div>}
          {isTablet && <a href="mailto:iyeongyu0@syuin.ac.kr">메일 발송하기</a>}
        </div>
      </section>
      <section className="footer">
        {/* 첫줄 */}
        <div className="row">
          <div className="title">IYEONG; Protfolio</div>
          <div className="row">
            <a download href="/">
              <DownloadIcon style={{ width: 18, height: 18 }} />
            </a>
            <a href="https://github.com/iyeonggyu0" target="_blank" rel="noreferrer">
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
              <span>iyeongyu0@syuin.ac.kr</span>
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
