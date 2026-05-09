import { FullCenterLayout } from "@/layouts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

// 스타일
import { homeOverviewCss } from "./HomeOverview.styles";
import { useMedia } from "@/hooks/useMedia";

// 아이콘
import AwardsIcon from "@/assets/portfolio/icon/iconoir_medal.svg?react";
import ProjectIcon from "@/assets/portfolio/icon/si_projects-line.svg?react";
import QualificationIcon from "@/assets/portfolio/icon/solar_document-broken.svg?react";
import VideoIcon from "@/assets/portfolio/icon/arcticons_fiitjee-recorded-lectures.svg?react";
import PlayStoreIcon from "@/assets/portfolio/icon/hugeicons_play-store.svg?react";
import { Button, CountUpSpan } from "@/components";

import { theme } from "@/styles/theme";

const HomeOverview = () => {
  const { isPc } = useMedia();

  return (
    <FullCenterLayout
      title="Overview"
      subTitle={
        <p>
          중학교 2학년부터 지금까지,
          <br />
          꾸준히 쌓아온 기록의 요약본입니다.
        </p>
      }>
      <section css={homeOverviewCss}>
        <div className="swiperDiv">
          <Swiper
            slidesPerView={isPc ? 3 : 1}
            autoplay={{
              delay: 2800,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            className="swiper">
            {/* 수상 */}
            <SwiperSlide className="item">
              <AwardsIcon />
              <p className="title">
                수상 경력 <CountUpSpan end={3} style={{ color: theme.colors.green }} />회
              </p>
              <p className="sub-title">
                해커톤과 대회에서
                <br />
                여러 상을 받았습니다.
              </p>
            </SwiperSlide>

            {/* 프로젝트 */}
            <SwiperSlide className="item">
              <ProjectIcon />
              <p className="title">
                프로젝트 진행 <CountUpSpan end={6} style={{ color: theme.colors.green }} />
                <span css={{ color: theme.colors.green }}>+</span>
              </p>
              <p className="sub-title">
                불편함을 해결하기 위해 제작한
                <br />
                프로젝트ㆍ서비스의 수
              </p>
            </SwiperSlide>

            {/* 자격증 */}
            <SwiperSlide className="item">
              <QualificationIcon />
              <p className="title">
                자격증 <CountUpSpan end={6} style={{ color: theme.colors.green }} />개
              </p>
              <p className="sub-title">
                기초를 다지면서 취득한
                <br />
                자격증입니다.
              </p>
            </SwiperSlide>

            {/* 수강한 강의 */}
            <SwiperSlide className="item">
              <VideoIcon />
              <p className="title">
                <CountUpSpan end={6} style={{ color: theme.colors.green }} />
                가지 교육 수료
              </p>
              <p className="sub-title">
                새로운 지식을 배우며
                <br />
                수강한 강의의 수입니다.
              </p>
            </SwiperSlide>

            {/* 플레이스토어 */}
            <SwiperSlide className="item">
              <PlayStoreIcon />
              <p className="title">
                <CountUpSpan end={6} style={{ color: theme.colors.green }} />
                가지 앱 출시
              </p>
              <p className="sub-title">
                n 개의 서비스가
                <br />
                스토어에 출시 됨
              </p>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="fixed-block">
          <p>
            자세한 내용
            <br />
            보러가기
          </p>
          <Button>Explore More</Button>
        </div>
      </section>
    </FullCenterLayout>
  );
};
export default HomeOverview;
