import { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useInput } from "@/hooks/useInput";
import { DomoMobileHeader, DomoPcHeader } from "@/layouts";
import { DomoBoxButton, DomoInput, DomoRecsLoading } from "@/features/domo/components";
import { domoRecsInfoStyle } from "./style";
import { domoRecsPageStyle } from "../DomoRecs/style";
import "@/styles/domo.global.css";

const DomoRecsInfo = () => {
  // 주소
  const [modalState, setModalState] = useState(false);
  const [address, setAddress] = useState("");

  // 예산
  const [budgetStart, onChangeBudgetStart, setBudgetStart] = useInput("");
  const [budgetEnd, onChangeBudgetEnd, setBudgetEnd] = useInput("");

  // 즐기고 싶은 것
  const [subject, setSubject] = useState([]);

  // 로딩
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  /**
   * 있으면 배열에 추가, 없으면 제거
   */
  const onChangeSubject = (value) => {
    if (subject.includes(value)) {
      setSubject(subject.filter((item) => item !== value));
      return;
    }
    setSubject([...subject, value]);
  };

  /**
   * budgetStart에서 숫자가 아닌 값이 있으면 제거
   */
  useEffect(() => {
    if (budgetStart && /[^0-9]/.test(budgetStart)) {
      const onlyNumber = budgetStart.replace(/[^0-9]/g, "");
      setBudgetStart(onlyNumber);
    }
  }, [budgetStart]);

  /**
   * budgetEnd 숫자가 아닌 값이 있으면 제거
   */
  useEffect(() => {
    if (budgetEnd && /[^0-9]/.test(budgetEnd)) {
      const onlyNumber = budgetEnd.replace(/[^0-9]/g, "");
      setBudgetEnd(onlyNumber);
    }
  }, [budgetEnd]);

  /**
   * 주소찾기 버튼 클릭 시 모달 오픈 및 선택 요일 인덱스 저장
   */
  const onClickFindAddress = () => {
    setModalState(true);
  };

  /**
   * DaumPostcode에서 주소 선택 완료 시 해당 요일의 mapAddress 값 변경
   * @param {object} data - DaumPostcode에서 전달받은 주소 데이터
   */
  const onCompletePost = (data) => {
    setModalState(false);
    setAddress(data.address);
  };

  const onClickGetRecs = async () => {
    if (!address) {
      alert("주소를 입력해주세요.");
      return;
    }
    if (!budgetStart || !budgetEnd) {
      alert("예산을 입력해주세요.");
      return;
    }
    if (parseInt(budgetStart, 10) > parseInt(budgetEnd, 10)) {
      alert("예산의 시작 값이 끝값보다 클 수 없습니다.");
      return;
    }

    if (parseInt(budgetStart, 10) < 0 || parseInt(budgetEnd, 10) < 0) {
      alert("예산은 0원 이상으로 입력해주세요.");
      return;
    }
    if (parseInt(budgetStart, 10) < 10000) {
      alert("시작 예산은 10000원 이상으로 입력해주세요.");
      return;
    }
    if (subject.length === 0) {
      alert("키워드를 선택해주세요.");
      return;
    }
    // const userGps = await addressToCoords(address);
    // const infoData = {
    //   address: address,
    //   userLat: userGps.lat,
    //   userLng: userGps.lng,
    //   budgetStart: budgetStart,
    //   budgetEnd: budgetEnd,
    //   subject: subject,
    // };
    // localStorage.setItem("recsInfo", JSON.stringify(infoData));

    setLoading(true);

    setTimeout(() => {
      nav("/project/domo/recs/result");
    }, 2000);
  };

  const { isPc } = useDeviceMode();

  return (
    <section className="recsInfoPage recsPage" css={[domoRecsInfoStyle(isPc), domoRecsPageStyle(isPc)]}>
      {isPc ? <DomoPcHeader /> : <DomoMobileHeader />}
      {/* 메인 */}
      <section className="context DomoFlexCol" style={{ overflowY: loading ? "hidden" : "auto" }}>
        {/* 로딩 */}
        {loading && <DomoRecsLoading />}
        <div>
          <p>현재 위치를 적어주세요.</p>
          <div>
            <div>
              <DomoInput value={address} ex="주소 찾기를 눌러주세요" lock={true} />
            </div>
            <div className="DomoFlexCenter" onClick={onClickFindAddress}>
              주소 찾기
            </div>
          </div>
        </div>
        <div>
          <p>오늘의 예산을 입력해주세요.</p>
          <div>
            <div>
              <DomoInput value={budgetStart} onChangeHandler={onChangeBudgetStart} />
            </div>
            <span></span>
            <div>
              <DomoInput value={budgetEnd} onChangeHandler={onChangeBudgetEnd} />
            </div>
          </div>
        </div>
        <div>
          <p>우리 동네에서 뭘 즐기고 싶은지 알려주세요.</p>
          <div>
            <ul className="DomoFlexBetween">
              <li
                onClick={() => onChangeSubject("액티비티")}
                style={{
                  backgroundColor: subject.includes("액티비티") ? "var(--main-color)" : "var(--black-1)",
                  color: subject.includes("액티비티") ? "var(--black-0)" : "var(--black-3)",
                }}>
                액티비티
              </li>
              <li
                onClick={() => onChangeSubject("혼자만의 휴식")}
                style={{
                  backgroundColor: subject.includes("혼자만의 휴식") ? "var(--main-color)" : "var(--black-1)",
                  color: subject.includes("혼자만의 휴식") ? "var(--black-0)" : "var(--black-3)",
                }}>
                혼자만의 휴식
              </li>
              <li
                onClick={() => onChangeSubject("데이트")}
                style={{
                  backgroundColor: subject.includes("데이트") ? "var(--main-color)" : "var(--black-1)",
                  color: subject.includes("데이트") ? "var(--black-0)" : "var(--black-3)",
                }}>
                데이트
              </li>
              <li
                onClick={() => onChangeSubject("맛집 발굴")}
                style={{
                  backgroundColor: subject.includes("맛집 발굴") ? "var(--main-color)" : "var(--black-1)",
                  color: subject.includes("맛집 발굴") ? "var(--black-0)" : "var(--black-3)",
                }}>
                맛집 발굴
              </li>
              <li
                onClick={() => onChangeSubject("인생샷")}
                style={{
                  backgroundColor: subject.includes("인생샷") ? "var(--main-color)" : "var(--black-1)",
                  color: subject.includes("인생샷") ? "var(--black-0)" : "var(--black-3)",
                }}>
                인생샷
              </li>
              <li
                onClick={() => onChangeSubject("아이 동반")}
                style={{
                  backgroundColor: subject.includes("아이 동반") ? "var(--main-color)" : "var(--black-1)",
                  color: subject.includes("아이 동반") ? "var(--black-0)" : "var(--black-3)",
                }}>
                아이 동반
              </li>
              <li
                onClick={() => onChangeSubject("반려견 동반")}
                style={{
                  backgroundColor: subject.includes("반려견 동반") ? "var(--main-color)" : "var(--black-1)",
                  color: subject.includes("반려견 동반") ? "var(--black-0)" : "var(--black-3)",
                }}>
                반려견 동반
              </li>
              <li
                onClick={() => onChangeSubject("아무거나")}
                style={{
                  backgroundColor: subject.includes("아무거나") ? "var(--main-color)" : "var(--black-1)",
                  color: subject.includes("아무거나") ? "var(--black-0)" : "var(--black-3)",
                }}>
                아무거나
              </li>
            </ul>
          </div>
        </div>
        {!loading && (
          <DomoBoxButton onClickHandler={onClickGetRecs} height="62px" radius="12px">
            나에게 딱 맞는 우리 동네 놀거리 추천 받기
          </DomoBoxButton>
        )}
      </section>

      {/* 배경 */}
      <div className="recsPage_circle1"></div>
      <div className="recsPage_circle2"></div>
      <div className="recsPage_circle_move"></div>

      {/* 우편번호 모달 영역 - 인라인 스타일 제거됨 */}
      {modalState && (
        <div className="postcode-modal-overlay" onClick={() => setModalState(false)}>
          <div className="postcode-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* 부모(postcode-modal-content)의 크기를 따라가도록 100% 설정 */}
            <DaumPostcode style={{ width: "100%", height: "100%" }} onComplete={onCompletePost} />
          </div>
        </div>
      )}
    </section>
  );
};
export default DomoRecsInfo;
