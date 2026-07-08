import { useNavigate } from "react-router-dom";
import "./style.css";
import { UnivNoticeButtonCP } from "@/features/univNotice/components";
import UnivNoticeLogoLayout from "@/layouts/univNotice/UnivNoticeLogoLayout";
import "@/styles/univNotice.global.css";

const UnivNoticeHelloPage = () => {
  const nav = useNavigate();

  return (
    <UnivNoticeLogoLayout>
      <section className="infoPage univnoticeFlexCenter">
        <div className="infoPage-content">
          <div>{/* 이미지 */}</div>
          <p>
            <span>UNIV</span> Notice에
            <br />
            오신 것을 환영합니다!
          </p>
          <div onClick={() => nav("/project/univnotice/signup/1")}>
            <UnivNoticeButtonCP>다음</UnivNoticeButtonCP>
          </div>
        </div>
      </section>
    </UnivNoticeLogoLayout>
  );
};
export default UnivNoticeHelloPage;
