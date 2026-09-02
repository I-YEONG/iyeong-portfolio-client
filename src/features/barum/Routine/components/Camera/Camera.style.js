import { css } from "@emotion/react";
import { theme } from "@/styles/theme";

export const containerStyle = css({
  ...theme.barum.flex.center, // display: flex, justifyContent: center, alignItems: center
  position: "relative",
  width: "100%",
  height: "100%",
  minHeight: "450px", // 레이아웃에 맞춰 조절하세요
  backgroundColor: theme.barum.colors.cam, // 카메라 뷰 전용 어두운 배경색
  borderRadius: "24px",
  overflow: "hidden",
});

export const videoStyle = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: "scaleX(-1)", // 셀카(거울) 모드를 위한 좌우 반전
});

export const badgeStyle = css({
  position: "absolute",
  top: "16px",
  left: "16px",
  backgroundColor: theme.barum.colors.scrim, // 오버레이용 반투명 배경
  padding: "6px 10px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  zIndex: 10,

  "& span": {
    ...theme.barum.fonts.micro, // 12.5px 폰트
    color: theme.barum.colors.surface, // 흰색 텍스트
  },
});

export const dotStyle = css({
  width: "6px",
  height: "6px",
  backgroundColor: theme.barum.colors.greenDot, // 메인 테마의 카메라 활성화 표시 그린 컬러
  borderRadius: "50%",
});

export const guideStyle = css({
  position: "absolute",
  top: "48%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  aspectRatio: "3 / 4",
  border: `1.5px solid ${theme.barum.colors.veil}`, // 테마에 정의된 반투명 라인
  borderRadius: "50%",
  zIndex: 10,
  pointerEvents: "none",
});

export const textStyle = css({
  position: "absolute",
  bottom: "24px",
  width: "100%",
  textAlign: "center",
  ...theme.barum.fonts.caption, // 14.5px, 굵은 텍스트 적용
  color: "#e5e5e5",
  zIndex: 10,
  textShadow: "0px 1px 3px rgba(0,0,0,0.6)", // 영상 위에서 가독성을 높이기 위한 그림자는 유지
});

export const errorStyle = css({
  ...theme.barum.fonts.body,
  color: theme.barum.colors.warn, // 경고 코랄 컬러 적용
  textAlign: "center",
  padding: "20px",
});
export const errorWrapperStyle = css({
  ...theme.barum.flex.colCenter,
  alignItems: "center",
  width: "100%",
  height: "100%",
  minHeight: "450px", // 기존 카메라 레이아웃과 동일한 높이 유지
  backgroundColor: theme.barum.colors.surfaceMuted, // 두 번째 이미지처럼 밝은 톤의 그레이 배경
  borderRadius: "24px",
  padding: "20px",
  textAlign: "center",
});

export const errorIconBoxStyle = css({
  ...theme.barum.flex.center,
  width: "80px",
  height: "80px",
  backgroundColor: theme.barum.colors.surface, // 흰색 원형 배경
  borderRadius: "50%",
  marginBottom: "24px",
  color: theme.barum.colors.ink4, // 연한 그레이 아이콘 색상
  fontSize: "32px", // 아이콘 크기 조절
});

export const errorTitleStyle = css({
  ...theme.barum.fonts.titleS,
  color: theme.barum.colors.ink1,
  marginBottom: "12px",
});

export const errorDescStyle = css({
  ...theme.barum.fonts.sub,
  color: theme.barum.colors.ink2,
  lineHeight: "1.6",
  wordBreak: "keep-all", // 텍스트 줄바꿈이 자연스럽게 되도록 설정
});
