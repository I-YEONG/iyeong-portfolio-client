import { FullCenterLayout } from "@/layouts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

// 스타일
import { homeOverviewCss } from "./HomeOverview.styles";
import { useMedia } from "@/hooks/useMedia";

// 아이콘
import AwardsIcon from "@/assets/portfolio/icon/iconoir_medal.svg?react";
import ProjectIcon from "@/assets/portfolio/icon/si_projects-line.svg?react";
import QualificationIcon from "@/assets/portfolio/icon/solar_document-broken.svg?react";
import VideoIcon from "@/assets/portfolio/icon/arcticons_fiitjee-recorded-lectures.svg?react";
import PlayStoreIcon from "@/assets/portfolio/icon/hugeicons_play-store.svg?react";
import { Button } from "@/components";

import { theme } from "@/styles/theme";
import { useNavigate } from "react-router-dom";
import { useOverviewQuery } from "../../hooks/useOverview";
import Loading from "@/components/Loading/Loading";

const HomeOverview = () => {
  const { isPc } = useMedia();
  const nav = useNavigate();

  const { data: overview, isLoading: isOverviewLoading, isError: isOverviewError } = useOverviewQuery();

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
        {isOverviewLoading && (
          <div className="loading-wrap">
            <Loading />
          </div>
        )}
        {!isOverviewLoading && (
          <>
            <div className="swiperDiv">
              <Swiper
                slidesPerView={isPc ? 3 : 1}
                autoplay={{
                  delay: 2800,
                  disableOnInteraction: false,
                }}
                pagination={{
                  dynamicBullets: true,
                }}
                loop={true}
                modules={[Autoplay, Pagination]}
                className="swiper">
                {/* 수상 */}
                <SwiperSlide className="item">
                  <AwardsIcon />
                  <p className="title">
                    수상 경력 <span css={{ color: theme.colors.green }}>{overview?.award ?? 0}</span>회
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
                    프로젝트 진행 <span css={{ color: theme.colors.green }}>{overview?.project ?? 0}</span>
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
                    자격증 <span css={{ color: theme.colors.green }}>{overview?.qualifications ?? 0}</span>개
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
                    <span css={{ color: theme.colors.green }}>{overview?.education ?? 0}</span>
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
                    <span css={{ color: theme.colors.green }}>{overview?.playStore ?? 0}</span>
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
          </>
        )}
      </section>
    </FullCenterLayout>
  );
};
export default HomeOverview;
