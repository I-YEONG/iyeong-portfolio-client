/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { foodMyPageMainStyle } from "./style";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faStar, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDeviceMode } from "@/hooks/useDeviceMode"; // 요청하신 훅 경로 반영
import { FoodError404Page } from "@/pages";
import { FoodMyFTCP, FoodMyLikeCP, FoodMyPageInfoCP } from "@/features/food/components";
import FoodMyReviewCP from "@/features/food/components/FoodMyPageCP/FoodMyReviewCP";
import { useGetFoodQuery } from "@/features/food/hooks/useGetFoodQuery";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const FoodMyPage = () => {
  const [paging, setPaging] = useState(0);
  const [onMenu, setOnMenu] = useState(true);
  const { isLogin, login, logout } = useAuth();

  const nav = useNavigate();

  // useDeviceMode를 사용해 isPc 변수 추출
  const { isPc } = useDeviceMode();

  // 찜/알림, 내 트럭 상태 추가
  const [likeList, setLikeList] = useState([]);
  const [smsList, setSmsList] = useState([]);

  const { data: userData } = useGetFoodQuery(`/me`, {
    // enabled:!! selectedUniv,
  });

  // 이 데이터를 받아서 아래 두 state로 나누면 될 듯
  // setLikeList
  // setSmsList
  const {
    data: smsLikeData,
    isLoading: smsLikeDataLoading,
    isError: smsLikeDataError,
  } = useGetFoodQuery(`/me/mine`, {
    // enabled:!! selectedUniv,
  });
  const { data: myTruckList } = useGetFoodQuery(`/me/ft`, {
    // enabled:!! selectedUniv,
  });

  useEffect(() => {
    if (isLogin) return;

    alert("로그인이 필요합니다.\n 로그인으로 전환됩니다.");
    login();
  }, [isLogin, login]);

  useEffect(() => {
    if (smsLikeDataLoading) return;

    setLikeList(smsLikeData.likes || []);
    setSmsList(smsLikeData.sms || []);
  }, [smsLikeData, smsLikeDataLoading, smsLikeDataError]);

  useEffect(() => {
    localStorage.setItem("mypage-paging", paging);
  }, [paging]);

  return (
    <section>
      {!userData && <FoodError404Page />}
      {userData && (
        <section css={foodMyPageMainStyle(isPc, onMenu)}>
          {!isPc && !onMenu && <FontAwesomeIcon icon={faBars} className="menuBars" onClick={() => setOnMenu(true)} />}

          <section className="menu flexCol">
            {!isPc && <FontAwesomeIcon icon={faXmark} className="menuXmark" onClick={() => setOnMenu(false)} />}
            {isPc && (
              <div className="flexCenter image">
                {paging === 0 && <FontAwesomeIcon icon={faUser} className="icon" />}
                {paging === 1 && <div className="ftIcon">{/* 푸드트럭 아이콘 */}</div>}
                {paging === 2 && <FontAwesomeIcon icon={faBell} className="icon" />}
                {paging === 3 && <FontAwesomeIcon icon={faStar} className="icon" />}
              </div>
            )}
            <ul>
              <li
                style={{ fontWeight: paging === 0 ? "600" : "500" }}
                onClick={() => {
                  setPaging(0);
                  setOnMenu(false);
                }}>
                내 정보
              </li>
              <div className="margin" />
              <li
                style={{ fontWeight: paging === 1 ? "600" : "500" }}
                onClick={() => {
                  setPaging(1);
                  setOnMenu(false);
                }}>
                내 푸드트럭
              </li>
              <div className="margin" />
              <li
                style={{ fontWeight: paging === 2 ? "600" : "500" }}
                onClick={() => {
                  // setPaging(2);
                  alert("데이터를 불러오지 못하였습니다.");
                  setOnMenu(false);
                }}>
                알림/찜 목록
              </li>
              <div className="margin" />
              <li
                style={{ fontWeight: paging === 3 ? "600" : "500" }}
                onClick={() => {
                  // setPaging(3);
                  alert("데이터를 불러오지 못하였습니다.");
                  setOnMenu(false);
                }}>
                리뷰 목록
              </li>
              <li
                className="homeButton"
                onClick={() => {
                  window.location.href = "/"; // 홈으로 이동
                }}>
                HOME
              </li>
              {/* 로그아웃 */}
              <li
                className="logoutButton"
                onClick={() => {
                  logout();
                  nav("/project/foodmap");
                }}>
                로그아웃
              </li>
            </ul>
          </section>
          <section className="mainSection">
            {paging === 0 && <FoodMyPageInfoCP userData={userData} />}
            {paging === 1 && <FoodMyFTCP myTruckList={myTruckList} />}
            {/* {paging === 2 && <FoodMyLikeCP likeList={likeList} smsList={smsList} />}
            {paging === 3 && <FoodMyReviewCP />} */}
          </section>
        </section>
      )}
    </section>
  );
};

export default FoodMyPage;
