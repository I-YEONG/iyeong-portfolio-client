import { theme } from "@/styles/theme";
// 비디오
import { Button } from "@/components";

// 스타일
import { aboutHeroCss } from "./AboutHero.styles";
import { useMedia } from "@/hooks/useMedia";

const AboutHero = () => {
  const { isPc } = useMedia();

  return (
    <section css={aboutHeroCss}>
      <section className="content">
        <div className="title-box">
          <p>About</p>
          <p className="me">
            Me<span>.</span>
          </p>
        </div>
        <div className="content-box">
          {isPc && <p className="title">“불편함을 찾고, 깊이 고민하여 더 나은 서비스를 만듭니다.”</p>}
          {isPc && (
            <p>
              기획 단계부터 현실적인 상황을 고려해 최선의 목표를 설계하고,
              <br />
              동료들과 원활하게 소통할 수 있는 가독성 높고 효율적인 코드를 지향합니다.
              <br />
              <br />
              단순히 기능을 구현하는 것에 그치지 않고, 서비스에 가장 적합한 배포 방식과
              <br />
              시스템 환경을 고민하며 서비스를 완성해 나가는 과정을 즐기는 개발자입니다.
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
                color: theme.colors.black600,
                backgroundColor: "#fff",
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
export default AboutHero;
