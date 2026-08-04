/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { foodFTListMainStyle } from "./style";

const FoodFTList = ({ data, isLogin }) => {
  // 오늘 요일 확인
  const today = (new Date().getDay() + 6) % 7; // 0:월~6:일
  const dayMap = ["월", "화", "수", "목", "금", "토", "일"];
  const todayKorean = dayMap[today];

  // 오늘 요일에 해당하는 스케줄 찾기
  const todaySchedule = data.schedule.find((sch) => sch.day === todayKorean);

  // 오늘 휴무인지 확인 (스케줄이 없거나 holiday가 true면 휴무)
  const isHolidayToday = !todaySchedule || todaySchedule.holiday;

  // 영업 상태 판단 함수
  const getBusinessStatus = () => {
    // 휴무일인 경우 (기존 !isHolidayToday 에서 로직 수정)
    if (!isHolidayToday) {
      return { status: "휴무", color: "#999" };
    }

    // 현재 시간 (HH:MM 형태)
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

    const startTime = todaySchedule.start;
    const endTime = todaySchedule.end;

    // 시간 비교를 위해 분으로 변환
    const timeToMinutes = (time) => {
      // "15" 형태와 "15:30" 형태 모두 처리
      const timeParts = time.split(":");
      const hours = parseInt(timeParts[0], 10);
      const minutes = timeParts.length > 1 ? parseInt(timeParts[1], 10) : 0; // 분이 없으면 0으로 처리
      return hours * 60 + minutes;
    };

    const currentMinutes = timeToMinutes(currentTime);
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    if (currentMinutes < startMinutes) {
      return { status: "준비", color: "#fba33e" };
    } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      return { status: "영업중", color: "#5dcd61" };
    } else {
      return { status: "영업종료", color: "var(--red)" };
    }
  };

  const avgRating = () => {
    if (data.review && data.review.length > 0) {
      const totalRating = data.review.reduce((sum, review) => sum + review.rating, 0);
      return (totalRating / data.review.length).toFixed(1); // 소수점 첫째 자리까지
    }
    return "리뷰 없음";
  };

  const businessInfo = getBusinessStatus();

  return (
    <li css={foodFTListMainStyle()}>
      <p className="foodFlexBetween">
        <span className="name">{data.name}</span>
        <span className="isHolidayToday" style={{ backgroundColor: businessInfo.color }}>
          {businessInfo.status}
        </span>
      </p>
      <p className="intro">{data.intro}</p>
      {/* 데이터 구조상 data.schedule[today]가 존재하지 않을 수 있으므로 안전한 접근 필요 */}
      <p>{data.schedule[today]?.userAddress}</p>
      <p className="foodFlexBetween" css={{ justifyContent: !isHolidayToday ? "end" : "space-between" }}>
        {isHolidayToday && (
          <span>
            {data.schedule[today]?.start}시 ~ {data.schedule[today]?.end}시
          </span>
        )}

        <span>
          {isLogin && data.like && (
            <span style={{ color: "var(--red)", paddingRight: "0.5rem" }}>
              <FontAwesomeIcon icon={faHeart} />
            </span>
          )}
          <FontAwesomeIcon icon={faStar} className="icon" /> {avgRating()}
        </span>
      </p>
    </li>
  );
};

export default FoodFTList;
