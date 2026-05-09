import { TitleLayout } from "@/layouts";
import { homePortfolioCss } from "./HomePortfolio.styles";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button, StackList } from "@/components";

import UserIcon from "@/assets/portfolio/icon/user.svg?react";
import HomePage_1 from "@/assets/portfolio/banner/homePage-1.svg?react";
import HomePage_2 from "@/assets/portfolio/banner/homePage-2.svg?react";
import iphone_pc from "@/assets/portfolio/banner/pc_phone.png";
import careerhi from "@/assets/portfolio/banner/careerhi.png";
import { theme } from "@/styles/theme";
import { useMedia } from "@/hooks/useMedia";

const HomePortfolio = () => {
  // 전체 섹션을 참조 (GSAP 스코프용)
  const sectionRef = useRef(null);

  const { isPc } = useMedia();

  // GSAP 애니메이션 등록 (컴포넌트 마운트 시)
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 모든 배너 스테이지(1,2,3) 순회
      const bannerStages = gsap.utils.toArray(".banner-stage");

      // 1, 2번 배너: 내부 reveal-item(텍스트/라벨) 순차 등장 애니메이션
      bannerStages.forEach((stage) => {
        if (stage.classList.contains("banner-3")) return; // 3번 배너는 별도 처리
        const isBanner2 = stage.classList.contains("banner-2");

        const items = stage.querySelectorAll(".reveal-item");
        if (!items.length) return;

        // 스크롤 구간 동안 reveal-item들이 아래에서 위로 순차적으로 등장/사라짐
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top-=30% top",
            end: isBanner2 ? "bottom+=220% top" : "bottom+=140% top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(
          items,
          { autoAlpha: 0, y: 120 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            stagger: 0.22,
            ease: "none",
          },
        );

        timeline.to(
          items,
          {
            autoAlpha: 0.15,
            y: -35,
            duration: 1,
            stagger: 0.14,
            ease: "none",
          },
          isBanner2 ? "+=2.1" : "+=1.5",
        );

        // banner-2는 마지막 reveal 후에도 한 템포 유지
        if (isBanner2) {
          timeline.to({}, { duration: 3.6 });
        }
      });

      // 3번 배너: 텍스트 reveal + 하단 패널 슬라이드업(200vh)
      const thirdStage = sectionRef.current?.querySelector(".banner-3");
      if (thirdStage) {
        const thirdItems = thirdStage.querySelectorAll(".reveal-item");
        const slidePanel = thirdStage.querySelector(".slide-up-panel");

        // 3번 배너 텍스트 reveal 애니메이션
        if (thirdItems.length) {
          // 첫 노출 시 이미 보였다가 다시 사라지는 플리커 방지
          gsap.set(thirdItems, { autoAlpha: 0, y: 120 });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: thirdStage,
                start: "top top",
                end: "bottom+=35% top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            })
            .to(thirdItems, {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.18,
              ease: "none",
            })
            .to(
              thirdItems,
              {
                autoAlpha: 0.2,
                y: -25,
                duration: 0.8,
                stagger: 0.12,
                ease: "none",
              },
              "+=0.1",
            );
        }

        // 3번 배너 하단 패널(성과 박스) 슬라이드업 애니메이션
        if (slidePanel) {
          gsap.fromTo(
            slidePanel,
            { xPercent: -50, yPercent: 0, autoAlpha: 0.1 }, // 시작: sticky 하단 밖
            {
              xPercent: -50,
              // 끝: 패널이 충분히 올라오도록 이동량 확대
              yPercent: -135,
              autoAlpha: isPc ? 1 : 0.8,
              ease: "none",
              scrollTrigger: {
                trigger: thirdStage,
                // 등장 시점을 늦춰서 초반에는 배너 텍스트에 집중
                start: "top+=28% top",
                // sticky가 풀리기 전에 패널 애니메이션이 확실히 완료되도록 앞당김
                end: "bottom-=20% top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      }
    },
    { scope: sectionRef },
  );

  return (
    <section css={homePortfolioCss} ref={sectionRef}>
      {/* 상단 타이틀/설명 */}
      <TitleLayout
        title="Our Portfolio"
        subTitle={
          <p>
            일상의 문제를 발견하고 더 나은 사용자 경험을 설계합니다
            <br />
            아이디어를 현실로 구현해온 대표 프로젝트
          </p>
        }
      />
      {/* 몰입형 배너 스크롤 섹션 */}
      <section className="banner-stack">
        {/* 베너 1: 문제 발견/UX 해석 */}
        <section className="banner-stage banner-1">
          <div className="banner-sticky">
            {/* 배경 레이어 (sticky) */}
            <div className="banner-bg" />
            {/* 콘텐츠 카드 (reveal-item: 순차 등장) */}
            <div className="banner-content">
              <p className="reveal-item sub-title">Portfolio Site</p>
              <div className="reveal-item title">
                단순한 프로젝트 모음이 아닌,
                <br />
                리팩토링을 통한 성능개선 포트폴리오
              </div>
              <div className="reveal-item caption">
                여러 프로젝트를 단순히 복사한 것이 아니라, 성능 / 클린코드를 목표로 리팩토링하는 과정을 통해
                <br className="not-mobile" />
                구식의 코드를 최신 구성으로 바꾸고 성능을 높일 수 있도록 노력한 프로젝트
              </div>
              <div className="reveal-item icon-box">
                {/* ICON */}
                <div className="user-box">
                  <UserIcon />1
                </div>
                <StackList list={["REACT", "SPRINGBOOT", "VERCEL", "AWS", "DOCKER"]} />
              </div>
              <div className="reveal-item button-box cursor-reactive is-green">
                <Button
                  buttonType="right"
                  cssObj={{ border: `2px solid ${theme.colors.green}`, borderRadius: "8px", ...theme.fonts.textMd_B, color: theme.colors.green }}>
                  프로젝트 보기
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* 베너 2: 사용자 흐름/경험 설계 */}
        <section className="banner-stage banner-2">
          <div className="banner-sticky">
            <div className="banner-bg">
              <div className="point-bg">{/* 포인트 컬러1 */}</div>
              {isPc && <HomePage_1 className="reveal-item icon-bg icon-bg-1" />}
              <HomePage_2 className="reveal-item icon-bg icon-bg-2" />
            </div>
            <div className="banner-content">
              {/* 배경 레이어 (sticky) */}
              {isPc && (
                <div className="images-box">
                  {/* 화면 */}
                  <img className="reveal-item image image-1" src={iphone_pc} />
                </div>
              )}
              <p className="reveal-item sub-title">UnivNotice Site</p>
              <div className="reveal-item title">
                생활속 불편함에서 서비스로,
                <br />
                대학교 홈페이지 공지 알림 서비스
              </div>
              <div className="reveal-item caption">
                중요한 공지를 놓쳐서 '나를 위한 맞춤형 알림'이 간절했던 제 경험을 담아
                <br className="not-mobile" />
                필요한 공지를 절대 놓치지 않게 돕는, 앱 기반 푸시 알림 서비스를 개발했습니다.
              </div>
              <div className="reveal-item icon-box">
                {/* ICON */}
                <div className="user-box">
                  <UserIcon />1
                </div>
                <StackList list={["PLAYSTORE", "REACT", "SEQUELIZE", "VERCEL", "RAILWAY"]} />
              </div>
              <div className="reveal-item button-box cursor-reactive is-blue">
                <Button
                  buttonType="right"
                  cssObj={{ border: `2px solid ${theme.colors.blue}`, borderRadius: "8px", ...theme.fonts.textMd_B, color: theme.colors.blue }}>
                  프로젝트 보기
                </Button>
              </div>
            </div>
          </div>
        </section>
        {/* 베너 3: 제품 구현/성과 강조 */}
        <section className="banner-stage banner-3">
          <div className="banner-sticky">
            <div className="banner-bg" />
            <div className="banner-content">
              <p className="reveal-item sub-title">career-hi Site</p>
              <div className="reveal-item title">
                막연한 준비에서
                <br />
                데이터 기반의
                <br />
                전략적인 성장을 위하여
              </div>
              <div className="reveal-item caption">
                나의 포트폴리오와 역량이 상위 몇 퍼센트인지 확인하며
                <br className="not-mobile" />
                '진짜 필요한 기술'에 집중할 수 있도록 돕습니다.
              </div>
              <div className="reveal-item icon-box">
                {/* ICON */}
                <div className="user-box">
                  <UserIcon />5
                </div>
                <StackList list={["REACT", "SPRINGBOOT", "VERCEL", "AWS"]} />
              </div>
              <div className="reveal-item button-box cursor-reactive is-green">
                <Button
                  buttonType="right"
                  cssObj={{ border: `2px solid ${theme.colors.deepGreen}`, borderRadius: "8px", ...theme.fonts.textMd_B, color: theme.colors.deepGreen }}>
                  프로젝트 보기
                </Button>
              </div>
            </div>
            {/* 하단에서 상단으로 올라오는 성과 박스 (slide-up-panel) */}
            <div className="slide-up-panel">
              <img src={careerhi} />
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};
export default HomePortfolio;
