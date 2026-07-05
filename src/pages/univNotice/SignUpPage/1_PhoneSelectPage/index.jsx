import UnivNoticeLogoLayout from "@/layouts/univNotice/UnivNoticeLogoLayout";
import "./style.css";
import "@/styles/univNotice.global.css";
import { useNavigate } from "react-router-dom";
import { UnivNoticeButtonCP } from "@/features/univNotice/components";

const UnivNoticePhoneSelectPage = () => {
  const nav = useNavigate();

  return (
    <UnivNoticeLogoLayout>
      <section className="phonePage univnoticeFlexCenter">
        <div className="centerBox">
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">기종</span>을 선택해 주세요
            </h2>
            <h4 className="subTitle">잘못 선택 시, 알림이 오지 않을 수 있어요</h4>
          </div>
          <div className="univnoticeFlexCol">
            <div
              className="phonePage-button"
              onClick={() => {
                localStorage.setItem("phoneType", "android");
                return nav("/signup/2");
              }}>
              <UnivNoticeButtonCP color="--main-color" bgColor="--black-0">
                Android
              </UnivNoticeButtonCP>
            </div>
            <div
              className="phonePage-button"
              onClick={() => {
                return nav("/signup/2");
              }}>
              <UnivNoticeButtonCP color="--main-color" bgColor="--black-0">
                iPhone
              </UnivNoticeButtonCP>
            </div>
          </div>
        </div>
      </section>
    </UnivNoticeLogoLayout>
  );
};
export default UnivNoticePhoneSelectPage;
