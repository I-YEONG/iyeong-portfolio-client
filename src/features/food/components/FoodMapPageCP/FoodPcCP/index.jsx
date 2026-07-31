/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight, faHeart, faHouse, faLocationCrosshairs, faPen, faStar, faXmark, faBell as faBellSolid } from "@fortawesome/free-solid-svg-icons";
import { faBell as faBellRegular } from "@fortawesome/free-regular-svg-icons";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDeviceMode } from "@/hooks/useDeviceMode"; // 새로 지정해주신 훅으로 변경
import { foodPcCpMainStyle, foodPcCpButtonStyle, foodPcCpDetailsStyle } from "./style";
import { FoodFTList, FoodPcReviewCP } from "@/features/food/components";

/**
 * @param currentLocationButton 현재 위치 버튼 클릭 시 실행되는 함수
 * @returns
 */
const FoodPcCP = ({
  currentLocationButton,
  filter,
  onChangeFilter,
  categoryList,
  ftData,
  onClickRelay,
  onDeleteDetails,
  onSetDetails,
  details,
  onDetails,
  onDeleteLike,
  onAddLike,
  onDeleteSms,
  onAddSms,
  isLogin,
}) => {
  const nav = useNavigate();
  const today = (new Date().getDay() + 6) % 7; // 0:월~6:일
  const [onReview, setOnReview] = useState(false);

  // useDeviceMode를 통한 isPc 상태 가져오기
  const { isPc } = useDeviceMode();

  const detailAvgRating = useCallback(() => {
    if (details.review && details.review?.length > 0) {
      const totalRating = details.review.reduce((acc, review) => acc + review.rating, 0);
      return (totalRating / details.review?.length).toFixed(1); // 소수점 첫째 자리까지
    }
  }, [details]);

  useEffect(() => {
    const detailsElement = document.getElementById("details");
    if (detailsElement) {
      detailsElement.scrollTop = 0; // 내부 스크롤을 맨 위로 이동
    }
    setOnReview(false);
  }, [details]);

  const offReviewClick = () => {
    setOnReview(false);
  };

  // 배경 이미지용 URL 생성
  const currentImgUrl = details?.imageUrl ? `${details?.imageUrl}` : null;

  return (
    <section css={foodPcCpMainStyle(isPc)}>
      <section css={foodPcCpButtonStyle(isPc)}>
        {/* GPS */}
        <div className="gps foodFlexCenter" onClick={currentLocationButton}>
          <FontAwesomeIcon icon={faLocationCrosshairs} />
        </div>
        {/* 홈으로 이동 */}
        <div className="home foodFlexCenter" onClick={() => nav("/project/foodmap/")}>
          <FontAwesomeIcon icon={faHouse} />
        </div>
        {/* 새로고침 */}
        <div className="relay foodFlexCenter" onClick={onClickRelay}>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </div>
        {onReview && <FoodPcReviewCP offReviewClick={offReviewClick} isLogin={isLogin} details={details} />}
      </section>

      {/* 사이드 메뉴 */}
      <section className="sideMenu foodFlexCol">
        <h3 className="foodFlexBetween">
          분류{" "}
          <FontAwesomeIcon
            onClick={() => {
              nav("/project/foodmap");
            }}
            icon={faHouse}
            className="cursor-pointer"
          />
        </h3>
        <div>
          {/* 필터 */}
          <select id="category-filter" name="categoryFilter" className="filter" onChange={onChangeFilter} value={filter}>
            <option value="">필터 없음</option>
            {categoryList.map((category) => (
              <option key={category.value} value={category.value}>
                {category.data}
              </option>
            ))}
          </select>
        </div>
        <div className="marginTop"></div>
        <div>
          <h3>
            푸드트럭 목록 <span>클릭하여 자세히 보기</span>
          </h3>
          <ul>
            {ftData &&
              ftData
                .sort((a, b) => a.distance - b.distance) // 거리 순 오름차순 정렬
                .map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      onSetDetails({
                        name: item.name,
                        category: item.category,
                        intro: item.intro,
                        schedule: item.schedule,
                        menu: item.menu,
                        coords: item.coords,
                        review: item.review,
                        truckId: item.truckId,
                        like: item.like,
                        imageUrl: item.imageUrl,
                      });
                    }}>
                    <FoodFTList data={item} isLogin={isLogin} />
                  </div>
                ))}
          </ul>
        </div>
      </section>

      {onDetails && (
        <section css={foodPcCpDetailsStyle(isPc, currentImgUrl)} id="details">
          <p style={{ textAlign: "right", fontSize: "1.6rem" }}>
            <FontAwesomeIcon icon={faXmark} onClick={onDeleteDetails} className="icon" />
          </p>
          <div className="imageBox" style={{ marginBottom: "1rem" }}>
            {details.imageUrl && (
              <img
                src={currentImgUrl}
                alt="food truck detail"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            )}
          </div>
          <div style={{ minHeight: "100px" }}>
            <h3 className="name ">
              <span>{details.name}</span>
            </h3>
            <p className="intro">{details.intro}</p>
          </div>
          <p className="foodFlexBetween category review">
            <span className="category">{details.category}</span>
            <span className="foodFlexBetween">
              <FontAwesomeIcon
                icon={faHeart}
                style={{ marginRight: "1rem", color: details.like ? "var(--food-red)" : "lightgray", cursor: "pointer" }}
                onClick={() => {
                  if (details.like) {
                    onDeleteLike(details.truckId);
                  } else {
                    onAddLike(details.truckId);
                  }
                }}
              />

              <a href="#review" className="foodFlexCenter" style={{ textDecoration: "none", color: "inherit" }}>
                <FontAwesomeIcon icon={faStar} className="icon" /> {detailAvgRating() || "리뷰 없음"}
              </a>
            </span>
          </p>
          <div className="marginTop"></div>
          <h3>요일별 위치</h3>
          <ul className="schedule">
            {details.schedule.slice().map((schedule, index) => (
              <li
                key={index}
                style={{
                  color: !schedule.holiday ? "var(--food-red)" : index === today ? "var(--green-food-accent)" : "",
                }}>
                <span>
                  {!schedule.holiday ? <FontAwesomeIcon icon={faBellRegular} style={{ visibility: "hidden" }} /> : ""}
                  {!schedule.sms && schedule.holiday && (
                    <FontAwesomeIcon icon={faBellRegular} onClick={() => onAddSms(details.truckId, schedule.day)} style={{ cursor: "pointer" }} />
                  )}
                  {schedule.sms && schedule.holiday && (
                    <FontAwesomeIcon icon={faBellSolid} onClick={() => onDeleteSms(details.truckId, schedule.day)} style={{ cursor: "pointer" }} />
                  )}
                </span>
                <span>{schedule.day}요일</span>
                <span>{!schedule.holiday ? "휴일" : `${schedule.start}시 ~ ${schedule.end}시`}</span>
                <span>{!schedule.holiday ? "" : `${schedule.userAddress}`}</span>
              </li>
            ))}
          </ul>
          <div className="marginTop"></div>

          <h3>메뉴</h3>
          <ul className="menuList">
            {details.menu
              .slice()
              .sort((a, b) => a.num - b.num)
              .map((menuItem, index) => (
                <li key={index}>
                  <p className="foodFlexBetween">
                    <span>{menuItem.name}</span>
                    <span>{menuItem.price.toLocaleString()}원</span>
                  </p>
                  <p>{menuItem.info}</p>
                </li>
              ))}
          </ul>

          <div className="marginTop"></div>

          <h3 id="review" className="foodFlexBetween">
            리뷰
            <span onClick={() => setOnReview(true)} style={{ fontSize: "0.9rem", color: "var(--food-gray-5)", cursor: "pointer" }}>
              <FontAwesomeIcon icon={faPen} />
            </span>
          </h3>
          {details.review?.length === 0 && (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              <p>리뷰가 없습니다.</p>
            </div>
          )}
          {details.review?.length > 0 && (
            <ul style={{ borderTop: "1px solid var(--food-gray-2)" }}>
              {details.review.slice().map((review, index) => (
                <li key={index} className="reviewItem">
                  <p className="foodFlexBetween">
                    <span>{review.userName}</span>
                    <span>
                      <FontAwesomeIcon icon={faStar} className="icon" /> {review.rating}
                    </span>
                  </p>
                  <TextareaAutosize
                    minRows={1}
                    maxRows={5}
                    value={review.content}
                    style={{
                      width: "100%",
                      fontFamily: "Noto Sans KR",
                      resize: "none",
                      pointerEvents: "none",
                    }}
                    readOnly
                    tabIndex={-1}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </section>
  );
};

export default FoodPcCP;
