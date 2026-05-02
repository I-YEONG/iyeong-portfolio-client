import { TitleLayout } from "@/layouts";
import { homeVisionCss } from "./HomeVision.styles";

import code_icon from "@/assets/portfolio/icon/tabler_code.png";
import running_icon from "@/assets/portfolio/icon/carbon_running.png";
import medal_icon from "@/assets/portfolio/icon/iconoir_medal.png";
import user_icon from "@/assets/portfolio/icon/user.png";

const HomeVision = () => {
  return (
    <section css={homeVisionCss}>
      <TitleLayout
        title="Vision"
        subTitle={
          <p>
            단순히 작동하는 코드를 넘어, 동료와 함께 읽고 성장하며
            <br />
            누군가의 일상에 기여하는 개발을 지향합니다
          </p>
        }
      />
      <section className="content">
        <div>
          <div className="title-box">
            <img src={code_icon} alt="code_icon" />
            <p>클린 코드</p>
          </div>
          <p className="sub-title">나중과 지금, 누구나 읽기 쉬운 코드를 작성합니다.</p>
          <p className="caption">
            코드의 가독성이 서비스의 수명과 직결됨을 믿으며,
            <br className="not-mobile" />
            누가 언제 봐도 이해하기 편한 구조를 설계합니다.
          </p>
        </div>
        <div>
          <div className="title-box">
            <img src={running_icon} alt="running_icon" />
            <p>협업 능력</p>
          </div>
          <p className="sub-title">함께 고민할 때 더 나은 정답을 찾을 수 있다고 확신합니다.</p>
          <p className="caption">
            Git을 통한 체계적인 버전 관리와 꼼꼼한 문서화로 팀의 생산성을 높이고,
            <br className="not-mobile" />
            원활한 소통으로 최선의 결과물을 도출합니다.
          </p>
        </div>
        <div>
          <div className="title-box">
            <img src={medal_icon} alt="medal_icon" />
            <p>끊임없는 개발</p>
          </div>
          <p className="sub-title">일상의 불편함을 해결하려는 노력을 멈추지 않습니다.</p>
          <p className="caption">
            univNotice와 CareerHigh처럼 실생활의 문제를 발견하고,
            <br className="not-mobile" />
            이를 기술적으로 구현해 나가는 자기 주도적인 학습과 개발을 지속합니다.
          </p>
        </div>
        <div>
          <div className="title-box">
            <img src={user_icon} alt="user_icon" />
            <p>대회 및 도전</p>
          </div>
          <p className="sub-title">제한된 환경 속에서의 몰입을 통해 실력을 향상시킵니다.</p>
          <p className="caption">
            다양한 경진 대회와 해커톤에 도전하여 문제 해결 능력을 키우고,
            <br className="not-mobile" />
            새로운 기술 스택을 빠르게 습득하여 기술을 성장시킵니다.
          </p>
        </div>
      </section>
    </section>
  );
};
export default HomeVision;
