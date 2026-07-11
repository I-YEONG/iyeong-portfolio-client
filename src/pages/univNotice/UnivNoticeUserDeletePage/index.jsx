import { useEffect } from "react";
import "./style.css";
import "@/styles/univNotice.global.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCallback } from "react";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useInput } from "@/hooks/useInput";
import { useAuth } from "@/hooks/useAuth";
import { UnivNoticeMainLayout } from "@/layouts";
import { UnivNoticeButtonCP, UnivNoticeInputCP } from "@/features/univNotice/components";

const UnivNoticeUserDeletePage = () => {
  const nav = useNavigate();
  const { isPc } = useDeviceMode();
  const { isLogin, isAuthLoading, login, logout } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;

    if (!isLogin) {
      alert("로그인이 필요한 페이지입니다.\n로그인으로 전환합니다.");
      login();
    }
  }, [isAuthLoading, isLogin, login]);

  const [student_id, onChangeStudent_id, setStudent_id] = useInput("");
  const [phone, onChangePhone, setPhone] = useInput("");
  const [certification_code, onChangeCertification_code, setCertification_code] = useInput("");

  const [isCertification, setIsCertification] = useState(false);

  const onClickCertification = useCallback(async () => {
    if (!phone) return alert("전화번호를 입력해 주세요.");
    if (!/^010\d{8}$/.test(phone)) return alert("전화번호는 010으로 시작하는 11자리 숫자여야 합니다.");
    setCertification_code("000000");
    setIsCertification(true);
  }, [phone]);

  const onKeyDownCertification = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onClickCertification();
      }
    },
    [onClickCertification],
  );

  const onClickDelete = useCallback(async () => {
    if (!isCertification) return alert("핸드폰 인증을 진행해 주세요.");

    if (!student_id) return alert("학번을 입력해 주세요.");
    if (student_id.length < 6) return alert("학번은 6자리 이상이어야 합니다.");
    if (!/^\d+$/.test(student_id)) return alert("학번은 숫자만 입력해야 합니다.");
    if (!phone) return alert("전화번호를 입력해 주세요.");
    if (!/^010\d{8}$/.test(phone)) return alert("전화번호는 010으로 시작하는 11자리 숫자여야 합니다.");
    if (!certification_code) return alert("인증번호를 입력해 주세요.");
    if (!/^.{6}$/.test(certification_code)) return alert("인증번호는 6자리여야 합니다.");

    const confirmDelete = window.confirm("정말로 회원 탈퇴를 하시겠습니까?\n 탈퇴 후에는 모든 데이터가 삭제되며 복구할 수 없습니다.");
    if (!confirmDelete) return;

    logout();
    alert("회원 탈퇴가 완료되었습니다.");
    nav("/project/univnotice");
  }, [isCertification, student_id, phone, certification_code, nav, logout]);

  const onKeyDownDelete = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onClickDelete();
      }
    },
    [onClickDelete],
  );
  return (
    <UnivNoticeMainLayout>
      <section className="userDeletePage univnoticeFlexCenter" style={isPc ? { padding: "0 6rem" } : { padding: "0 3rem" }}>
        {/* 중앙 */}
        <div className="univnoticeCenterBox">
          {/* 타이틀 */}
          <div className="univnoticeTitleBox">
            <h2 className="univnoticeTitle">
              <span className="bold">회원 탈퇴</span>
            </h2>
            <h4 className="subTitle">가입한 정보를 입력해 주세요</h4>
          </div>
          <div className="univnoticeFlexCol">
            <UnivNoticeInputCP value={student_id} onChange={onChangeStudent_id} univnoticeTitle="학번" placeholder="학번을 6자리 이상 입력해 주세요" />
            <div>
              <span className="smsButton" onClick={(e) => onClickCertification(e)}>
                발송
              </span>
              <UnivNoticeInputCP
                value={phone}
                onChange={onChangePhone}
                univnoticeTitle="휴대폰 번호"
                placeholder="숫자만 입력하세요"
                onKeyDown={onKeyDownCertification}
              />
            </div>
            {isCertification && (
              <UnivNoticeInputCP
                value={certification_code}
                onChange={onChangeCertification_code}
                univnoticeTitle="인증번호"
                placeholder="문자로 받은 6자릿값을 입력하세요"
                onKeyDown={onKeyDownDelete}
              />
            )}
          </div>
          <div className="bottomItem" onClick={onClickDelete}>
            <UnivNoticeButtonCP bgColor="--red">회원 탈퇴</UnivNoticeButtonCP>
          </div>
        </div>
      </section>
    </UnivNoticeMainLayout>
  );
};
export default UnivNoticeUserDeletePage;
