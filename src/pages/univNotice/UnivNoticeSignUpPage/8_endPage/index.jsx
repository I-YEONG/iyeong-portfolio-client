import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { UnivNoticeButtonCP } from "@/features/univNotice/components";
import UnivNoticeLogoLayout from "@/layouts/univNotice/UnivNoticeLogoLayout";
import "@/styles/univNotice.global.css";

const UnivNoticeEndPage = () => {
  const nav = useNavigate();
  const { isPc } = useDeviceMode();
  return (
    <UnivNoticeLogoLayout>
      <section className="endPage univnoticeFlexCenter" style={isPc ? { padding: "0 6rem" } : { padding: "0 3rem" }}>
        <div className="endPage-content">
          <div>{/* 이미지 */}</div>
          <div className="univnoticeTitleBox">
            <p className="univnoticeTitle">
              <span>성공적</span>으로
              <br />
              <span>등록</span>되었어요!
            </p>
            <p className="subTitle">매일 오후 7시에 당일의 공지를 알려드려요</p>
          </div>

          <div onClick={() => nav("/project/univnotice/")}>
            <UnivNoticeButtonCP>Home</UnivNoticeButtonCP>
          </div>
        </div>
      </section>
    </UnivNoticeLogoLayout>
  );
};
export default UnivNoticeEndPage;
