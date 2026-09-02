// front
// REACT, NEXT_JS, VUE,
// back
// SEQUELIZE, SPRING_BOOT, POSTMAN, POSTGRES, MYSQL,
// etc
// DOCKER, GITHUB, PLAY_STORE, RAILWAY, VERCEL

// front
import REACT from "@/assets/portfolio/skill/BG/skill-icons_react-dark.svg?react";
import VUE from "@/assets/portfolio/skill/BG/skill-icons_vuejs-dark.svg?react";
import NEXT from "@/assets/portfolio/skill/BG/skill-icons_nextjs-dark.svg?react";

// back
import SEQUELIZE from "@/assets/portfolio/skill/BG/skill-icons_sequelize-dark.svg?react";
import SPRINGBOOT from "@/assets/portfolio/skill/BG/skill-icons_spring-dark.svg?react";
import POSTMAN from "@/assets/portfolio/skill/BG/skill-icons_postman.svg?react";
import POSTGRES from "@/assets/portfolio/skill/BG/skill-icons_postgresql-dark.svg?react";
import MYSQL from "@/assets/portfolio/skill/BG/skill-icons_mysql-dark.svg?react";
import SUPABASE from "@/assets/portfolio/skill/BG/skill-icons_supabase-dark.svg?react";

// etc
import DOCKER from "@/assets/portfolio/skill/BG/skill-icons_docker.svg?react";
import VERCEL from "@/assets/portfolio/skill/BG/skill-icons_vercel-dark.svg?react";
import AWS from "@/assets/portfolio/skill/BG/skill-icons_aws-dark.svg?react";
import ORACLE from "@/assets/portfolio/skill/BG/selfhst_oracle.svg?react";

const ICONS = {
  REACT,
  NEXT,
  VUE,
  SEQUELIZE,
  SPRING_BOOT: SPRINGBOOT,
  SPRINGBOOT: SPRINGBOOT,
  POSTMAN,
  POSTGRES,
  MYSQL,
  DOCKER,
  VERCEL,
  AWS,
  ORACLE,
  SUPABASE,
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
  SUPABASE: 15,
  // deploy/infra
  DOCKER: 20,
  VERCEL: 21,
  AWS: 22,
  ORACLE: 23,
};

const StackListColor = ({ list = [] }) => {
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
export default StackListColor;
