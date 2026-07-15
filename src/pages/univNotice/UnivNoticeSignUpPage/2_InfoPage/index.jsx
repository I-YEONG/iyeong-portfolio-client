import { useCallback, useState } from "react";
import "./style.css";
import { useEffect } from "react";
import "@/styles/univNotice.global.css";
import { useNavigate } from "react-router-dom";
import UnivNoticeLogoLayout from "@/layouts/univNotice/UnivNoticeLogoLayout";
import { UnivNoticeButtonCP, UnivNoticeSelectCP } from "@/features/univNotice/components";
import { useGetUnivNoticeQuery } from "@/features/univNotice/hooks/useGetUnivNoticeQuery";
import { useDeviceMode } from "@/hooks/useDeviceMode";

const UnivNoticeInfoPage = () => {
  const nav = useNavigate();
  const { isPc } = useDeviceMode();

  const { data: univList, isLoading: isUnivListLoading, isError: isUnivListError } = useGetUnivNoticeQuery("/school");

  // 학번
  // const [student_id, onChangeStudent_id, setStudent_id] = useInput("");

  // 0:로딩, 1: 학교선택, 2: 학과선택
  const [step, setStep] = useState(1);

  const [selectedUniv, setSelectedUniv] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const {
    data: departmentList,
    isLoading: isDepartmentListLoading,
    isError: isDepartmentListError,
  } = useGetUnivNoticeQuery(`/department/${selectedUniv}`, {
    enabled: !!selectedUniv,
  });

  const onChangeUniv = (value) => {
    setSelectedUniv(value);
    setSelectedDepartment(null);
    setStep(2);
  };

  const onChangeDepartment = (value) => {
    setSelectedDepartment(value);
    setStep(3);
  };

  // const loadSchoolData = useCallback(async () => {
  //   try {
  //     const data = await signupSchoolLoad();
  //     setUnivList(data || []);
  //     setStep(1);
  //   } catch (error) {
  //     console.error("학교 데이터 로드 오류:", error);
  //   }
  // }, []);

  // const loadDepartmentData = useCallback(async (schoolId) => {
  //   if (!schoolId) return;
  //   try {
  //     const data = await signupDepartmentLoad(schoolId);
  //     setDepartmentList(data || []);
  //     setStep(2);
  //   } catch (error) {
  //     console.error("학과 데이터 로드 오류:", error);
  //   }
  // }, []);

  const nextButtonClick = useCallback(() => {
    if (step !== 3) return;
    if (!selectedUniv || !selectedDepartment) return;

    localStorage.setItem("signupInfo", JSON.stringify({ school_id: selectedUniv, department_id: selectedDepartment }));

    if (window.confirm("학교·학과는 수정이 힘듭니다\n계속 진행하시겠습니까?")) {
      nav("/project/univnotice/signup/3");
    }
  }, [step, selectedUniv, selectedDepartment, nav]);

  return (
    <UnivNoticeLogoLayout>
      <section css={isPc ? { padding: "0 6rem" } : { padding: "0 3rem" }} className="infoPage univnoticeFlexCenter">
        {/* 중앙 */}
        <div className="univnoticeCenterBox">
          {/* 타이틀 */}
          <div className="univnoticeTitleBox">
            <h2 className="univnoticeTitle">
              <span className="bold">학교 정보</span>를 알려주세요!
            </h2>
            <h4 className="subTitle">학교 / 학과에 따라 설정 내용이 달라져요</h4>
          </div>
          {/* 인풋요소 */}
          <div className="univnoticeFlexCol" style={{ gap: "26px", width: "100%" }}>
            {step >= 1 && univList && (
              <div>
                <UnivNoticeSelectCP univnoticeTitle="학교" dataList={univList} value={selectedUniv} onChangeFunc={onChangeUniv} />
              </div>
            )}
            {step >= 2 && !isDepartmentListLoading && (
              <div>
                <UnivNoticeSelectCP univnoticeTitle="학과" dataList={departmentList} value={selectedDepartment} onChangeFunc={onChangeDepartment} />
              </div>
            )}
          </div>
          {/* 다음버튼 */}
          {step === 3 && (
            <div className="bottomItem" onClick={nextButtonClick}>
              <UnivNoticeButtonCP>다음</UnivNoticeButtonCP>
            </div>
          )}
        </div>
      </section>
    </UnivNoticeLogoLayout>
  );
};
export default UnivNoticeInfoPage;
