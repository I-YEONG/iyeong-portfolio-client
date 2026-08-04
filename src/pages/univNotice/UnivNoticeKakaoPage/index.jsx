import "./style.css";
import UnivNoticeLogoLayout from "@/layouts/univNotice/UnivNoticeLogoLayout";

const UnivNoticeKakaoPage = () => {
  const gotoKakao = () => {
    window.open(import.meta.env.VITE_KAKAO_URL, "_blank");
  };
  return (
    <UnivNoticeLogoLayout>
      <section className="kakaoPage flexCenter">
        <div className="kakaoPage-content">
          <div>{/* 이미지 */}</div>
          <p onClick={gotoKakao} className="flexBetween">
            <span>카카오톡 문의 바로 가기</span>
            <span>{">"}</span>
          </p>
        </div>
      </section>
    </UnivNoticeLogoLayout>
  );
};
export default UnivNoticeKakaoPage;
