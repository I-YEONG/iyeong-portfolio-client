import { useNavigate } from "react-router-dom";

// 비디오
import HomeVideo from "@/assets/portfolio/HomeVideo.mp4";
import { Button } from "@/components";

// 스타일
import { homeHeroCss, homeHeroContentCss } from "./HomeHero.styles";

const HomeHero = () => {
  const nav = useNavigate();

  return (
    <section css={homeHeroCss} className="cursor-reactive is-white">
      <div css={homeHeroContentCss}>
        {/* 타이틀 */}
        <p className="title">
          불편함을 발견하고,
          <br />
          기술로 해결하는 개발자
        </p>
        {/* 작은 타이틀 */}
        <p className="title-sub">
          일상의 불편함을 찾고, 서비스로서 해결할 수 있는 방법을 찾아
          <br />
          설계ㆍ개발ㆍ배포 까지 직접 하여 스스로 불편을 해결할 수 있는 개발자입니다.
        </p>
        {/* 버튼 */}
        <div className="button" onClick={() => nav("/projects")}>
          {/* 버튼 컴포넌트 */}
          <Button buttonType="right">Explore More</Button>
        </div>
      </div>
      <video autoPlay loop muted playsInline>
        <source src={HomeVideo} type="video/mp4" />
      </video>
    </section>
  );
};
export default HomeHero;
