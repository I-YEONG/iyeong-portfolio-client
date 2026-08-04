import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import {
  FoodCard,
  FoodCardHeader,
  FoodCardTitle,
  FoodCardContent,
  FoodCardDescription,
  FoodCheckbox,
  FoodLabel,
  FoodInput,
  FoodOutLineButtonCP,
} from "@/features/food/components";
// import {
//   Select,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
//   SelectItem,
// } from "@/components/Foodui/Foodselect";
import { MapPin } from "lucide-react";

const locations = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

const daysOfWeek = [
  { id: 0, Foodlabel: "월요일" },
  { id: 1, Foodlabel: "화요일" },
  { id: 2, Foodlabel: "수요일" },
  { id: 3, Foodlabel: "목요일" },
  { id: 4, Foodlabel: "금요일" },
  { id: 5, Foodlabel: "토요일" },
  { id: 6, Foodlabel: "일요일" },
];

const FoodFTPositionInfoCP = ({ formData, setFormData, handleInputChange }) => {
  const [modalState, setModalState] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  /**
   * DaumPostcode에서 주소 선택 완료 시 해당 요일의 mapAddress 값 변경
   * @param {object} data - DaumPostcode에서 전달받은 주소 데이터
   */
  const onCompletePost = (data) => {
    setModalState(false);
    if (selectedDayIndex !== null) {
      handleScheduleChange(selectedDayIndex, "mapAddress", data.address);
    }
  };

  /** 주소 찾기 버튼 클릭 핸들러 추가 */
  const handleAddressSearch = (dayIndex) => {
    setSelectedDayIndex(dayIndex);
    setModalState(true);
  };

  /**
   * 특정 요일의 스케줄 정보를 업데이트
   * @param {*} dayIndex 0-6 (월-일)
   * @param {*} field 'holiday', 'start', 'end', 'mapAddress', 'userAddress'
   * @param {*} value 해당 필드에 설정할 값
   */
  const handleScheduleChange = (dayIndex, field, value) => {
    const newSchedule = [...formData.schedule];
    newSchedule[dayIndex] = {
      ...newSchedule[dayIndex],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      schedule: newSchedule,
    }));
  };

  /**
   * 최대 2자리 숫자만 입력받아 시간 포맷(00:00)으로 변환
   * @param {*} value 입력 받는 문자
   * @returns 포맷된 시간 스트링(00:00) 혹은 빈 문자열
   */
  const validateAndFormatTime = (value) => {
    // 숫자가 아닌 문자 제거
    const numbers = value.replace(/[^0-9]/g, "");
    // 2글자로 제한
    const limited = numbers.slice(0, 2);
    // 숫자로 변환하여 범위 체크 (0-24)
    const num = parseInt(limited, 10);
    if (isNaN(num) || num > 24) return "";

    return `${limited}:00`;
  };

  /** "00:00" 형식에서 앞의 숫자만 추출 */
  const getDisplayTime = (time) => {
    return time ? time.replace(/:00$/, "") : "";
  };

  /** 전화번호는 숫자만 입력되도록 처리 */
  const handlePhoneInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    handleInputChange("phone", value);
  };

  return (
    <FoodCard className="cards">
      <FoodCardHeader>
        <FoodCardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-brown-main" />
          <span>위치 정보</span>
        </FoodCardTitle>
        <FoodCardDescription>푸드트럭을 발견한 위치를 알려주세요</FoodCardDescription>
      </FoodCardHeader>
      <FoodCardContent className="space-y-4">
        <div className="space-y-4">
          <FoodLabel>요일별 운영 정보</FoodLabel>
          {daysOfWeek.map((day, index) => (
            <div key={day.id} className="p-4 space-y-2 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center w-32 space-x-4">
                  <span className="font-medium">{day.Foodlabel}</span>
                  <div className="flex items-center space-x-2">
                    <FoodCheckbox
                      className="border-solid border-brown-main data-[state=checked]:bg-brown-main"
                      id={`holiday-${day.id}`}
                      checked={formData.schedule[index]?.holiday}
                      onCheckedChange={(checked) => handleScheduleChange(index, "holiday", checked)}
                    />
                    <FoodLabel htmlFor={`holiday-${day.id}`}>휴무일</FoodLabel>
                  </div>
                </div>
                <div className="flex items-center flex-1 ml-8 space-x-2">
                  <FoodInput
                    type="text"
                    className="flex-1 border border-solid"
                    placeholder="영업 시작 시간 (ex: 09)"
                    value={getDisplayTime(formData.schedule[index]?.start)}
                    onChange={(e) => {
                      const formattedTime = validateAndFormatTime(e.target.value);
                      handleScheduleChange(index, "start", formattedTime);
                    }}
                    disabled={formData.schedule[index]?.holiday}
                    maxLength={2}
                  />
                  <span>~</span>
                  <FoodInput
                    type="text"
                    className="flex-1 border border-solid"
                    placeholder="영업 종료 시간 (ex: 18)"
                    value={getDisplayTime(formData.schedule[index]?.end)}
                    onChange={(e) => {
                      const formattedTime = validateAndFormatTime(e.target.value);
                      handleScheduleChange(index, "end", formattedTime);
                    }}
                    disabled={formData.schedule[index]?.holiday}
                    maxLength={2}
                  />
                </div>
              </div>

              <div className="flex justify-between item-center">
                <FoodOutLineButtonCP width="8rem" color="brown" onClick={() => handleAddressSearch(index)}>
                  주소 찾기
                </FoodOutLineButtonCP>
                <div className="flex flex-1 ml-8 space-x-6">
                  <FoodInput
                    className="flex-1 border border-solid"
                    placeholder="지도상 주소"
                    value={formData.schedule[index]?.mapAddress || ""}
                    onChange={(e) => handleScheduleChange(index, "mapAddress", e.target.value)}
                    disabled={formData.schedule[index]?.holiday}
                  />
                  <FoodInput
                    className="flex-1 border border-solid"
                    placeholder="사용자 안내용 주소"
                    value={formData.schedule[index]?.userAddress || ""}
                    onChange={(e) => handleScheduleChange(index, "userAddress", e.target.value)}
                    disabled={formData.schedule[index]?.holiday}
                  />
                </div>
              </div>
              {modalState && (
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    margin: 0,
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.1)",
                    zIndex: 10000,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => setModalState(false)}>
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "8px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      padding: 0,
                      zIndex: 10001,
                    }}
                    onClick={(e) => e.stopPropagation()}>
                    <DaumPostcode style={{ width: 400, height: 500 }} onComplete={onCompletePost} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div>
          <FoodLabel htmlFor="phone">연락처</FoodLabel>
          <FoodInput
            className="mt-2 border border-solid"
            id="phone"
            type="tel"
            placeholder="01012345678 (알고 있는 경우, 숫자만)"
            value={formData.phone}
            onChange={handlePhoneInput}
            maxLength={11}
          />
        </div>
      </FoodCardContent>
    </FoodCard>
  );
};
export default FoodFTPositionInfoCP;
