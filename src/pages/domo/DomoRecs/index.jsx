import { useCallback, useEffect, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { domoRecsPageStyle } from "./style";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { DomoMobileHeader, DomoPcHeader } from "@/layouts";
import { DomoBoxButton, DomoModal } from "@/features/domo/components";

const DomoRecs = () => {
  // 1. 기본적으로 gps는 허용하지 않음 (false)
  const [gpsAgree, setGpsAgree] = useState(false);
  // 2. 초기 접속 시 무조건 권한 요청 모달이 표시되도록 (true)
  const [onGpsAgree, setOnGpsAgree] = useState(true);

  const nav = useNavigate();

  /* * 기존에 있던 navigator.permissions 검사 로직 및
   * setInterval을 이용한 주기적 검사 로직(useEffect 2개)은 모두 삭제합니다.
   */

  // 3. 실제 GPS 권한 요청 API 제거 -> 단순 체크박스 토글 기능으로 대체
  const onClickAgree = useCallback(() => {
    setGpsAgree((prev) => !prev);
  }, []);

  // 4. gps 동의(체크) 후 '다음' 버튼 클릭 시 모달 닫기
  const onClickAgreeNext = useCallback(() => {
    if (gpsAgree) {
      setOnGpsAgree(false); // 동의했으므로 모달 숨김
    } else {
      alert("위치 정보 수집 및 이용에 동의해 주세요.");
    }
  }, [gpsAgree]);
  const { isPc } = useDeviceMode();
  return (
    <section className="recsPage DomoFlexCenter" css={domoRecsPageStyle(isPc)}>
      {isPc && <DomoPcHeader />}
      {!isPc && <DomoMobileHeader />}
      {/* 위치수집 및 이용동의 */}
      {onGpsAgree && (
        <DomoModal>
          <div>
            원활한 서비스 이용을 위해선
            <br />
            아래 항목에 대한 동의가 필요해요.
          </div>
          <div className="DomoFlexHeightCenter">
            <div onClick={onClickAgree} className={`DomoFlexCenter ${gpsAgree ? "checked" : "none"}`}>
              <FontAwesomeIcon icon={faCheck} className={`recsPage_checkIcon `} />
            </div>
            <span>사용자의 위치 정보 수집 및 이용에 동의합니다.</span>
          </div>
          <div className="NextButton">
            <DomoBoxButton onClickHandler={onClickAgreeNext} bgColor="--black-3">
              다음
            </DomoBoxButton>
          </div>
        </DomoModal>
      )}

      <section className="DomoFlexCenter content">
        <div className="">
          <h2>
            잠깐! 아직도 오늘
            <br />뭘 하면 좋을지 못 정하셨나요?
          </h2>
          <p>
            걱정하지 마세요!
            <br />딱 5초만에 도모가 당신을 <span className="point">도</span>와 일정을 <span className="point">모</span>아줄게요.
            <br />
            지금 바로 도모의 AI가 당신의 하루를 멋지게 완성할 거예요.
          </p>
          <div className="image">{/* 이미지 */}</div>
          <div className="button" onClick={() => nav("/project/domo/recs/info")}>
            <DomoBoxButton>도모와 함께 우리 동네 놀거리 찾기</DomoBoxButton>
          </div>
        </div>
      </section>

      {/* 배경 */}
      <div className="recsPage_circle1"></div>
      <div className="recsPage_circle2"></div>
      <div className="recsPage_circle_move"></div>
    </section>
  );
};
export default DomoRecs;
