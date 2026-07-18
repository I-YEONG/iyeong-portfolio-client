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

    const data = {
      truckId: details.truckId,
      content: reviewText,
      rating: Number(Number(rating).toFixed(1)),
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/review`, data, { withCredentials: true })
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          setReviewText("");
          setRating(5);
        } else {
          alert("리뷰 작성에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((err) => {
        console.error("리뷰 작성 중 오류 발생:", err);
        alert("리뷰 작성에 실패했습니다. 다시 시도해주세요.");
      });
  }, [reviewText, rating, isLogin, details.truckId, setReviewText]);

  return (
    <div css={foodPcReviewCPMainStyle(isPc)} className="flexCenter">
      <span style={{ position: "absolute", top: "1rem", right: "1rem" }}>
        <FontAwesomeIcon icon={faXmark} onClick={offReviewClick} className="closeIcon" />
      </span>
      <span style={{ position: "absolute", bottom: "1rem", right: "1rem", fontSize: "0.7rem", color: "gray" }}>수정 및 삭제는 마이페이지에서 가능합니다</span>
      <div className="flexBetweenCol">
        <div>
          <p>
            <span>'{details.name}'</span>에
          </p>
          <p>리뷰를 작성합니다</p>
        </div>
        <div className="flexBetween flexHeightCenter starDiv">
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
