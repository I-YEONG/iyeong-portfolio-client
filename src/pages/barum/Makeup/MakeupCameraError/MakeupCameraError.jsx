import { BarumBasicLayout } from "@/layouts";

import { useNavigate, useSearchParams } from "react-router-dom";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { BarumBarButton, BarumLeftButton } from "@/components/barum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";

const noneDataStyle = css({
  height: "100%",
  width: "100%",
  ...theme.barum.flex.colCenter,
  alignItems: "center",
  textAlign: "center",
  gap: "36px",

  "& .icon": {
    minHeight: "160px",
    maxHeight: "160px",
    minWidth: "160px",
    maxWidth: "160px",
    backgroundColor: theme.barum.colors.warnBg,
    color: theme.barum.colors.warn,
    fontSize: "64px",
    borderRadius: "999px",
    ...theme.barum.flex.colCenter,
    alignItems: "center",
  },

  "& .title": {
    ...theme.barum.fonts.titleM,
    marginBottom: "8px",
  },

  "& .sub": {
    ...theme.barum.fonts.sub,
    color: theme.barum.colors.ink2,
  },

  "& .button-box": {
    width: "100%",
    padding: "0 18px",
  },
});

const MakeupCameraError = () => {
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const errorType = searchParams.get("type");
  return (
    <BarumBasicLayout>
      <header>
        <span onClick={() => nav("/project/barum")}>
          <BarumLeftButton />
        </span>
      </header>
      <div css={noneDataStyle}>
        <div className="icon">
          <FontAwesomeIcon icon={faFileLines} />
        </div>

        <div>
          <p className="title">{errorType === "OCR_NO_TEXT" ? "성분을 읽지 못했어요" : "오류가 발생했어요"}</p>
          <p className="sub">
            {errorType === "OCR_NO_TEXT"
              ? "성분 문단 전체가 화면에 들어오게, 밝은 곳에서 다시 찍어 주세요."
              : "연결이 불안정했어요. 잠시 후 다시 시도해 주세요."}
          </p>
        </div>
        <div className="button-box" css={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {errorType === "OCR_NO_TEXT" && <BarumBarButton clickFun={() => nav("/project/barum/makeup/create/camera")}>다시 촬영</BarumBarButton>}
          {errorType === "OCR_NO_TEXT" && (
            <BarumBarButton colorTheme="white" clickFun={() => nav("/project/barum/makeup/create/search")}>
              제품 검색해 보기
            </BarumBarButton>
          )}
          {errorType !== "OCR_NO_TEXT" && <BarumBarButton clickFun={() => nav("/project/barum/makeup")}>돌아가기</BarumBarButton>}
        </div>
      </div>
    </BarumBasicLayout>
  );
};
export default MakeupCameraError;
