/** @jsxImportSource @emotion/react */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import { foodMainPageTitleCPMainStyle } from "./style";
import { FoodButtonCP, FoodOutLineButtonCP } from "@/features/food/components";

/**
 * 메인 페이지 타이틀 컴포넌트
 */
const FoodMainPageTitleCP = () => {
  const { isPc } = useDeviceMode();

  return (
    <main css={foodMainPageTitleCPMainStyle(isPc)} className="foodFlexBetween">
      <div className="foodFlexBetweenCol">
        {/* title */}
        <p>
          내 주변 <span className="highlight">푸드트럭</span>의 <br />
          위치를 찾아보세요
        </p>
        {/* subtitle */}
        <p>
          실시간 위치 정보와 신뢰할 수 있는 리뷰로 <br />내 주변 최고의 푸드트럭을 쉽고 빠르게 찾아보세요!
        </p>
        {/* btn + btn */}
        <div className="foodFlexCenter">
          <a href="/project/foodmap/map">
            <FoodButtonCP
              backgroundColor="--food-brown-light"
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              color="--food-brown-light"
              fontColor="--food-gray-0">
              지도에서 찾기
            </FoodButtonCP>
          </a>
          <a href="/project/foodmap/register">
            <FoodOutLineButtonCP icon={<FontAwesomeIcon icon={faMap} />} color="black" borderColor="--food-gray-3">
              푸드트럭 등록하기
            </FoodOutLineButtonCP>
          </a>
        </div>
      </div>
    </main>
  );
};

export default FoodMainPageTitleCP;
