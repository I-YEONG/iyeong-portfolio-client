import { useDeviceMode } from "@/hooks/useDeviceMode";
import { FoodButtonCP } from "@/features/food/components";
import { MainLayOutHeaderStyled } from "./style";
import { useAuth } from "@/hooks/useAuth";

const FoodMainLayOutHeader = () => {
  const { isPc } = useDeviceMode();
  // const isLogin = useLoginCheck();
  const { isLogin } = useAuth();

  console.log(isLogin);
  return (
    <div css={MainLayOutHeaderStyled(isPc)}>
      <div className="flexBetween">
        <div className="title-box">
          <a href="/">
            <div className="logo">{/* logo */}</div>
            <p>길맛로드</p>
          </a>
        </div>
        <nav>
          <ul className="flexBetween">
            <a href="/map">
              <li>지도</li>
            </a>
            <a href="/register">
              <li>등록하기</li>
            </a>
            <a href="/report">
              <li>제보하기</li>
            </a>
            <a href="/faq">
              <li>FAQ</li>
            </a>
            {!isLogin && (
              <a href="/login">
                <li className="loginButton">로그인</li>
              </a>
            )}
            {!isLogin && (
              <li className="singInButton">
                <a href="/sign-up">
                  <FoodButtonCP pcOnly="true">회원가입</FoodButtonCP>
                </a>
              </li>
            )}
            {isLogin && (
              <li className="singInButton">
                <a href="/my-page">
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
