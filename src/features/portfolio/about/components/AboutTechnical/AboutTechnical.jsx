import { FullCenterLayout } from "@/layouts";
import { aboutTechnicalCss } from "./AboutTechnical.styles";
import { useMedia } from "@/hooks/useMedia";
import { useNavigate } from "react-router-dom";
import { useOverviewQuery } from "../../hooks/useOverview";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { Button, Loading } from "@/components";

import "swiper/css";
import "swiper/css/pagination";
import { theme } from "@/styles/theme";

const AboutTechnical = () => {
  const { isPc } = useMedia();
  const nav = useNavigate();

  // const { data: overview, isLoading: isOverviewLoading, isError: isOverviewError } = useOverviewQuery();

  return (
    <section>
      <FullCenterLayout title="Technical Proficiency" subTitle={<p>중학교 2학년부터 지금까지, 공부해온 스택의 숙련도를 한눈에 확인 해 보세요.</p>}>
        {/* {isOverviewLoading && (
          <div className="loading-wrap">
            <Loading />
          </div>
        )}
        {!isOverviewLoading && ( */}
        <section css={aboutTechnicalCss}>
          <div className="fixed-block">
            <p className="title">
              자세한 내용
              <br />
              보러가기
            </p>
            <div onClick={() => nav("/about")}>
              <Button
                cssObj={{
                  border: `1px solid ${theme.colors.darkBG}`,
                  borderRadius: "4px",
                  padding: "6px 16px",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.03)" },
                }}>
                Explore More
              </Button>
            </div>
          </div>
          <div className="swiperDiv">
            <Swiper
              slidesPerView={1}
              autoplay={{
                delay: 2800,
                disableOnInteraction: false,
              }}
              pagination={{
                dynamicBullets: true,
              }}
              loop={true}
              modules={[Pagination]}
              className="swiper">
              {/* 수상 */}
              <SwiperSlide className="item">1</SwiperSlide>
              <SwiperSlide className="item">2</SwiperSlide>
            </Swiper>
          </div>
        </section>
        {/* )} */}
      </FullCenterLayout>
    </section>
  );
};
export default AboutTechnical;
