import { useDeviceMode } from "@/hooks/useDeviceMode";
import { FoodButtonCP } from "@/features/food/components";
import { MainLayOutHeaderStyled } from "./style";
import { useAuth } from "@/hooks/useAuth";

const FoodMainLayOutHeader = () => {
  const { isPc } = useDeviceMode();
  // const isLogin = useLoginCheck();
  const { isLogin, login } = useAuth();

  console.log(isPc);
  return (
    <div css={MainLayOutHeaderStyled(isPc)}>
      <div className="foodFlexBetween">
        <div className="title-box">
          <a href="/project/foodmap/">
            <div className="logo">{/* logo */}</div>
            <p>길맛로드</p>
          </a>
        </div>
        <nav>
          <ul className="foodFlexBetween">
            <a href="/project/foodmap/map">
              <li>지도</li>
            </a>
            <a href="/project/foodmap/register">
              <li>등록하기</li>
            </a>
            <a href="/project/foodmap/report">
              <li>제보하기</li>
            </a>
            <a href="/project/foodmap/faq">
              <li>FAQ</li>
            </a>
            {!isLogin && (
              <li onClick={login} className="loginButton">
                로그인
              </li>
            )}
            {!isLogin && (
              <li onClick={login} className="singInButton">
                <FoodButtonCP pcOnly="true">회원가입</FoodButtonCP>
              </li>
            )}
            {isLogin && (
              <li className="singInButton">
                <a href="/project/foodmap/my-page">
                  <FoodButtonCP pcOnly="true">마이페이지</FoodButtonCP>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default FoodMainLayOutHeader;
