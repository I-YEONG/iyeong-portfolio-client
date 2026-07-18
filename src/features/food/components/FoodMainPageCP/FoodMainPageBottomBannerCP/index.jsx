import { useNavigate } from "react-router-dom";
import { foodMainPageBottomBannerCPMainStyle } from "./style";
import { FoodButtonCP, FoodOutLineButtonCP } from "@/features/food/components";
/**
 * 메인페이지 가장 하단부 베너
 */
const FoodMainPageBottomBannerCP = () => {
  const nav = useNavigate();

  return (
    <section css={foodMainPageBottomBannerCPMainStyle()} className="flexCenter">
      <div className="flexBetweenCol">
        <h2>지금 바로 시작하세요</h2>
        <p>맛있는 길거리 음식의 세계로 떠나보세요</p>
        <div className="flexHeightCenter">
          <div onClick={() => nav("/faq")}>
            <FoodOutLineButtonCP borderColor="--gray-0">FAQ 바로가기</FoodOutLineButtonCP>
          </div>
          <div onClick={() => nav("/map")}>
            <FoodButtonCP color="--gray-0" fontColor="--gray-6">
              지도 바로가기
            </FoodButtonCP>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodMainPageBottomBannerCP;
