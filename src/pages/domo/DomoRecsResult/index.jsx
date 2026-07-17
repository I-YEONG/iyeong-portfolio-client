import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Resizable } from "re-resizable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faMugHot, faUtensils, faXmark } from "@fortawesome/free-solid-svg-icons";

import { DomoPcHeader } from "@/layouts";
import { DomoBoxButton, DomoModal, DomoModalLoading, DomoNaverMap, DomoPopover } from "@/features/domo/components";
import { domoRecsResultStyle } from "./style";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useGetDomoQuery } from "@/features/domo/hooks/useGetDomoQuery";

const DomoRecsResult = () => {
  const { data, isLoading, isError } = useGetDomoQuery(`/result`, {
    // enabled: !!selectedUniv,
  });

  const [recommendations, setRecommendations] = useState([]);
  const [popoverData, setPopoverData] = useState(null);
  const [panelHeight, setPanelHeight] = useState(40);
  const resizableRef = useRef();
  const { isPc } = useDeviceMode();

  // 1. 초기 렌더링 시 에러가 나지 않도록 기본 좌표를 주거나 비워둡니다.
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  // 임시저장데이터 전체
  const [tempDatas, setTempDatas] = useState();
  // 임시저장 데이터
  const [tempData, setTempData] = useState();
  // 사용자 동의 구하는 모달창
  const [agreeModal, setAgreeModal] = useState(false);

  const nav = useNavigate();

  // 2. 데이터를 받아왔을 때 recommendations와 center를 함께 업데이트해 줍니다.
  useEffect(() => {
    if (isLoading || isError || !data) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecommendations(data);

    // 데이터가 존재할 경우 첫 번째 장소로 중심 좌표 설정
    if (data.length > 0) {
      setCenter({ lat: data[0].lat, lng: data[0].lng });
    }
  }, [data, isLoading, isError]);

  // 3. 상단에 이미 예외 처리 UI가 있으므로 이것만 남겨둡니다.
  if (!isLoading && recommendations.length === 0) {
    return (
      <>
        <div className="recsResult_fallback">
          <p>추천 정보를 불러오지 못했습니다.</p>
          <button onClick={() => nav("/recs/info")}>다시 추천받기</button>
        </div>
      </>
    );
  }

  const handleTogglePopover = (rec, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverData({
      rec: rec,
      position: {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
      },
    });
  };

  const handleClosePopover = () => {
    setPopoverData(null);
  };

  // 결정하기 핸들러 함수
  const onSaveToNextHandler = () => {
    if (window.confirm("다음으로 넘어가면 수정이 불가능합니다.\n넘어가시겠습니까?")) {
      nav("/project/domo/recs/save", { state: { recommendations } });
    }
  };

  // 다시 찾기
  const onClickRecommend = async () => {
    // ... 기존 코드 유지
  };

  // 교체 확인
  const onClickReplace = () => {
    onChangeRecommendations();
    setRecommendations(tempDatas);
    setTempData(null);
    setAgreeModal(false);
  };

  // 삭제하기
  const onClickDelete = (data) => {
    if (recommendations.length === 1) {
      handleClosePopover();
      return alert("하나 이상의 값이 존재해야 합니다.");
    }
    onChangeRecommendations();
    const newRecs = recommendations.filter((r) => r.placeId !== data.placeId);
    setRecommendations((prev) => {
      if (prev.length !== 1) {
        return newRecs;
      }
    });
    handleClosePopover();
  };

  // 되돌리기 데이터 저장
  const onChangeRecommendations = () => {
    const r1 = localStorage.getItem("r-1");
    const r2 = localStorage.getItem("r-2");

    localStorage.setItem("r-3", r2 ?? "null");
    localStorage.setItem("r-2", r1 ?? "null");
    localStorage.setItem("r-1", JSON.stringify(recommendations));
  };

  // 되돌리기
  const onChangeReverse = () => {
    const r1 = JSON.parse(localStorage.getItem("r-1"));
    const r2 = JSON.parse(localStorage.getItem("r-2"));
    const r3 = JSON.parse(localStorage.getItem("r-3"));

    if (r1) {
      setRecommendations(r1);
      localStorage.setItem("r-1", JSON.stringify(r2));
      localStorage.setItem("r-2", JSON.stringify(r3));
      localStorage.setItem("r-3", null);
    } else {
      alert("더 이상 되돌릴 수 없습니다.");
    }
  };

  const onClickModal = (rec) => {
    setModalData(rec);
    setIsModal(true);
  };

  return (
    <div className="recsResultPageMain" css={domoRecsResultStyle(isPc)}>
      {isPc && <DomoPcHeader />}
      {isLoading && <DomoModalLoading />}
      {isModal && !isLoading && (
        <DomoModal>
          <div className="modal_content_">
            {/* 배너 */}
            <div>
              <p>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => {
                    setModalData(null);
                    setIsModal(false);
                  }}
                  className="icon"
                />
              </p>
              <div>
                {modalData.category === "음식점" && <FontAwesomeIcon icon={faUtensils} />}
                {modalData.category === "놀거리" && <FontAwesomeIcon icon={faGamepad} />}
                {modalData.category === "카페" && <FontAwesomeIcon icon={faMugHot} />}
              </div>
            </div>

            {/* 내용 */}
            <div>
              <p>{modalData.name}</p>
              <p>{modalData.address}</p>
              {modalData.benefit && <p>{modalData.benefit}</p>}
            </div>
            <div>
              <a href={`https://map.naver.com/p/search/${modalData.address} ${modalData.name}`} target="_blank" rel="noopener noreferrer">
                <DomoBoxButton padding="0 24px" bgColor="--domo-main-color" color="--black-0">
                  자세히 보기
                </DomoBoxButton>
              </a>
            </div>
          </div>
        </DomoModal>
      )}

      {agreeModal && (
        <DomoModal>
          <div className="modal_content_2">
            <p>
              기존 장소와 새로운 장소의 이동거리 차이가
              <br />
              <span style={{ color: "var(--domo-main-color)" }}>
                {tempData && Math.abs(tempData.oldDistance - tempData.newDistance) < 1
                  ? "별로 없어요!"
                  : tempData &&
                    `${tempData.newDistance - tempData.oldDistance > 0 ? "+" : "-"}${Math.abs(tempData.newDistance - tempData.oldDistance).toFixed(0)}m`}
              </span>
              {tempData && Math.abs(tempData.oldDistance - tempData.newDistance) >= 1 && "변화가 생겨요!"}
            </p>
            <div>
              <div className="item_img flexCenter">
                {tempData.newData.category === "음식점" && <FontAwesomeIcon icon={faUtensils} />}
                {tempData.newData.category === "놀거리" && <FontAwesomeIcon icon={faGamepad} />}
                {tempData.newData.category === "카페" && <FontAwesomeIcon icon={faMugHot} />}
              </div>
              <div className="item_info">
                <p className="item_name">{tempData.newData.name}</p>
                <p className="item_address">{tempData.newData.address}</p>
                {tempData.newData.benefit && <p className="item_benefit">{tempData.newData.benefit}</p>}
              </div>
            </div>
            <div className="flexBetween">
              <div
                onClick={() => {
                  setTempData(null);
                  setTempDatas(null);
                  setAgreeModal(false);
                }}
                className="flexCenter">
                취소하기
              </div>
              <div
                onClick={() => {
                  onClickReplace();
                }}
                className="flexCenter">
                변경하기
              </div>
            </div>
          </div>
        </DomoModal>
      )}

      {isPc && (
        <section className="recsResultPage">
          <div className="recsResult_list">
            <div className="recsResult_header">
              <button onClick={() => nav(-1)} className="recsResult_back-button">
                <ChevronLeft size={28} color="#B7BBCF" />
                <span className="logo-text">DOMO</span>
              </button>
            </div>
            <div className="list_header">
              <p className="list_header_title">
                오늘의 <span>놀거리</span>를
                <br />
                모아왔어요!
              </p>
              <button onClick={onChangeReverse} className="list_header_backBtn flexCenter">
                되돌리기
              </button>
            </div>
            <ul className="list_items">
              {recommendations &&
                recommendations?.map((rec, index) => (
                  <li
                    key={rec.id}
                    onClick={() => {
                      setCenter({ lat: rec.lat, lng: rec.lng });
                    }}
                    className="list_item">
                    <div className="item_number">{index + 1}</div>
                    <div className="item_card">
                      <div
                        className="item_content"
                        onClick={() => {
                          onClickModal(rec);
                        }}>
                        <div className="item_img flexCenter">
                          {rec.category === "음식점" && <FontAwesomeIcon icon={faUtensils} />}
                          {rec.category === "놀거리" && <FontAwesomeIcon icon={faGamepad} />}
                          {rec.category === "카페" && <FontAwesomeIcon icon={faMugHot} />}
                        </div>
                        <div className="item_info">
                          <p className="item_name">{rec.name}</p>
                          <p className="item_address">{rec.address}</p>
                          {rec.benefit && <span className="item_benefit">{rec.benefit}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="item_dots" onClick={(event) => handleTogglePopover(rec, event)}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </li>
                ))}
            </ul>
            <div className="list_footer">
              <button className="list_footer-btn" onClick={onSaveToNextHandler}>
                결정하기
              </button>
            </div>
          </div>

          {/* naver map */}
          <div className="recsResult_map">
            <DomoNaverMap center={center} recommendations={recommendations} />
          </div>

          {/* 팝업 */}
          {popoverData && (
            <DomoPopover onClose={handleClosePopover} position={popoverData.position}>
              <div className="popover_item_options">
                <button
                  onClick={() => {
                    onClickRecommend(popoverData.rec);
                  }}>
                  다시 추천
                </button>
                <div className="pop-line"></div>
                <button onClick={() => onClickDelete(popoverData.rec)}>삭제하기</button>
              </div>
            </DomoPopover>
          )}
        </section>
      )}
      {!isPc && (
        <section className={`isMobile`}>
          <div className="recsResult_header">
            <div className="recsResult_header">
              <button onClick={() => nav(-1)} className="recsResult_back-button">
                <ChevronLeft size={28} color="#B7BBCF" />
                <span className="logo-text">DOMO</span>
              </button>
            </div>
          </div>
          <div className="recsResult_resizable">
            <Resizable
              ref={resizableRef} // 리사이즈 컴포넌트에 ref 연결 (필요시 외부에서 접근)
              size={{ width: "100%", height: `${panelHeight}%` }} // 프로젝트 뷰어 높이 기준 비율로 크기 제어
              minHeight="20%" // 프로젝트 뷰어 높이의 최소 20%
              maxHeight="80%" // 프로젝트 뷰어 높이의 최대 80%
              enable={{
                top: true, // 상단만 드래그로 리사이즈 가능
                right: false,
                bottom: false,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              handleStyles={{
                top: {
                  height: "16px", // 리사이즈 핸들 높이
                  cursor: "ns-resize", // 마우스 커서 모양(상하 리사이즈)
                  margin: "12px auto",
                },
              }}
              onResizeStop={(_e, _direction, ref) => {
                const parentHeight = ref?.parentElement?.clientHeight ?? 0;
                if (!parentHeight) return;

                const nextHeight = Math.round((ref.offsetHeight / parentHeight) * 100);
                setPanelHeight(Math.min(80, Math.max(20, nextHeight)));
              }}>
              <div className="recsResult_resizable_controller"></div>

              <div className="recsResult_list">
                <div className="list_header">
                  <p className="list_header_title">
                    오늘의 <span>놀거리</span>를
                    <br />
                    모아왔어요!
                  </p>
                  <button onClick={onChangeReverse} className="list_header_backBtn flexCenter">
                    되돌리기
                  </button>
                </div>
                <ul className="list_items">
                  {recommendations &&
                    recommendations?.map((rec, index) => (
                      <li
                        key={rec.id}
                        onClick={() => {
                          setCenter({ lat: rec.lat, lng: rec.lng });
                        }}
                        className="list_item">
                        <div className="item_number">{index + 1}</div>
                        <div className="item_card">
                          <div
                            className="item_content"
                            onClick={() => {
                              onClickModal(rec);
                            }}>
                            <div className="item_img">
                              {rec.category === "음식점" && <FontAwesomeIcon icon={faUtensils} />}
                              {rec.category === "놀거리" && <FontAwesomeIcon icon={faGamepad} />}
                              {rec.category === "카페" && <FontAwesomeIcon icon={faMugHot} />}
                            </div>
                            <div className="item_info">
                              <p className="item_name">{rec.name}</p>
                              <p className="item_address">{rec.address}</p>
                              {rec.benefit && <span className="item_benefit">{rec.benefit}</span>}
                            </div>
                          </div>
                        </div>

                        <div className="item_dots" onClick={(event) => handleTogglePopover(rec, event)}>
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </li>
                    ))}
                </ul>
                {/* 팝업 */}
                {popoverData && (
                  <DomoPopover onClose={handleClosePopover} position={popoverData.position}>
                    <div className="popover_item_options">
                      <button
                        onClick={() => {
                          onClickRecommend(popoverData.rec);
                        }}>
                        다시 추천
                      </button>
                      <div className="pop-line"></div>
                      <button onClick={() => onClickDelete(popoverData.rec)}>삭제하기</button>
                    </div>
                  </DomoPopover>
                )}
              </div>
            </Resizable>
          </div>
          <button className="list_footer-btn" onClick={onSaveToNextHandler}>
            결정하기
          </button>

          {/* naver map */}
          <div className="recsResult_map">
            <DomoNaverMap center={center} recommendations={recommendations} />
          </div>
        </section>
      )}
    </div>
  );
};

export default DomoRecsResult;
