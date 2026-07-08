import "./style.css";
import "@/styles/univNotice.global.css";
import { useCallback, useEffect, useState } from "react";

import { useGetUnivNoticeQuery } from "@/features/univNotice/hooks/useGetUnivNoticeQuery";
import { useAuth } from "@/hooks/useAuth";
import { useDeviceMode } from "@/hooks/useDeviceMode";
import UnivNoticeMyPageLayout from "@/layouts/univNotice/UnivNoticeMyPageLayout";
import { UnivNoticeCategoryCP } from "@/features/univNotice/components";

const UnivNoticeMySettingPage = () => {
  const { isPc } = useDeviceMode();
  const { isLogin, isAuthLoading, login } = useAuth();
  const { data } = useGetUnivNoticeQuery(`/user/mypage/category`, {
    // enabled: !!selectedUniv,
  });

  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategoryData(data);
    }
  }, [data]);

  useEffect(() => {
    if (isAuthLoading) return;

    if (isLogin === false) {
      alert("로그인이 필요한 화면입니다.\n로그인 상태로 변환됩니다.");
      login();
    }
  }, [isLogin, login, isAuthLoading]);

  /**
   * 카테고리 알림 On/Off 토글 (로컬 상태 업데이트)
   * @param {number} id - 크롤링 ID (최상위 id)
   * @param {boolean} value - 변경할 토글 상태
   */
  const onEnabledCategory = useCallback((id, value) => {
    if (value === false) {
      if (!window.confirm("해당 카테고리에 대한 알림을 받지 않습니다.")) {
        return; // 취소 눌렀을 때 함수 종료
      }
    }

    setCategoryData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          const updatedCategories =
            item.Categories && item.Categories.length > 0
              ? [{ ...item.Categories[0], is_enabled: value }]
              : [{ id: Date.now(), is_enabled: value, Keywords: [] }];
          return { ...item, Categories: updatedCategories };
        }
        return item;
      }),
    );
  }, []);

  /**
   * 키워드 삭제 (로컬 상태 업데이트)
   * @param {number} id - 삭제할 키워드의 id
   */
  const onDeleteKeyword = useCallback((id) => {
    setCategoryData((prevData) =>
      prevData.map((item) => ({
        ...item,
        Categories: item.Categories?.map((cat) => ({
          ...cat,
          Keywords: cat.Keywords?.filter((kw) => kw.id !== id),
        })),
      })),
    );
  }, []);

  /**
   * 키워드 다중 추가 (로컬 상태 업데이트)
   * @param {number} category_id - Categories 객체의 id
   * @param {string[]} keywordsArray - 추가할 키워드 텍스트들이 담긴 배열 (예: ["키워드1", "키워드2"])
   */
  const onPostKeyword = useCallback((category_id, keywordsArray) => {
    setCategoryData((prevData) =>
      prevData.map((item) => ({
        ...item,
        Categories: item.Categories?.map((cat) => {
          if (cat.id === category_id) {
            const newKeywords = keywordsArray.map((kw, idx) => ({
              id: Date.now() + idx,
              category_id: category_id,
              keyword: kw,
              is_enabled: true,
            }));

            return {
              ...cat,
              Keywords: [...(cat.Keywords || []), ...newKeywords],
            };
          }
          return cat;
        }),
      })),
    );
  }, []);

  return (
    <UnivNoticeMyPageLayout>
      <section className="mySettingPage univnoticeFlexCenter" css={isPc ? { padding: "0 6rem" } : { padding: "0 3rem" }}>
        {/* 중앙 */}
        <div className="centerBox">
          {/* 타이틀 */}
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">공지 설정</span>
            </h2>
            <h4 className="subTitle">공지별 On/Off 및 키워드를 설정</h4>
          </div>
          {/* 인풋 요소 */}
          <div className="flexCol">
            {categoryData
              ?.sort((a, b) => a.id - b.id)
              .map((category, idx) => (
                <UnivNoticeCategoryCP
                  key={idx}
                  category={category}
                  onEnabledCategory={onEnabledCategory}
                  onDeleteKeyword={onDeleteKeyword}
                  onPostKeyword={onPostKeyword}
                />
              ))}
          </div>
        </div>
      </section>
    </UnivNoticeMyPageLayout>
  );
};
export default UnivNoticeMySettingPage;
