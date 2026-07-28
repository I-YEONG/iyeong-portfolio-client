import { useDeviceMode } from "@/hooks/useDeviceMode";
import { FoodMainLayOut } from "@/layouts";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { foodReportPageButtonStyle, foodReportPageMainStyle } from "./style";
import {
  FoodButtonCP,
  FoodCard,
  FoodCardContent,
  FoodCardDescription,
  FoodCardHeader,
  FoodCardTitle,
  FoodCheckbox,
  FoodFTInfoCP,
  FoodFTPositionInfoCP,
  FoodLabel,
  FoodOutLineButtonCP,
  FoodPhotoUploadCP,
} from "@/features/food/components";
import { Star, AlertCircle, Camera, CheckCircle } from "lucide-react";

const FoodReportPage = () => {
  const { isPc } = useDeviceMode();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    intro: "",
    menu: [], //등록된 메뉴들의 리스트 { num, name, price, info }
    menuNum: "", //현재 입력 중인 메뉴의 임시 값
    menuName: "",
    menuPrice: "",
    menuInfo: "",
    schedule: [
      { day: "월", holiday: false, start: "", end: "", mapAddress: "", userAddress: "" },
      { day: "화", holiday: false, start: "", end: "", mapAddress: "", userAddress: "" },
      { day: "수", holiday: false, start: "", end: "", mapAddress: "", userAddress: "" },
      { day: "목", holiday: false, start: "", end: "", mapAddress: "", userAddress: "" },
      { day: "금", holiday: false, start: "", end: "", mapAddress: "", userAddress: "" },
      { day: "토", holiday: false, start: "", end: "", mapAddress: "", userAddress: "" },
      { day: "일", holiday: false, start: "", end: "", mapAddress: "", userAddress: "" },
    ],
    phone: "",
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    photos: [],
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [firstErrorKey, setFirstErrorKey] = useState(null);

  // 에러 span refs
  const refs = {
    name: useRef(null),
    category: useRef(null),
    intro: useRef(null),
    menu: useRef(null),
    reporterName: useRef(null),
    reporterEmail: useRef(null),
    reporterPhone: useRef(null),
  };

  // errors 바뀔 때마다 첫 에러 위치로 스크롤
  useEffect(() => {
    if (firstErrorKey && refs[firstErrorKey]?.current) {
      setTimeout(() => {
        refs[firstErrorKey].current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [firstErrorKey]);

  // 에러 메시지
  const errorMessages = {
    name: "푸드트럭 이름(2글자 이상)을 입력해주세요.",
    category: "카테고리를 선택해주세요.",
    intro: "푸드트럭 설명글을 10글자 이상 입력해주세요.",
    menu: "메뉴를 1개 이상 등록해주세요.",
    schedule: "영업일과 시간을 정확히 입력해주세요.",
    location: "푸드트럭 위치를 선택해주세요.",
    mapAddress: "지도상 주소를 입력해주세요.",
  };

  /** 유효성 검사 함수들 */
  const validators = {
    name: (v) => v?.length > 1,
    category: (v) => v,
    intro: (v) => v?.length > 10,
    menu: (v) => v.length > 0,
    schedule: (scheduleArray) => {
      const hasOperatingDay = scheduleArray.some((day) => !day.holiday);
      if (!hasOperatingDay) return false;

      return scheduleArray.every((day) => {
        if (day.holiday) return true;
        return day.start && day.end && day.mapAddress && day.userAddress;
      });
    },
  };

  /** 인풋값 변경 핸들러 */
  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /** 폼 제출 핸들러 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};

    Object.entries(validators).forEach(([key, validate]) => {
      if (!validate(formData[key])) {
        errors[key] = errorMessages[key];
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setFirstErrorKey(Object.keys(errors)[0]);
      alert(Object.values(errors).join("\n"));
      return;
    }

    const requestData = {
      name: formData.name,
      category: formData.category,
      intro: formData.intro,
      menu: formData.menu,
      schedule: formData.schedule.map((day) => ({
        day: day.day,
        holiday: day.holiday,
        start: day.start,
        end: day.end,
        mapAddress: day.mapAddress,
        userAddress: day.userAddress,
      })),
    };

    const submissionData = new FormData();
    submissionData.append("request", new Blob([JSON.stringify(requestData)], { type: "application/json" }));

    if (formData.photos && formData.photos.length > 0) {
      formData.photos.forEach((file) => {
        submissionData.append("photos", file);
      });
    }

    // try {
    //   const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/report`, submissionData, { withCredentials: true });

    //   console.log("푸드트럭 제보 성공: ", res.data);
    //   alert("푸드트럭 제보가 성공적으로 접수되었습니다. 감사합니다!");
    // } catch (err) {
    //   console.error("푸드트럭 제보 중 오류 발생: ", err);
    //   alert("푸드트럭 제보 중 오류가 발생했습니다. 다시 시도해주세요.");
    // }
  };

  return (
    <FoodMainLayOut>
      <main css={foodReportPageMainStyle(isPc)}>
        <div className="flex flex-col gap-8 max-w-[1440px] mx-auto px-4 py-12 md:px-12 md:w-[75vw]">
          {/* 푸드트럭 제보 안내 카드 */}
          <FoodCard className="overflow-hidden border-solid shadow-lg border-brown-dark">
            <FoodCardHeader className="bg-white">
              <FoodCardTitle className="relative flex items-center space-x-2 text-brown-10">
                <div className="p-2 rounded-lg bg-brown-main">
                  <Star color="#a47764" className="w-5 h-5 text-white" />
                </div>
                <span>푸드트럭 제보 안내</span>
              </FoodCardTitle>
              <FoodCardDescription className="relative">새로운 푸드트럭을 발견하셨나요? 다른 사용자들과 정보를 공유해주세요!</FoodCardDescription>
            </FoodCardHeader>
            <FoodCardContent className="bg-white">
              <div className="grid gap-4 text-sm md:grid-cols-3">
                <div className="flex items-center p-3 space-x-2 border rounded-lg bg-brown-1 border-brown-2">
                  <div className="bg-brown-main p-1.5 rounded-full">
                    <AlertCircle color="#a47764" className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-brown-8">정확한 정보 입력</span>
                </div>
                <div className="flex items-center p-3 space-x-2 border rounded-lg bg-brown-1 border-brown-2">
                  <div className="bg-brown-main p-1.5 rounded-full">
                    <Camera color="#a47764" className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-brown-8">사진 첨부 권장</span>
                </div>
                <div className="flex items-center p-3 space-x-2 border rounded-lg bg-brown-1 border-brown-2">
                  <div className="bg-brown-main p-1.5 rounded-full">
                    <CheckCircle color="#a47764" className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-brown-8">1-2일 내 검토</span>
                </div>
              </div>
            </FoodCardContent>
          </FoodCard>

          {/* 푸드트럭 기본 정보 카드 */}
          <FoodFTInfoCP formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} errors={errors} ref={refs} />

          {/* 푸드트럭 위치 정보 카드 */}
          <FoodFTPositionInfoCP formData={formData} setFormData={setFormData} handleInputChange={handleInputChange} />

          {/* 사진 업로드 카드 */}
          <FoodPhotoUploadCP formData={formData} setFormData={setFormData} />

          <div className="p-6 cards">
            {/* 이용약관 */}
            <div className="flex gap-2">
              <FoodCheckbox
                className="border-solid border-brown-main data-[state=checked]:bg-brown-main"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleInputChange("agreeTerms", checked)}
              />
              <FoodLabel htmlFor="agreeTerms" className="cursor-pointer select-none">
                제보 내용이 사실임을 확인하며,{" "}
                <Link to="/terms">
                  <span className="text-brown-main">이용약관</span>
                </Link>
                에 동의합니다. *
              </FoodLabel>
            </div>

            {/* 주의사항 */}
            <div className="flex flex-col gap-2 p-4 border border-yellow-200 border-solid rounded-md bg-yellow-50">
              <div className="flex items-center gap-2">
                <AlertCircle color="#a47764" className="w-5 text-brown-main" />
                <h2 className="text-base font-medium text-brown-main">제보 시 주의사항</h2>
              </div>
              <div className="flex flex-col gap-1 pl-2 text-xs text-brown-main">
                <p>ㆍ허위 정보 제보 시 서비스 이용이 제한될 수 있습니다.</p>
                <p>ㆍ개인정보는 제보 검토 목적으로만 사용됩니다.</p>
                <p>ㆍ중복 제보는 자동으로 필터링됩니다.</p>
              </div>
            </div>

            {/* 제보버튼 */}
            <div css={foodReportPageButtonStyle()}>
              <FoodButtonCP disabled={!formData.agreeTerms} onClick={handleSubmit}>
                푸드트럭 제보하기
              </FoodButtonCP>
              <FoodOutLineButtonCP color="black">취소</FoodOutLineButtonCP>
            </div>
          </div>
        </div>
      </main>
    </FoodMainLayOut>
  );
};

export default FoodReportPage;
