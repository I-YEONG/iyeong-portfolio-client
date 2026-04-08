import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import { mq } from "@/styles/mq";

// 비디오
import HomeVideo from "@/assets/portfolio/HomeVideo.mp4";
import { Button } from "@/components";

const HomeHero = () => {
  const nav = useNavigate();

  return (
    <section css={homeHero}>
      <div css={homeHeroContent}>
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

const homeHeroContent = css({
  ...theme.flex.colCenter,
  position: "relative",
  gap: "32px",
  marginBottom: "80px",
  alignItems: "center",

  "& .title": {
    ...theme.fonts.titleLg_B,
    lineHeight: "1.4",
  },

  "& .title-sub": {
    ...theme.fonts.textMd_L,
  },

  "& .button": {
    width: "40%",
    height: "52px",
    marginTop: "24px",
  },

  [mq.mobile]: {
    gap: "26px",

    "& .title": {
      ...theme.fonts.titleMd_B,
    },

    "& .title-sub": {
      ...theme.fonts.captionLg_L,
    },

    "& .button": {
      width: "60%",
    },
  },
});

const homeHero = css({
  ...theme.flex.center,
  width: "100%",
  height: "calc(100vh - 93px)",
  color: "#fff",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  backgroundColor: "rgba(0,0,0,0.5)",

  "& video": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
    transform: "scale(1.15) translate(-1%, -3%)",
  },

  // 반응형
  [mq.mobile]: {
    height: "calc(100vh - 85px)",
  },
});
