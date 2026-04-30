// 스타일
import { Button } from "@/components";
import { aboutBannerCss } from "./AboutBanner.styles";
import { useMedia } from "@/hooks/useMedia";
import { theme } from "@/styles/theme";

const AboutBanner = () => {
  const { isPc } = useMedia();

  const email = import.meta.env.VITE_EMAIL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;

  return (
    <section css={aboutBannerCss}>
      <div className="content">
        <div className="title-box">
          <div className="title">
            FrontEnd
            <br />
            BackEnd
            <br />
            Operations
          </div>
          <div className="sub-title">
            저는 풀스택 및 DevOps 개발자로서, 서비스를 구축 및 배포합
            <br />
            클라우드 인프라 아키텍처 설계 및 CI/CD 파이프라인 자동화부터
            <br />
            섬세한 React 인터페이스, 효율적인 Spring Boot 까지
          </div>
        </div>
        <div className="button-box">
          <a href={`mailto:${email}`}>
            <Button buttonType="email" cssObj={{ border: `1px solid #fff`, borderRadius: "0px", color: theme.colors.darkBG, backgroundColor: "white" }}>
              Email
            </Button>
          </a>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <Button buttonType="git" cssObj={{ border: `1px solid #fff`, borderRadius: "0px" }}>
              Github
            </Button>
          </a>
        </div>
      </div>
      <div className="bg"></div>
    </section>
  );
};
export default AboutBanner;
