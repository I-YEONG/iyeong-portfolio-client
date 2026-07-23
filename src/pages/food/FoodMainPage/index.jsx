import { useDeviceMode } from "@/hooks/useDeviceMode";
import { MainPageMainStyle } from "./style";
import { FoodMainLayOut } from "@/layouts";
import {
  FoodMainPageBottomBannerCP,
  FoodMainPageFeatureCP,
  FoodMainPageMethodCP,
  FoodMainPageMoreFunCP,
  FoodMainPageTitleCP,
} from "@/features/food/components";

const FoodMainPage = () => {
  const { isPc } = useDeviceMode();
  return (
    <div css={MainPageMainStyle(isPc)}>
      <FoodMainLayOut>
        {/* 메인 타이틀 */}
        <FoodMainPageTitleCP />

        {/* 서비스 특징 */}
        <FoodMainPageFeatureCP />

        {/* 이용 방법 */}
        <FoodMainPageMethodCP />

        {/* 더 많은 기능들 */}
        <FoodMainPageMoreFunCP />

        {/* 하단 베너 */}
        <FoodMainPageBottomBannerCP />
      </FoodMainLayOut>
    </div>
  );
};

export default FoodMainPage;
