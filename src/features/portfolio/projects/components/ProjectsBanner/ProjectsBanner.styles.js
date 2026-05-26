import { css } from "@emotion/react";
import { theme } from "@/styles/theme";
import { mq } from "@/styles/mq";

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

    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },
  },

  [mq("mobile")]: {
    flexDirection: "column",

    "& .img-box": {
      maxWidth: "100%",
    },
  },
});
