import { theme } from "@/styles/theme";
// 비디오
import { Button } from "@/components";

// 스타일
import { projectsHero } from "./ProjectsHero.styles";
import { useMedia } from "@/hooks/useMedia";

const ProjectsHero = () => {
  const { isPc } = useMedia();

  return (
    <section css={projectsHero} className="cursor-reactive is-white">
      <section className="content">
        <div className="title-box">
          <p className="patch">Home / Projects</p>
          <p className="projects">Projects</p>
          <p className="list">List</p>
        </div>
        <div className="content-box">
          {isPc && <p className="title">“일상의 불편함을 기술로 해결한 기록”</p>}
          {isPc && (
            <p>
              일상의 문제를 발견하고 더 나은 사용자 경험을 설계합니다.
              <br />
              아이디어를 현실로 구현해온 대표 프로젝트들입니다.
            </p>
          )}
          <div className="state">
            <p>상태</p>
            <div>
              <div>{/* 동그라미 */}</div>
              <span>구직 중</span>
            </div>
          </div>
          <a download href="/" className="button cursor-reactive is-green is-big">
            <Button
              cssObj={{
                border: `1px solid ${theme.colors.lightLine}`,
                borderRadius: "8px",
                backgroundColor: theme.colors.darkBG,
                color: "#fff",
                "& .icon": {
                  color: theme.colors.green,
                },
              }}
              buttonType="download">
              이력서 다운로드
            </Button>
          </a>
        </div>
      </section>
      <section className="bg"></section>
    </section>
  );
};
export default ProjectsHero;
