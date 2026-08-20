import { css, keyframes } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const projectsBannerCss = css({
  ...theme.flex.rowBetween,
  width: "100%",
  minHeight: "460px",

  // 콘텐츠
  "& .content": {
    padding: "24px",
    ...theme.flex.colCenter,
    gap: "26px",

    // 날짜 구역
    "& .date-box": {
      display: "flex",
      gap: "12px",
      ...theme.fonts.captionLg,
    },

    // 타이틀 구역
    "& .title-box": {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },

    // 타이틀
    "& .title": {
      ...theme.fonts.titleMd_B,
    },

    // 서브 타이틀
    "& .sub-title": {
      ...theme.fonts.textMd_B,
      color: theme.colors.orange,
    },

    // 설명
    "& .description": {
      ...theme.fonts.textMd,
      color: theme.colors.black600,
    },

    // 스택 리스트
    "& .icon": {
      width: "32px",
      height: "32px",
    },

    // 상세보기 버튼
    "& .goto": {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      ...theme.fonts.textMd_B,
      color: theme.colors.black800,
      borderBottom: `1px solid ${theme.colors.black800}`,
      width: "fit-content",
    },
  },

  // 이미지
  "& .img-box": {
    position: "relative",
    maxWidth: "50%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& .img-skeleton": {
      position: "absolute",
      inset: 0,
      backgroundImage: `linear-gradient(90deg, ${theme.colors.lightLine} 0%, ${theme.colors.black100} 50%, ${theme.colors.lightLine} 100%)`,
      backgroundSize: "200% 100%",
      animation: `${shimmer} 1.2s ease-in-out infinite`,
      borderRadius: "6px",
    },

    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "opacity 0.2s ease",
    },
  },

  [mq("mobile")]: {
    flexDirection: "column",

    "& .img-box": {
      width: "100%",
      maxWidth: "100%",
      flex: "0 0 auto",
      aspectRatio: "16/9",
      height: "auto",
    },
  },
});
