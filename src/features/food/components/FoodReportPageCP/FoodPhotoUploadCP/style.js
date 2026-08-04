import { css } from "@emotion/react";

/* --- 정적 스타일 (isPc 불필요) --- */

export const foodPhotoCardStyle = css({
  border: "1px solid var(--food-brown-dark)",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
});

export const foodPhotoTitleStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

export const foodPhotoIconStyle = css({
  width: "1.25rem",
  height: "1.25rem",
  color: "var(--food-brown-light)", // root의 브라운 라이트 컬러
});

export const foodUploadIconStyle = css({
  width: "3rem",
  height: "3rem",
  margin: "0 auto 1rem auto",
  color: "var(--food-gray-4)",
});

export const foodUploadTextMainStyle = css({
  marginBottom: "0.5rem",
  color: "var(--food-gray-6)",
});

export const foodUploadTextSubStyle = css({
  marginBottom: "1rem",
  fontSize: "0.875rem",
  color: "var(--food-gray-5)",
});

export const foodPreviewSectionStyle = css({
  marginTop: "1rem",
});

export const foodPreviewTitleStyle = css({
  marginBottom: "0.75rem",
  fontWeight: 500,
});

export const foodPreviewItemStyle = css({
  position: "relative",
  // 호버 시 내부의 삭제 버튼(class="delete-btn")이 보이도록 처리
  "&:hover .delete-btn": {
    opacity: 1,
  },
});

export const foodPreviewImgStyle = css({
  objectFit: "cover",
  width: "100%",
  height: "6rem",
  borderRadius: "0.5rem",
});

export const foodDeleteBtnStyle = css({
  position: "absolute",
  top: "-0.5rem",
  right: "-0.5rem",
  padding: "0.25rem",
  color: "var(--food-gray-0)",
  backgroundColor: "var(--food-red)", // root의 빨간색 포인트
  borderRadius: "9999px",
  opacity: 0,
  transition: "opacity 0.2s",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const foodBadgeWrapperStyle = css({
  position: "absolute",
  bottom: "0.25rem",
  left: "0.25rem",
});

/* --- 동적 스타일 (상태 또는 isPc 필요) --- */

export const foodDropZoneStyle = (isUploadDisabled, dragActive) => {
  let borderColor = "var(--food-gray-4)";
  let bgColor = "transparent";
  let opacity = 1;
  let cursor = "pointer";

  if (isUploadDisabled) {
    borderColor = "var(--food-gray-3)";
    bgColor = "var(--food-gray-1)";
    opacity = 0.6;
    cursor = "not-allowed";
  } else if (dragActive) {
    borderColor = "var(--food-brown-light)";
    bgColor = "var(--food-gray-1)";
  }

  return css({
    border: `2px dashed ${borderColor}`,
    borderRadius: "0.5rem",
    padding: "2rem",
    textAlign: "center",
    transition: "all 0.2s ease-in-out",
    backgroundColor: bgColor,
    opacity: opacity,
    cursor: cursor,
    "&:hover": !isUploadDisabled && {
      borderColor: "var(--food-brown-light)",
    },
  });
};

export const foodUploadBtnWrapperStyle = (isUploadDisabled) =>
  css({
    width: "8rem",
    margin: "0 auto",
    cursor: isUploadDisabled ? "not-allowed" : "pointer",
  });

export const foodPreviewGridStyle = (isPc) =>
  css({
    display: "grid",
    gridTemplateColumns: isPc ? "repeat(3, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))",
    gap: "1rem",
  });
