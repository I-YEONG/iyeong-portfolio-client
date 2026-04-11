import { TitleLayout } from "@/layouts";
import { homePortfolioCss } from "./HomePortfolio.styles";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button, StackList } from "@/components";

import UserIcon from "@/assets/portfolio/icon/user.svg?react";
import { theme } from "@/styles/theme";

const HomePortfolio = () => {
  // 전체 섹션을 참조 (GSAP 스코프용)
  const sectionRef = useRef(null);

  // GSAP 애니메이션 등록 (컴포넌트 마운트 시)
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 모든 배너 스테이지(1,2,3) 순회
      const bannerStages = gsap.utils.toArray(".banner-stage");

      // 1, 2번 배너: 내부 reveal-item(텍스트/라벨) 순차 등장 애니메이션
      bannerStages.forEach((stage) => {
        if (stage.classList.contains("banner-3")) return; // 3번 배너는 별도 처리

        const items = stage.querySelectorAll(".reveal-item");
        if (!items.length) return;

        // 스크롤 구간 동안 reveal-item들이 아래에서 위로 순차적으로 등장/사라짐
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top-=30% top",
            end: "bottom+=80% top",
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
          "+=1.5",
        );
      });

      // 3번 배너: 텍스트 reveal + 하단 패널 슬라이드업(200vh)
      const thirdStage = sectionRef.current?.querySelector(".banner-3");
      if (thirdStage) {
        const thirdItems = thirdStage.querySelectorAll(".reveal-item");
        const slidePanel = thirdStage.querySelector(".slide-up-panel");

        // 3번 배너 텍스트 reveal 애니메이션
        if (thirdItems.length) {
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
            .fromTo(
              thirdItems,
              { autoAlpha: 0, y: 120 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.18,
                ease: "none",
              },
            )
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
            { xPercent: -50, yPercent: 0, autoAlpha: 1 }, // 시작: sticky 하단 밖
            {
              xPercent: -50,
              yPercent: -170, // 끝: sticky 상단 밖
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: thirdStage,
                start: "top top",
                end: "bottom+=35% top",
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
                <br />
                구식의 코드를 최신 구성으로 바꾸고 성능을 높일 수 있도록 노력한 프로젝트
              </div>
              <div className="reveal-item icon-box">
                {/* ICON */}
                <div className="user-box">
                  <UserIcon />1
                </div>
                <StackList list={["REACT", "SPRINGBOOT", "VERCEL", "AWS", "DOCKER"]} />
              </div>
              <div className="reveal-item button-box">
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
            <div className="banner-bg" />
            <div className="banner-content">
              <span className="banner-label reveal-item">02 DESIGN</span>
              <h3 className="reveal-item">사용자 흐름을 설계하고 경험을 정교화합니다</h3>
              <p className="reveal-item">
                핵심 시나리오를 프로토타입으로 검증하며
                <br />
                클릭 한 번의 맥락까지 디테일하게 다듬습니다.
              </p>
            </div>
          </div>
        </section>
        {/* 베너 3: 제품 구현/성과 강조 */}
        <section className="banner-stage banner-3">
          <div className="banner-sticky">
            <div className="banner-bg" />
            <div className="banner-content">
              <span className="banner-label reveal-item">03 BUILD</span>
              <h3 className="reveal-item">아이디어를 실제 제품으로 구현합니다</h3>
              <p className="reveal-item">
                디자인 시스템과 코드 품질을 함께 관리해
                <br />
                운영 가능한 결과물로 완성합니다.
              </p>
            </div>
            {/* 하단에서 상단으로 올라오는 성과 박스 (slide-up-panel) */}
            <div className="slide-up-panel"></div>
          </div>
        </section>
      </section>
    </section>
  );
};
export default HomePortfolio;
