import { css, keyframes } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const projectsBoxCss = css({
  width: "100%",
  minHeight: "320px",
  // height: "100%",
  flex: "1 1 0",
  ...theme.flex.colStart,
  borderRight: `1px solid ${theme.colors.lightLine}`,

  "&:last-child": {
    borderRight: "none",
  },

  [mq("mobile")]: {
    borderRight: "none",
    minHeight: "auto",
    height: "auto",
    flex: "none",

    "& .img-box": {
      flex: "0 0 auto",
      aspectRatio: "16/9",
      maxHeight: "none",
    },

    "& .content-box": {
      flex: "none",
      height: "auto",
    },
  },

  "& .img-box": {
    position: "relative",
    width: "100%",
    aspectRatio: "16/9",
    maxHeight: "480px",
    borderBottom: `1px solid ${theme.colors.lightLine}`,
    overflow: "hidden", // 이미지가 영역 밖으로 삐져나가는 것을 방지

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
      objectPosition: "left top",
    },
  },

  // 콘텐츠
  "& .content-box": {
    ...theme.flex.colBetween,
    flex: 1,
    height: "100%",
    border: "none",
    gap: "8px",
    padding: "24px 26px",

    // date box
    "& .date-box": {
      ...theme.flex.rowStart,
      ...theme.fonts.captionLg,
      gap: "8px",
    },

    // title
    "& .title": {
      ...theme.fonts.titleSm,
      [mq("mobile")]: {
        ...theme.fonts.titleMd_B,
      },
    },

    // 설명
    "& .description": {
      ...theme.fonts.captionXl,
      color: theme.colors.black600,
      // flex: "1 1 auto",
    },

    // 링크
    "& .goto": {
      ...theme.flex.rowStart,
      marginTop: "auto",
      gap: "8px",
      ...theme.fonts.captionXl_B,
      color: theme.colors.black600,
      borderBottom: `1px solid ${theme.colors.black800}`,
      width: "fit-content",
      padding: "4px 0",
      transition: "color 0.2s",
    },
  },

  "&:hover .goto": {
    color: theme.colors.black800,
  },
});
