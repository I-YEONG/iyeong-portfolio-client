// Emotion의 css 함수와 테마, 미디어쿼리 유틸 import
import { css } from "@emotion/react";
import { mq } from "@/styles/mq";
import { theme } from "@/styles/theme";

/**
 * TitleLayout 컴포넌트
 * - 큰 제목과 서브타이틀을 세로로 정렬해서 보여주는 레이아웃 컴포넌트입니다.
 * - 가운데 정렬, gap, 폰트 스타일 등 일관된 스타일을 제공합니다.
 *
 * @param {Object} props
 * @param {string|React.ReactNode} props.title   - 메인 타이틀(문자열 또는 노드)
 * @param {string|React.ReactNode} props.subTitle - 서브 타이틀(문자열 또는 노드)
 * @returns {JSX.Element}
 */
const TitleLayout = ({ title = "", subTitle = "" }) => {
  return (
    <div css={titleLayoutCss} className="title-box">
      <p className="title">{title}</p>
      <div className="sub-title">{subTitle}</div>
    </div>
  );
};
export default TitleLayout;

/**
 * TitleLayout의 스타일 정의
 * - 세로 중앙 정렬, gap, 폰트, 텍스트 정렬 등
 */
const titleLayoutCss = () =>
  css({
    // 전체 레이아웃: 세로 중앙 정렬
    ...theme.flex.colCenter,
    gap: "12px",
    margin: "0 auto",
    textAlign: "center",

    // 메인 타이틀 스타일
    "& .title": {
      ...theme.fonts.titleSm_B,
      lineHeight: "1.4",

      [mq("mobile")]: {
        ...theme.fonts.testXLg_B,
      },
    },

    // 서브 타이틀 스타일
    "& .sub-title": {
      ...theme.fonts.captionXl_L,
      // lineHeight: "1.4",
    },
  });
