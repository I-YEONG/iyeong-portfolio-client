/** @jsxImportSource @emotion/react */
import { useCallback } from "react";
import axios from "axios";
import { useDeviceMode } from "@/hooks/useDeviceMode"; // 새로 지정된 훅 경로
import FoodMyLikeLiCP from "./FoodMyLikeLiCP"; // 변경된 자식 컴포넌트 이름
import { foodMyLikeCPStyle } from "./style"; // 변경된 스타일 함수
import { useAuth } from "@/hooks/useAuth";

// likeList, smsList를 props로 받음
const FoodMyLikeCP = ({ likeList = [] }) => {
  const { isLogin } = useAuth();
  const { isPc } = useDeviceMode(); // 미디어 쿼리 상태 가져오기

  console.log(likeList);

  // 좋아요 삭제
  const onDeleteLike = useCallback(
    (ftId) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId) {
        console.error("푸드트럭 ID가 없습니다.");
        return;
      }
      axios
        .delete(`${import.meta.env.VITE_API_URL}/map/ft/like?truckId=${ftId}`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error("취소 실패:", err);
          alert("취소에 실패했습니다.");
        });
    },
    [isLogin],
  );

  // 알림 추가
  const onAddSms = useCallback(
    (ftId, day) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId || !day) {
        console.error("푸드트럭 ID 또는 요일이 없습니다.");
        return;
      }
      axios
        .post(`${import.meta.env.VITE_API_URL}/map/ft/sms?truckId=${ftId}&day=${day}`, null, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error("알림 등록 실패:", err);
          alert("알림 등록에 실패했습니다.");
        });
    },
    [isLogin],
  );

  // 알림 삭제
  const onDeleteSms = useCallback(
    (ftId, day) => {
      if (!isLogin) return alert("로그인 후 이용해주세요.");
      if (!ftId || !day) {
        console.error("푸드트럭 ID 또는 요일이 없습니다.");
        return;
      }
      axios
        .delete(`${import.meta.env.VITE_API_URL}/map/ft/sms?truckId=${ftId}&day=${day}`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error("알림 취소 실패:", err);
          alert("알림 취소에 실패했습니다.");
        });
    },
    [isLogin],
  );

  console.log(likeList);

  return (
    <section css={foodMyLikeCPStyle(isPc)}>
      <h2>알림/찜 목록</h2>
      <ul>
        {likeList && likeList.length > 0 ? (
          likeList.map((ft, index) => {
            return <FoodMyLikeLiCP key={index} ft={ft} ftId={ft.truckId} onDeleteLike={onDeleteLike} onDeleteSms={onDeleteSms} onAddSms={onAddSms} />;
          })
        ) : (
          <li>찜한 푸드트럭이 없습니다.</li>
        )}
      </ul>
    </section>
  );
};

export default FoodMyLikeCP;
