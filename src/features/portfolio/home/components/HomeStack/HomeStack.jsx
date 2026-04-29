import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

// front
// REACT, NEXT_JS, VUE,
// back
// SEQUELIZE, SPRING_BOOT, POSTMAN, POSTGRES, MYSQL,
// etc
// DOCKER, GITHUB, PLAY_STORE, RAILWAY, VERCEL

// front
import REACT from "@/assets/portfolio/skill/react_b.svg?react";
import NEXT from "@/assets/portfolio/skill/nextjs.svg?react";
import VUE from "@/assets/portfolio/skill/vue.svg?react";

// back
import SEQUELIZE from "@/assets/portfolio/skill/sequelize.svg?react";
import SPRINGBOOT from "@/assets/portfolio/skill/spring_boot.svg?react";
import POSTMAN from "@/assets/portfolio/skill/postMan.svg?react";
import POSTGRES from "@/assets/portfolio/skill/Postgres.svg?react";
import MYSQL from "@/assets/portfolio/skill/mysql.svg?react";

// etc
import DOCKER from "@/assets/portfolio/skill/docker.svg?react";
import GITHUB from "@/assets/portfolio/skill/github.svg?react";
import PLAYSTORE from "@/assets/portfolio/skill/play_store.svg?react";
import RAILWAY from "@/assets/portfolio/skill/railway.svg?react";
import VERCEL from "@/assets/portfolio/skill/vercel.svg?react";
import AWS from "@/assets/portfolio/skill/aws.svg?react";
import { useMedia } from "@/hooks/useMedia";
import { HomeStackCss } from "./HomeStack.styles";

const ICONS = {
  REACT,
  NEXT,
  VUE,
  SEQUELIZE,
  SPRINGBOOT,
  POSTMAN,
  POSTGRES,
  MYSQL,
  DOCKER,
  GITHUB,
  PLAYSTORE,
  RAILWAY,
  VERCEL,
  AWS,
};

const list = Object.keys(ICONS);

const HomeStack = () => {
  const { isPc } = useMedia();
  return (
    <section css={HomeStackCss}>
      <>
        <Swiper
          slidesPerView={isPc ? 10 : 3}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={1000}
          modules={[Autoplay]}
          className="mySwiper">
          {list.map((icon) => {
            const Icon = ICONS[icon];
            return <SwiperSlide key={icon}>{Icon ? <Icon key={icon} className={`icon`} /> : null}</SwiperSlide>;
          })}
        </Swiper>
      </>
    </section>
  );
};
export default HomeStack;
