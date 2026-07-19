/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPen, faPlus, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

import { useDeviceMode } from "@/hooks/useDeviceMode"; // 새로 지정된 훅 경로
import { foodMyReviewCPStyle, foodMyReviewCPDivStyle } from "./style"; // 변경된 스타일 함수
import { FoodButtonCP, FoodOutLineButtonCP, FoodTextAreaInputCP } from "@/features/food/components";
import { useInput } from "@/hooks/useInput";

const FoodMyReviewCPDiv = ({ rv }) => {
  const [content, onChangeContent, setContent] = useInput(rv.content);
  const [rating, setRating] = useState(Number(rv.rating));

  const [upDateMode, setUpdateMode] = useState(false);

  function formatDate(isoString) {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}. ${month}. ${day}`;
  }

  const formatted = formatDate(rv.createdAt); // "2024. 06. 10"

  const onUpdateReview = () => {
    if (!content.trim()) {
      return alert("리뷰 내용을 입력해주세요.");
    }
    if (content === rv.content) {
      return alert("변경된 내용이 없습니다.");
    }

    // JSON 데이터 생성
    const data = {
      content: content,
      rating: Number(Number(rating).toFixed(1)),
    };

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/review/${rv.id}`, data, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("리뷰가 수정되었습니다.");
          setUpdateMode(false);
          setContent(res.data.review.content);
          setRating(res.data.review.rating);
        } else {
          alert("리뷰 수정에 실패했습니다. 다시 시도해주세요.");
        }
      })
      .catch((err) => {
        console.error("리뷰 수정 중 오류 발생:", err);
        alert("리뷰 수정에 실패했습니다. 다시 시도해주세요.");
      });
  };

  const onDeleteReview = () => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/review/${rv.id}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            alert("리뷰가 삭제되었습니다.");
            window.location.reload(); // 페이지 새로고침
          } else {
            alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
          }
        })
        .catch((err) => {
          console.error("리뷰 삭제 중 오류 발생:", err);
          alert("리뷰 삭제에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  return (
    <div css={foodMyReviewCPDivStyle}>
      <p className="flexBetween">
        <span className="truckName">{rv.truckName}</span>
        <span>
          {upDateMode && (
            <FontAwesomeIcon
              icon={faMinus}
              className="actionIcons"
              onClick={() => {
                const changeData = rating - 0.5;
                if (changeData > 0) {
                  setRating(changeData);
                }
              }}
            />
          )}
          <span className="ratingBox">
            <FontAwesomeIcon icon={faStar} style={{ paddingRight: "0.5rem", color: "orange" }} />
            {rating || rv.rating}
          </span>
          {upDateMode && (
            <FontAwesomeIcon
              icon={faPlus}
              style={{ marginLeft: "1rem", cursor: "pointer" }}
              onClick={() => {
                const changeData = rating + 0.5;
                if (changeData <= 5) {
                  setRating(changeData);
                }
              }}
            />
          )}
        </span>
      </p>
      <div className="textAreaWrapper">
        <FoodTextAreaInputCP title="" value={content} onChangeHandler={onChangeContent} essential={false} maxRows={5} minRows={2} lock={!upDateMode} />
      </div>
      <p className="flexBetween">
        <span className="dateText">{formatted}</span>
        {!upDateMode && (
          <span>
            <FontAwesomeIcon icon={faPen} className="actionIcons" onClick={() => setUpdateMode(true)} />
            <FontAwesomeIcon icon={faTrash} className="deleteIcon" onClick={onDeleteReview} />
          </span>
        )}
        {upDateMode && (
          <span className="flexBetween buttonGroup">
            <span
              onClick={() => {
                setContent(rv.content);
                setRating(rv.rating);
                setUpdateMode(false);
              }}>
              <FoodOutLineButtonCP color={"#A47764"} borderColor={"--food-brown-light"}>
                취소
              </FoodOutLineButtonCP>
            </span>
            <span onClick={onUpdateReview}>
              <FoodButtonCP>저장</FoodButtonCP>
            </span>
          </span>
        )}
      </p>
    </div>
  );
};

const FoodMyReviewCP = () => {
  const { isPc } = useDeviceMode(); // 미디어 쿼리 훅 호출

  const [reviewList, setReviewList] = useState([]); // 리뷰 목록 상태

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/review/mine`, {
        withCredentials: true,
      })
      .then((res) => {
        // API가 배열을 직접 반환하므로 success 체크 없이 바로 사용
        if (Array.isArray(res.data)) {
          setReviewList(res.data);
          console.log(res.data);
        } else {
          console.error("예상하지 못한 응답 형식:", res.data);
          setReviewList([]);
        }
      })
      .catch((err) => {
        console.error("리뷰 목록 로드 중 오류 발생:", err);
        alert("리뷰 목록을 불러오는 데 실패했습니다.");
      });
  }, []);

  return (
    <section css={foodMyReviewCPStyle(isPc)}>
      <h2>내 리뷰</h2>
      <div>{reviewList.length === 0 ? <p>작성한 리뷰가 없습니다.</p> : reviewList.map((review) => <FoodMyReviewCPDiv key={review.id} rv={review} />)}</div>
    </section>
  );
};

export default FoodMyReviewCP;
