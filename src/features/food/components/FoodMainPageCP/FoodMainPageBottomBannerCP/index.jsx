import { useNavigate } from "react-router-dom";
import { foodMainPageBottomBannerCPMainStyle } from "./style";
import { FoodButtonCP, FoodOutLineButtonCP } from "@/features/food/components";
/**
 * 메인페이지 가장 하단부 베너
 */
const FoodMainPageBottomBannerCP = () => {
  const nav = useNavigate();

  return (
    <section css={foodMainPageBottomBannerCPMainStyle()} className="foodFlexCenter">
      <div className="foodFlexBetweenCol">
        <h2>지금 바로 시작하세요</h2>
        <p>맛있는 길거리 음식의 세계로 떠나보세요</p>
        <div className="foodFlexHeightCenter">
          <div onClick={() => nav("/project/foodmap/faq")}>
            <FoodOutLineButtonCP borderColor="--food-gray-0">FAQ 바로가기</FoodOutLineButtonCP>
          </div>
          <div onClick={() => nav("/project/foodmap/map")}>
            <FoodButtonCP color="--food-gray-0" fontColor="--food-gray-6">
              지도 바로가기
            </FoodButtonCP>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodMainPageBottomBannerCP;
