import { BarumBasicLayout } from "@/layouts";

import { useNavigate, useSearchParams } from "react-router-dom";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { BarumBarButton, BarumLeftButton } from "@/components/barum";

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
    backgroundColor: theme.barum.colors.greenSoft,
    borderRadius: "999px",
    ...theme.barum.flex.colCenter,
    alignItems: "center",
    gap: "8px",

    "& .bar_1": {
      width: "70px",
      backgroundColor: "#fff",
      borderRadius: "999px",
      height: "22px",
    },
    "& .bar_2": {
      width: "88px",
      backgroundColor: theme.barum.colors.green,
      borderRadius: "999px",
      height: "22px",
    },
    "& .bar_3": {
      width: "60px",
      backgroundColor: theme.barum.colors.blue,
      borderRadius: "999px",
      height: "22px",
    },
  },

  "& .icon-error": {
    minHeight: "160px",
    maxHeight: "160px",
    minWidth: "160px",
    maxWidth: "160px",
    backgroundColor: theme.barum.colors.surfaceMuted,
    borderRadius: "999px",
    ...theme.barum.flex.center,

    "& .circle": {
      minHeight: "80px",
      maxHeight: "80px",
      minWidth: "80px",
      maxWidth: "80px",
      borderRadius: "999px",
      border: "2px dashed #BFBEB6",
    },
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

const RoutineError = () => {
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
        {errorType === "EMPTY_VANITY" && (
          <div className="icon">
            <div className="bar_1"></div>
            <div className="bar_2"></div>
            <div className="bar_3"></div>
          </div>
        )}
        {errorType !== "EMPTY_VANITY" && (
          <div className="icon-error">
            <div className="circle"></div>
          </div>
        )}

        <div>
          <p className="title">{errorType === "EMPTY_VANITY" ? "화장대를 먼저 채워주세요" : "루틴을 만들지 못했어요"}</p>
          <p className="sub">
            {errorType === "EMPTY_VANITY" ? "가지고 있는 제품을 알아야 오늘 바를 순서를 정할 수 있어요." : "연결이 불안정했어요. 잠시 후 다시 시도해 주세요."}
          </p>
        </div>
        <div className="button-box">
          {errorType === "EMPTY_VANITY" && <BarumBarButton clickFun={() => nav("/project/barum/makeup")}>화장대 보러 가기</BarumBarButton>}
          {errorType !== "EMPTY_VANITY" && <BarumBarButton clickFun={() => nav("/project/barum")}>돌아가기</BarumBarButton>}
        </div>
      </div>
    </BarumBasicLayout>
  );
};
export default RoutineError;
