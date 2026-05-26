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

const ICONS = {
  REACT,
  NEXT,
  VUE,
  SEQUELIZE,
  SPRINGBOOT,
  SPRING_BOOT: SPRINGBOOT,
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

const ORDER_WEIGHT = {
  // front
  REACT: 1,
  NEXT: 2,
  VUE: 3,
  // back
  SEQUELIZE: 10,
  SPRINGBOOT: 11,
  SPRING_BOOT: 11,
  POSTMAN: 12,
  POSTGRES: 13,
  MYSQL: 14,
  // deploy/infra
  DOCKER: 20,
  GITHUB: 21,
  PLAYSTORE: 22,
  RAILWAY: 23,
  VERCEL: 24,
  AWS: 25,
};

const StackList = ({ list = [] }) => {
  return (
    <div css={{ display: "flex", gap: "12px", alignItems: "center" }}>
      {[...list]
        .sort((a, b) => (ORDER_WEIGHT[a] ?? 999) - (ORDER_WEIGHT[b] ?? 999))
        .map((name) => {
          const Icon = ICONS[name];
          return Icon ? <Icon key={name} className={`icon`} /> : null;
        })}
    </div>
  );
};
export default StackList;
