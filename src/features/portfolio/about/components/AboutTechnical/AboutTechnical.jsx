import { FullCenterLayout } from "@/layouts";
import { aboutTechnicalCss } from "./AboutTechnical.styles";

import { Swiper, SwiperSlide } from "swiper/react";

import { Button, Loading } from "@/components";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { theme } from "@/styles/theme";
import { useEffect, useMemo, useRef, useState } from "react";
import { useStackQuery } from "../../hooks/useStack";
import { stackMockupData } from "@/mockup/stackMockupData";
import TechnicalBox from "../TechnicalBox/TechnicalBox";
import { useMedia } from "@/hooks/useMedia";

const AboutTechnical = () => {
  const { isPc } = useMedia();
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // const { data: overview, isLoading: isOverviewLoading, isError: isOverviewError } = useOverviewQuery();

  // const { data: stack, isLoading: isStackLoading, isError: isStackError } = useStackQuery();

  //FIXME: 개발 후 api로 수정
  const stack = stackMockupData;

  const stackList = useMemo(() => {
    if (!Array.isArray(stack)) return [];

    const front = stack.filter((item) => item.category === "front");
    const back = stack.filter((item) => item.category === "back");
    const ops = stack.filter((item) => item.category === "ops");
    const etc = stack.filter((item) => item.category === "etc");

    return { front: front, back: back, ops: ops, etc: etc };
  }, [stack]);

  console.log(stackList);

  const [pageIndex, setPageIndex] = useState(0);

  return (
    <section>
      <FullCenterLayout
        title="Technical Proficiency"
        subTitle={
          <p>
            중학교 2학년부터 지금까지, 공부해온 스택의 숙련도를
            <br />
            한눈에 확인 해 보세요.
          </p>
        }>
        <section css={aboutTechnicalCss}>
          <div className="fixed-block">
            <p className="title">{pageIndex === 0 ? "Main Stack" : "Secondary Stack"}</p>
            <p>
              {pageIndex === 0 ? (
                <>
                  현재 중점적으로 사용하거나
                  <br />
                  공부중인 기술과 라이브러리입니다.
                </>
              ) : (
                <>
                  접해보고 공부해본
                  <br />
                  기술과 라이브러리입니다.
                </>
              )}
            </p>
            <div ref={nextRef} className="swiper-button-next" style={{ display: pageIndex === 0 ? "block" : "none" }}>
              <Button
                cssObj={{
                  border: `1px solid ${theme.colors.darkBG}`,
                  padding: "6px 16px",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.03)" },
                }}>
                nextPage
              </Button>
            </div>
            <div ref={prevRef} className="swiper-button-prev" style={{ display: pageIndex === 1 ? "block" : "none" }}>
              <Button
                cssObj={{
                  border: `1px solid ${theme.colors.darkBG}`,
                  padding: "6px 16px",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.03)" },
                }}>
                prevPage
              </Button>
            </div>
          </div>
          <div className="swiper-div">
            {/* {isStackLoading && (
          <div className="loading-wrap">
            <Loading />
          </div>
        )}
        {!isStackLoading && ( */}
            <Swiper
              slidesPerView={1}
              autoplay={
                !isPc && {
                  delay: 2800,
                  disableOnInteraction: false,
                }
              }
              loop={true}
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              navigation={true}
              onSlideChange={(swiper) => {
                setPageIndex(swiper.realIndex);
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              className="swiper">
              {isPc && (
                <SwiperSlide className="item">
                  <div className="technical-box">
                    <TechnicalBox title="FrontEnd" data={stackList.front} color={theme.colors.green} />
                  </div>
                  <div className="technical-box">
                    <TechnicalBox title="BackEnd" data={stackList.back} color={theme.colors.orange} />
                  </div>
                  <div className="technical-box">
                    <TechnicalBox title="Operations" data={stackList.ops} color={theme.colors.blue} />
                  </div>
                </SwiperSlide>
              )}

              {/* 모바일 */}
              {!isPc && (
                <SwiperSlide className="item">
                  <TechnicalBox title="FrontEnd" data={stackList.front} color={theme.colors.green} />
                </SwiperSlide>
              )}
              {!isPc && (
                <SwiperSlide className="item">
                  <TechnicalBox title="BackEnd" data={stackList.back} color={theme.colors.orange} />
                </SwiperSlide>
              )}
              {!isPc && (
                <SwiperSlide className="item">
                  <TechnicalBox title="Operations" data={stackList.ops} color={theme.colors.blue} />
                </SwiperSlide>
              )}

              {/* 기타 */}
              <SwiperSlide className="item">
                <TechnicalBox title="etc" data={stackList.etc} color={theme.colors.black600} />
              </SwiperSlide>
            </Swiper>
            {/* } */}
          </div>
        </section>
      </FullCenterLayout>
    </section>
  );
};
export default AboutTechnical;
