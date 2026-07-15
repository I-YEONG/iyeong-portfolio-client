import "./style.css";
import "@/styles/univNotice.global.css";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useGetUnivNoticeQuery } from "@/features/univNotice/hooks/useGetUnivNoticeQuery";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import UnivNoticeMyPageLayout from "@/layouts/univNotice/UnivNoticeMyPageLayout";
import { UnivNoticeDeviceCP } from "@/features/univNotice/components";

const UnivNoticeMyDevicePage = () => {
  const { isPc } = useDeviceMode();
  const { isLogin, isAuthLoading, login } = useAuth();
  const { data, isLoading } = useGetUnivNoticeQuery(`/user/mypage/device`, {
    // enabled: !!selectedUniv,
  });

  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeviceData(data);
    }
  }, [data]);

  useEffect(() => {
    if (isAuthLoading) return;

    if (isLogin === false) {
      alert("로그인이 필요한 화면입니다.\n로그인 상태로 변환됩니다.");
      login();
    }
  }, [isLogin, login, isAuthLoading]);

  const onChangeActive = useCallback((id, value) => {
    if (!value) {
      if (!window.confirm("해당 기기에서 푸시 알림을 받지 않으시겠습니까?")) {
        return;
      }
    }

    setDeviceData((prevData) => prevData.map((device) => (device.id === id ? { ...device, is_active: value } : device)));
  }, []);

  const onDeleteDevice = useCallback((id) => {
    if (!window.confirm("정말로 이 기기를 삭제하시겠습니까?")) {
      return;
    }

    setDeviceData((prevData) => prevData.filter((device) => device.id !== id));
    alert("기기가 삭제되었습니다.\n30분 내외로 로그아웃이 진행됩니다.");
  }, []);

  return (
    <UnivNoticeMyPageLayout>
      <section className="myDevicePage univnoticeFlexCenter" css={isPc ? { padding: "0 6rem" } : { padding: "0 3rem" }}>
        {/* 중앙 */}
        <div className="univnoticeCenterBox" style={{ minHeight: deviceData.length === 0 ? "auto" : "" }}>
          {/* 타이틀 */}
          <div className="univnoticeTitleBox">
            <h2 className="univnoticeTitle">
              <span className="bold">기기 정보</span>
            </h2>
            <h4 className="subTitle">현재 로그인 된 기기 목록입니다.</h4>
          </div>
          {/* 인풋요소 */}
          <div className="flexCol">
            {deviceData.length === 0 && !isLoading && (
              <div className="notdefine-deivce">
                등록된 기기가 없습니다
                <br />
                <a
                  href={`https://play.google.com/store/apps/details?id=com.iyeonggyu0.univnotice&pcampaignid=web_share`}
                  target="_blank"
                  style={{ color: "var(--point-color-1)" }}>
                  앱 설치 바로가기
                </a>
              </div>
            )}
            {deviceData?.length > 0 &&
              deviceData.map((device, idx) => <UnivNoticeDeviceCP key={idx} device={device} onChangeActive={onChangeActive} onDeleteDevice={onDeleteDevice} />)}
          </div>
        </div>
      </section>
    </UnivNoticeMyPageLayout>
  );
};
export default UnivNoticeMyDevicePage;
