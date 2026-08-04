import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import { useDeviceMode } from "@/hooks/useDeviceMode";
import { useAuth } from "@/hooks/useAuth";
import UnivNoticeMyPageLayout from "@/layouts/univNotice/UnivNoticeMyPageLayout";
import { UnivNoticeButtonCP, UnivNoticeInputCP } from "@/features/univNotice/components";
import { useGetUnivNoticeQuery } from "@/features/univNotice/hooks/useGetUnivNoticeQuery";

const UnivNoticeMyInfoPage = () => {
  const nav = useNavigate();
  const { isPc } = useDeviceMode();
  const { isLogin, isAuthLoading, login, logout } = useAuth();

  const [logoutButton, setLogoutButton] = useState(false);

  const { data: userData, isLoading: isUserDataLoading } = useGetUnivNoticeQuery(`/user/mypage/info`, {
    // enabled: !!selectedUniv,
  });

  useEffect(() => {
    if (isAuthLoading) return;

    if (logoutButton) return;

    if (!isLogin) {
      alert("로그인이 필요한 페이지입니다.\n로그인 상태로 변경합니다");
      login();
    }
  }, [isAuthLoading, isLogin, login]);

  return (
    <UnivNoticeMyPageLayout>
      <section className="myPageInfo univnoticeFlexCenter" css={isPc ? { padding: "0 6rem" } : { padding: "0 3rem" }}>
        {/* 중앙 */}
        <div className="univnoticeCenterBox">
          {/* 타이틀 */}
          <div className="univnoticeTitleBox">
            <h2 className="univnoticeTitle">
              <span className="bold">내 정보</span>
            </h2>
            <h4 className="subTitle">가입할 때 입력하신 정보입니다.</h4>
          </div>
          {/* 인풋요소 */}
          {!isUserDataLoading && (
            <div className="univnoticeFlexCol">
              <UnivNoticeInputCP univnoticeTitle="이름" activate={false} value={userData.name} />
              <UnivNoticeInputCP univnoticeTitle="학번" activate={false} value={`****${userData.student_id}`} />
              <UnivNoticeInputCP univnoticeTitle="학교/학과" activate={false} value={`${userData.school.name} / ${userData.department.name}`} />
              <UnivNoticeInputCP univnoticeTitle="핸드폰 번호" activate={false} value={`010 - **** - ${userData.phone}`} />
            </div>
          )}

          <div className="bottomItem">
            <div
              onClick={() => {
                setLogoutButton(true);
                logout() & nav("/project/univnotice");
              }}>
              <UnivNoticeButtonCP bgColor="--univ-red">로그아웃</UnivNoticeButtonCP>
            </div>
            <p className="deleteAccount">
              <span onClick={() => nav("/project/univnotice/withdraw")}>회원 탈퇴</span>
            </p>
          </div>
        </div>
        <p className="caption">핸드폰 번호 변경은 고객센터로 문의해 주세요</p>
      </section>
    </UnivNoticeMyPageLayout>
  );
};
export default UnivNoticeMyInfoPage;
