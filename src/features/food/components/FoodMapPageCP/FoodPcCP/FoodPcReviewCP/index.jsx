/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useState } from "react";
import { foodPcReviewCPMainStyle } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarSolid, faStarHalf, faPlus, faMinus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useInput } from "@/hooks/useInput";
import { FoodButtonCP, FoodTextAreaInputCP } from "@/features/food/components";

const FoodPcReviewCP = ({ isLogin, offReviewClick, details }) => {
  const [reviewText, onChangeReviewText, setReviewText] = useInput("");
  const [rating, setRating] = useState(5);

  // useDeviceMode를 통한 isPc 상태 가져오기
  const { isPc } = useDeviceMode();

  useEffect(() => {
    setReviewText("");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRating(5);
  }, [details, setReviewText]);

  const onIncreaseRating = () => {
    setRating((prev) => (prev < 5 ? +(prev + 0.5).toFixed(1) : 5));
  };

  const onDecreaseRating = () => {
    setRating((prev) => (prev > 0.5 ? +(prev - 0.5).toFixed(1) : 0.5));
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FontAwesomeIcon icon={faStarSolid} key={i} className="starIcon" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FontAwesomeIcon icon={faStarHalf} key={i} className="starIcon" />);
    } else {
      stars.push(<FontAwesomeIcon icon={faStar} className="starIcon" key={i} style={{ visibility: "hidden" }} />);
    }
  }

  const onPostReview = useCallback(() => {
    if (!isLogin) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!reviewText.trim()) {
      return alert("리뷰 내용을 입력해주세요.");
    }

    // 1) 새로 작성된 리뷰 객체 생성 (PC / 모바일 호환을 위해 userName, nickName 모두 포함)
    const newReview = {
      userName: "방문자",
      nickName: "방문자님",
      rating: Number(Number(rating).toFixed(1)),
      content: reviewText,
      createdAt: new Date().toISOString(),
    };

    // 2) details.review 배열 앞에 새 리뷰 추가 (DOM에 즉시 반영)
    if (details && details.review) {
      details.review.unshift(newReview);
    } else if (details) {
      details.review = [newReview];
    }

    // 3) 정상 처리 UI 피드백
    alert("리뷰가 성공적으로 등록되었습니다.");
    setReviewText("");
    setRating(5);
    if (offReviewClick) {
      offReviewClick(); // 리뷰 창 닫기
    }
  }, [reviewText, rating, isLogin, details, setReviewText, offReviewClick]);

  return (
    <div css={foodPcReviewCPMainStyle(isPc)} className="foodFlexCenter">
      <span style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <FontAwesomeIcon icon={faXmark} onClick={offReviewClick} className="closeIcon" />
      </span>
      <span style={{ position: "absolute", bottom: "1rem", right: "1rem", fontSize: "0.7rem", color: "gray" }}>수정 및 삭제는 마이페이지에서 가능합니다</span>
      <div className="foodFlexBetweenCol">
        <div>
          <p>
            <span>'{details.name}'</span>에
          </p>
          <p>리뷰를 작성합니다</p>
        </div>
        <div className="foodFlexBetween foodFlexHeightCenter starDiv">
          <span className="starControllerIcon" onClick={onDecreaseRating} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faMinus} />
          </span>
          <span className="starSpan">{stars}</span>
          <span className="starControllerIcon" onClick={onIncreaseRating} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
        <div className="textAreaDiv">
          <FoodTextAreaInputCP title="" essential={false} onChangeHandler={onChangeReviewText} value={reviewText} maxRows={5} minRows={2} />
        </div>
        <div onClick={onPostReview}>
          <FoodButtonCP>작성</FoodButtonCP>
        </div>
      </div>
    </div>
  );
};

export default FoodPcReviewCP;
