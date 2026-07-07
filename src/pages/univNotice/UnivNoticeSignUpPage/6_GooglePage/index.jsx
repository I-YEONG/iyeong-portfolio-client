import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import UnivNoticeLogoLayout from "@/layouts/univNotice/UnivNoticeLogoLayout";
import "@/styles/univNotice.global.css";
import { UnivNoticeButtonCP } from "@/features/univNotice/components";

const UnivNoticeGooglePage = () => {
  const nav = useNavigate();
  const { isPc } = useDeviceMode();

  const onClickDownload = () => {
    // 구글 플레이스토어 이동
    alert("현재 설치해도 동작하지 않는 서비스입니다.");
    window.open(`https://play.google.com/store/apps/details?id=com.iyeonggyu0.univnotice&pcampaignid=web_share`, "_blank");
  };

  const onNextClick = () => {
    nav("/project/univnotice/signup/7");
  };

  return (
    <UnivNoticeLogoLayout>
      <section className="googlePage univnoticeFlexCenter" style={isPc ? { padding: "0 6rem" } : { padding: "0 3rem" }}>
        {!isPc && <div className="mobile-image">{/* 이미지 */}</div>}
        <div className="content univnoticeFlexBetweenCol">
          <div>
            {isPc && <div className="pc-title-image">{/* 이미지 */}</div>}
            <p className="title">
              완료까지 얼마 남지 않았어요
              <br />
              아래에서 <span className="bold">앱을 설치</span>해 주세요
            </p>
            <p className="subTitle">설치를 완료한 후 다음 단계에서{!isPc && <br />}기기 등록을 진행해 주세요</p>
          </div>
          <div className={`buttonBox ${isPc ? "univnoticeFlexBetween" : "univnoticeFlexCol"}`}>
            <div onClick={onClickDownload}>
              <UnivNoticeButtonCP>설치</UnivNoticeButtonCP>
            </div>
            <div onClick={onNextClick}>
              <UnivNoticeButtonCP bgColor="--point-color-1">설치 완료</UnivNoticeButtonCP>
            </div>
          </div>
        </div>
        {isPc && <div className="pc-image">{/* PC 이미지 */}</div>}
      </section>
    </UnivNoticeLogoLayout>
  );
};
export default UnivNoticeGooglePage;
